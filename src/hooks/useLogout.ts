import { signOut, getSession } from 'next-auth/react';
import { useState } from 'react';
import { authService } from '@/services/auth';

interface UseLogoutReturn {
  logout: (callbackUrl?: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const useLogout = (): UseLogoutReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const logout = async (callbackUrl: string = '/') => {
    try {
      setIsLoading(true);
      setError(null);

      // Get current session to access the access token
      const session = await getSession();
      
      if (session?.accessToken) {
        try {
          // Call ProSai API to invalidate the token
          await authService.logout();
          console.log('ProSai API logout successful');
        } catch (apiError) {
          console.warn('ProSai API logout failed, continuing with client logout:', apiError);
          // Continue with logout even if API call fails
        }
      }

      // Sign out from NextAuth
      await signOut({ 
        callbackUrl,
        redirect: true 
      });
    } catch (err) {
      console.error('Logout error:', err);
      setError('Có lỗi xảy ra khi đăng xuất');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    logout,
    isLoading,
    error,
  };
};
