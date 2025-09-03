import { useState, useEffect, useCallback } from 'react';
import { fetchFavoritesList, FavoritesListResponse } from '@/services';

export const useFavoritesList = (limit?: number) => {
  const [data, setData] = useState<FavoritesListResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async (customLimit?: number) => {
    try {
      setLoading(true);
      setError(null);
      const favorites = await fetchFavoritesList(customLimit || limit);
      setData(favorites);
    } catch (err) {
      console.error('Failed to load favorites list:', err);
      setError('Không thể tải danh sách yêu thích');
    } finally {
      setLoading(false);
    }
  }, [limit]);

  // Auto-fetch data when component mounts
  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    data,
    loading,
    error,
    refetch
  };
};
