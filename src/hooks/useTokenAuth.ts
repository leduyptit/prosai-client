'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useAuth } from './useAuth';

export function useTokenAuth() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tokenProcessed, setTokenProcessed] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();
  const searchParams = useSearchParams();
  const hasProcessedRef = useRef(false);
  const currentTokenRef = useRef<string | null>(null);

  const processTokenLogin = useCallback(async (token: string) => {
    // Prevent multiple calls with the same token
    if (!token || isAuthenticated || tokenProcessed || hasProcessedRef.current || currentTokenRef.current === token) {
      return;
    }

    currentTokenRef.current = token;
    hasProcessedRef.current = true;
    setIsProcessing(true);
    setError(null);

    try {
      console.log('Processing token login with NextAuth...');
      
      // Use NextAuth signIn with token provider
      const result = await signIn('token', {
        token: token,
        redirect: false,
        callbackUrl: window.location.pathname + window.location.search
      });
      
      if (result?.error) {
        throw new Error(result.error);
      }
      
      if (result?.ok) {
        setTokenProcessed(true);
        
        // Remove token from URL to clean up
        const url = new URL(window.location.href);
        url.searchParams.delete('token');
        window.history.replaceState({}, '', url.toString());
        
        // Reload the page to apply the authentication
        window.location.reload();
      } else {
        throw new Error('Token authentication failed');
      }
    } catch (err) {
      console.error('Token login failed:', err);
      setError(err instanceof Error ? err.message : 'Token login failed');
      hasProcessedRef.current = false; // Reset on error to allow retry
      currentTokenRef.current = null; // Reset token ref on error
    } finally {
      setIsProcessing(false);
    }
  }, [isAuthenticated, tokenProcessed]);

  // Auto-process token from URL parameters - only run once
  useEffect(() => {
    const token = searchParams.get('token');
    
    if (token && !isAuthenticated && !isLoading && !tokenProcessed && !hasProcessedRef.current) {
      console.log('Token found in URL, processing...', token);
      processTokenLogin(token);
    }
  }, [searchParams.get('token'), isAuthenticated, isLoading, tokenProcessed, processTokenLogin]);

  return {
    isProcessing,
    error,
    processTokenLogin,
  };
}
