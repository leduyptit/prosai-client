'use client';

import React, { useState, useEffect } from 'react';
import AIRanking from '@/components/features/dashboard/AIRanking';
import { propertyService } from '@/services/property';
import { PropertyRankingItem } from '@/types/api';

const PropertyRankingPage: React.FC = () => {
  // State management for AI suggested properties only
  const [rankingLoading, setRankingLoading] = useState(false);
  const [rankingData, setRankingData] = useState<PropertyRankingItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Load initial data for AI suggested properties
  useEffect(() => {
    const loadInitialRankingData = async () => {
      setRankingLoading(true);
      try {
        const response = await propertyService.getAISuggestedProperties(1, 100);
        setRankingData(response.data);
        setCurrentPage(response.page);
        setHasMoreData(response.page < response.pageCount);
      } catch (error) {
        console.error('Failed to load initial AI suggested data:', error);
      } finally {
        setRankingLoading(false);
      }
    };

    loadInitialRankingData();
  }, []);


  // Handle load more functionality for AI suggested properties
  const handleLoadMoreRanking = async () => {
    if (loadingMore || !hasMoreData) return;

    setLoadingMore(true);
    const nextPage = currentPage + 1;

    try {
      // Load more AI suggested properties
      const response = await propertyService.getAISuggestedProperties(nextPage, 100);

      // Append new data to existing data
      setRankingData(prev => [...prev, ...response.data]);
      setCurrentPage(response.page);
      setHasMoreData(response.page < response.pageCount);

    } catch (error) {
      console.error('Failed to load more AI suggested data:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AIRanking
        rankingLoading={rankingLoading}
        rankingData={rankingData}
        onLoadMore={handleLoadMoreRanking}
        hasMoreData={hasMoreData}
        loadingMore={loadingMore}
      />
    </div>
  );
};

export default PropertyRankingPage;
