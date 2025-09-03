import { useState, useEffect, useCallback } from 'react';
import { fetchBookmarksList, BookmarksListResponse } from '@/services';

export const useBookmarksList = (limit?: number) => {
  const [data, setData] = useState<BookmarksListResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async (customLimit?: number) => {
    try {
      setLoading(true);
      setError(null);
      const bookmarks = await fetchBookmarksList(customLimit || limit);
      setData(bookmarks);
    } catch (err) {
      console.error('Failed to load bookmarks list:', err);
      setError('Không thể tải danh sách bộ lọc đã lưu');
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
