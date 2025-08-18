'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { User } from '@/types/auth';

export function useAuth() {
  const { data: session, status } = useSession();

  const login = async (credentials: { email: string; password: string }) => {
    const result = await signIn('credentials', {
      email: credentials.email,
      password: credentials.password,
      redirect: false,
    });
    
    if (result?.error) {
      throw new Error(result.error);
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
