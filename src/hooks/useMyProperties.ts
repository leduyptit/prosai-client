import { useState, useEffect } from 'react';
import { fetchMyProperties, MyPropertiesResponse, MyPropertiesFilters } from '@/services';

export const useMyProperties = (initialFilters: MyPropertiesFilters = {}) => {
  const [data, setData] = useState<MyPropertiesResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<MyPropertiesFilters>(() => {
    // Default to last 7 days if no date filters provided
    const defaultFromDate = new Date();
    defaultFromDate.setDate(defaultFromDate.getDate() - 7);
    const defaultToDate = new Date();
    
    return {
      page: 1,
      limit: 20,
      from_date: initialFilters.from_date || defaultFromDate.toISOString(),
      to_date: initialFilters.to_date || defaultToDate.toISOString(),
      ...initialFilters
    };
  });

  const refetch = async (newFilters?: MyPropertiesFilters) => {
    try {
      setLoading(true);
      setError(null);
      
      const filtersToUse = newFilters ? { ...filters, ...newFilters } : filters;
      const response = await fetchMyProperties(filtersToUse);
      setData(response);
      
      if (newFilters) {
        setFilters(filtersToUse);
      }
    } catch (err) {
      console.error('Failed to load my properties:', err);
      setError('Không thể tải danh sách tin đăng');
    } finally {
      setLoading(false);
    }
  };

  const updateFilters = (newFilters: Partial<MyPropertiesFilters>) => {
    const updatedFilters = { ...filters, ...newFilters, page: 1 }; // Reset to page 1 when filters change
    setFilters(updatedFilters);
    refetch(updatedFilters);
  };

  const changePage = (page: number) => {
    const updatedFilters = { ...filters, page };
    setFilters(updatedFilters);
    refetch(updatedFilters);
  };

  const updateStatusFilter = (status: string | number) => {
    updateFilters({ status });
  };

  const updateDateFilter = (fromDate: string, toDate: string) => {
    updateFilters({ 
      from_date: fromDate,
      to_date: toDate 
    });
  };

  // Initial fetch on component mount
  useEffect(() => {
    refetch();
  }, []); // Empty dependency array for initial load only

  return {
    data,
    loading,
    error,
    filters,
    refetch,
    updateFilters,
    changePage,
    updateStatusFilter,
    updateDateFilter
  };
};
