'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { User } from '@/types/auth';

export function useAuth() {
  const { data: session, status } = useSession();

  const login = async (credentials: { email: string; password: string }) => {
    console.log('🚀 Starting NextAuth login flow...');
    console.log('📍 Client → /api/auth/callback/credentials → NextAuth authorize() → https://api-v1.prosai.vn/auth/login');
    
    const result = await signIn('credentials', {
      email: credentials.email,
      password: credentials.password,
      redirect: false,
    });
    
    // Add error logging for debugging
    if (result?.error) {
      console.error('❌ useAuth login failed:', {
        error: result.error,
        status: result.status,
        ok: result.ok,
        url: result.url
      });
    } else if (result?.ok) {
      console.log('✅ useAuth login successful');
    }
    
    return result;
  };

  const loginWithGoogle = async () => {
    await signIn('google', { callbackUrl: '/account-overview' });
  };

  const loginWithFacebook = async () => {
    await signIn('facebook', { callbackUrl: '/account-overview' });
  };

  const logout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return {
    user: session?.user as User | undefined,
    isLoading: status === 'loading',
    isAuthenticated: status === 'authenticated',
    accessToken: session?.accessToken,
    login,
    loginWithGoogle,
    loginWithFacebook,
    logout,
  };
}
