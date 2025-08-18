import { signOut } from 'next-auth/react';
import { useState } from 'react';

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

      // Optionally call your backend logout API
      // try {
      //   await fetch('/api/auth/logout', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //   });
      // } catch (err) {
      //   console.warn('Backend logout failed, continuing with client logout');
      // }

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
