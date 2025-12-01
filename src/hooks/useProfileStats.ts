import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { fetchProfileStats, ProfileStatsResponse } from '@/services';

export const useProfileStats = () => {
  const { data: session, status } = useSession();
  const [data, setData] = useState<ProfileStatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    // Only fetch if user is authenticated
    if (status !== 'authenticated' || !session?.accessToken) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const stats = await fetchProfileStats();
      setData(stats);
    } catch (err) {
      console.error('Failed to load profile stats:', err);
      setError('Không thể tải dữ liệu thống kê');
    } finally {
      setLoading(false);
    }
  }, [status, session?.accessToken]);

  useEffect(() => {
    // Only fetch when user is authenticated
    if (status === 'authenticated' && session?.accessToken) {
      refetch();
    } else if (status === 'unauthenticated') {
      // Reset data when user logs out
      setData(null);
      setError(null);
      setLoading(false);
    }
  }, [status, session?.accessToken, refetch]);

  return {
    data,
    loading,
    error,
    refetch
  };
};
