import { useState, useEffect } from 'react';
import { fetchFavoritesList, FavoritesListResponse } from '@/services';

export const useFavoritesList = () => {
  const [data, setData] = useState<FavoritesListResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const favorites = await fetchFavoritesList();
      setData(favorites);
    } catch (err) {
      console.error('Failed to load favorites list:', err);
      setError('Không thể tải danh sách yêu thích');
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    refetch
  };
};
