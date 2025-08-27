import { useState, useEffect } from 'react';
import { fetchBookmarksList, BookmarksListResponse } from '@/services';

export const useBookmarksList = () => {
  const [data, setData] = useState<BookmarksListResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const bookmarks = await fetchBookmarksList();
      setData(bookmarks);
    } catch (err) {
      console.error('Failed to load bookmarks list:', err);
      setError('Không thể tải danh sách bộ lọc đã lưu');
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
