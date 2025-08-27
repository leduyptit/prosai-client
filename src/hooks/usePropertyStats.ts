import { useState, useEffect } from 'react';
import { fetchPropertyStats, PropertyStatsResponse } from '@/services';

export const usePropertyStats = () => {
  const [data, setData] = useState<PropertyStatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const stats = await fetchPropertyStats();
      setData(stats);
    } catch (err) {
      console.error('Failed to load property stats:', err);
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
