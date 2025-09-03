import { useCallback, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { apiClient } from '@/services/api';

interface UseUserBalanceResult {
  balance: string;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export const requestBalanceRefresh = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('balance:refresh'));
  }
};

const useUserBalance = (): UseUserBalanceResult => {
  const { data: session, status } = useSession();
  const [balance, setBalance] = useState<string>('0.00');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBalance = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get('/auth/profile');
      // Newer profile shape is a plain object
      const data = response.data;
      const newBalance = typeof data?.balance === 'string' ? data.balance : '0.00';
      setBalance(newBalance);
    } catch (err: any) {
      setError(err?.response?.data?.msg || 'Không thể tải số dư');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Only fetch balance when user is authenticated
    if (status === 'authenticated' && session?.accessToken) {
      fetchBalance();
    } else if (status === 'unauthenticated') {
      // Reset balance when user logs out
      setBalance('0.00');
      setError(null);
    }
  }, [status, session?.accessToken, fetchBalance]);

  useEffect(() => {
    const handler = () => {
      fetchBalance();
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('balance:refresh', handler);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('balance:refresh', handler);
      }
    };
  }, [fetchBalance]);

  return { balance, loading, error, refresh: fetchBalance };
};

export default useUserBalance;


