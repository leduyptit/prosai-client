import { useState, useEffect } from 'react';
import { fetchProfileStats, ProfileStatsResponse } from '@/services';

export const useProfileStats = () => {
  const [data, setData] = useState<ProfileStatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = async () => {
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
  };

  useEffect(() => {
    refetch();
  }, []);

  return {
    data,
    loading,
    error,
    refetch
  };
};
