'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  LISTING_TYPES
} from '@/constants';
import { fetchStatistics, StatisticsResponse } from '@/services/statistics';
import { fetchNewsCategories, fetchNewsByCategory, NewsCategory, NewsArticle } from '@/services/news';
import { propertyService } from '@/services/property';
import { PropertyRankingItem } from '@/types/api';

// Import dashboard components
import {
  HeaderBanner,
  PropertyRanking,
  PropertySuggest,
  NewsSection,
  AboutSection
} from '@/components/features/dashboard';



const DesktopDashboard: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [activeNewsTab, setActiveNewsTab] = useState(0);
  const [newsLoading, setNewsLoading] = useState(false);
  const [propertySliderLoading, setPropertySliderLoading] = useState(false);
  const [activePropertySliderTab, setActivePropertySliderTab] = useState<'sale' | 'rent'>('sale');
  const [activeRankingTab, setActiveRankingTab] = useState(0);
  const [rankingLoading, setRankingLoading] = useState(false);
  const [propertySliderIndex, setPropertySliderIndex] = useState(0);
  const [statistics, setStatistics] = useState<StatisticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Property ranking data state
  const [propertySliderSaleData, setPropertySliderSaleData] = useState<PropertyRankingItem[]>([]);
  const [propertySliderRentData, setPropertySliderRentData] = useState<PropertyRankingItem[]>([]);
  
    // News state
  const [newsCategories, setNewsCategories] = useState<NewsCategory[]>([]);
  const [newsData, setNewsData] = useState<NewsArticle[][]>([]);
  const [newsCategoriesLoading, setNewsCategoriesLoading] = useState(true);

  // Property Ranking data state
  const [rankingData, setRankingData] = useState<PropertyRankingItem[][]>([[], [], []]);
  const [rankingPages, setRankingPages] = useState<number[]>([1, 1, 1]);
  const [rankingHasMore, setRankingHasMore] = useState<boolean[]>([true, true, true]);
  const [loadingMore, setLoadingMore] = useState(false);
  
  const [searchForm, setSearchForm] = useState({
    city: 'Tất cả',
    keyword: '',
    propertyType: undefined as string | undefined,
    listingType: undefined as string | undefined,
    priceRange: undefined as string | undefined,
    area: undefined as string | undefined,
    bedrooms: undefined as string | undefined,
    legal: undefined as string | undefined
  });

  const handleSearch = () => {
    // Convert search form to URL parameters
    const params = new URLSearchParams();
    
    // Add city parameter (only if not "Tất cả")
    if (searchForm.city && searchForm.city !== 'Tất cả') {
      params.set('city', searchForm.city);
    }
    
    // Add keyword parameter (only if not empty)
    if (searchForm.keyword && searchForm.keyword.trim() !== '') {
      params.set('keyword', searchForm.keyword.trim());
    }
    
    // Add property type parameter (only if selected)
    if (searchForm.propertyType && searchForm.propertyType !== 'all') {
      params.set('property_type', searchForm.propertyType);
    }
    
    // Add listing type parameter (only if selected)
    if (searchForm.listingType && searchForm.listingType !== 'all') {
      params.set('listing_type', searchForm.listingType);
    }
    
    // Add price range parameter (only if selected)
    if (searchForm.priceRange && searchForm.priceRange !== 'all') {
      const [min, max] = String(searchForm.priceRange).split('-');
      if (min) params.set('from_price', min);
      if (max && max !== '+') params.set('to_price', max);
    }
    
    // Add area range parameter (only if selected)
    if (searchForm.area && searchForm.area !== 'all') {
      const [min, max] = String(searchForm.area).split('-');
      if (min) params.set('from_area', min);
      if (max && max !== '+') params.set('to_area', max);
    }
    
    // Add bedrooms parameter (only if selected)
    if (searchForm.bedrooms && searchForm.bedrooms !== 'all') {
      params.set('bedrooms', searchForm.bedrooms);
    }
    
    // Add legal status parameter (only if selected)
    if (searchForm.legal && searchForm.legal !== 'all') {
      params.set('legal_status', searchForm.legal);
    }
    
    // Navigate to search page with parameters
    const searchUrl = `/search${params.toString() ? `?${params.toString()}` : ''}`;
    router.push(searchUrl);
  };

  const handleInputChange = (field: string, value: string | undefined) => {
    setSearchForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    // Update listing type based on selected tab
    const selectedTab = LISTING_TYPES[index];
    if (selectedTab) {
      setSearchForm(prev => ({
        ...prev,
        listingType: selectedTab.value
      }));
    }
  };

  const handleNewsTabChange = async (index: number) => {
    if (newsCategories.length === 0) return;
    
    setNewsLoading(true);
    try {
      const category = newsCategories[index];
      const newsResponse = await fetchNewsByCategory(category.id, 1, 10, 'latest');
      const newNewsData = [...newsData];
      newNewsData[index] = newsResponse.data || [];
      setNewsData(newNewsData);
      setActiveNewsTab(index);
    } catch (error) {
      console.error('Failed to load news:', error);
      // Set empty array for failed requests to prevent undefined errors
      const newNewsData = [...newsData];
      newNewsData[index] = [];
      setNewsData(newNewsData);
      setActiveNewsTab(index);
    } finally {
      setNewsLoading(false);
    }
  };

  const handlePropertySliderTabChange = async (type: 'sale' | 'rent') => {
    setPropertySliderLoading(true);
    try {
      const apiType = type === 'sale' ? 'latest_sale' : 'latest_rent';
      const data = await propertyService.getPropertyRanking(apiType, 8);
      
      if (type === 'sale') {
        setPropertySliderSaleData(data);
      } else {
        setPropertySliderRentData(data);
      }
      
    setActivePropertySliderTab(type);
    setPropertySliderIndex(0); // Reset slider index when changing tabs
    } catch (error) {
      console.error('Failed to load property data:', error);
    } finally {
    setPropertySliderLoading(false);
    }
  };

  const handleRankingTabChange = async (index: number) => {
    setRankingLoading(true);
    setActiveRankingTab(index);
    
    try {
      // If data already exists for this tab, just switch
      if (rankingData[index].length > 0) {
    setRankingLoading(false);
        return;
      }

      // Load data for the selected tab
      let response;
      switch (index) {
        case 0: // Top BĐS được quan tâm
          response = await propertyService.getTopProperties(1, 8);
          break;
        case 1: // BĐS đánh giá cao nhất
          response = await propertyService.getHighRatedProperties(1, 8);
          break;
        case 2: // Gợi ý AI xếp hạng
          response = await propertyService.getAISuggestedProperties(1, 8);
          break;
        default:
          response = await propertyService.getTopProperties(1, 8);
      }

      // Update ranking data
      const newRankingData = [...rankingData];
      newRankingData[index] = response.data;
      setRankingData(newRankingData);

      // Update pagination info
      const newRankingPages = [...rankingPages];
      newRankingPages[index] = response.page;
      setRankingPages(newRankingPages);

      // Update hasMore info
      const newRankingHasMore = [...rankingHasMore];
      newRankingHasMore[index] = response.page < response.pageCount;
      setRankingHasMore(newRankingHasMore);

    } catch (error) {
      console.error('Failed to load ranking data:', error);
    } finally {
      setRankingLoading(false);
    }
  };

  const handleLoadMoreRanking = async () => {
    setLoadingMore(true);
    
    try {
      const currentPage = rankingPages[activeRankingTab];
      const nextPage = currentPage + 1;

      let response;
      switch (activeRankingTab) {
        case 0: // Top BĐS được quan tâm
          response = await propertyService.getTopProperties(nextPage, 8);
          break;
        case 1: // BĐS đánh giá cao nhất
          response = await propertyService.getHighRatedProperties(nextPage, 8);
          break;
        case 2: // Gợi ý AI xếp hạng
          response = await propertyService.getAISuggestedProperties(nextPage, 8);
          break;
        default:
          response = await propertyService.getTopProperties(nextPage, 8);
      }

      // Append new data to existing data
      const newRankingData = [...rankingData];
      newRankingData[activeRankingTab] = [...newRankingData[activeRankingTab], ...response.data];
      setRankingData(newRankingData);

      // Update pagination info
      const newRankingPages = [...rankingPages];
      newRankingPages[activeRankingTab] = response.page;
      setRankingPages(newRankingPages);

      // Update hasMore info
      const newRankingHasMore = [...rankingHasMore];
      newRankingHasMore[activeRankingTab] = response.page < response.pageCount;
      setRankingHasMore(newRankingHasMore);

    } catch (error) {
      console.error('Failed to load more ranking data:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  const handlePropertySliderNext = () => {
    const currentData = activePropertySliderTab === 'sale' ? propertySliderSaleData : propertySliderRentData;
    const maxIndex = Math.max(0, currentData.length - 4);
    setPropertySliderIndex(prev => Math.min(prev + 4, maxIndex));
  };

  const handlePropertySliderPrev = () => {
    setPropertySliderIndex(prev => Math.max(0, prev - 4));
  };

  // Fetch statistics data on component mount
  useEffect(() => {
    const loadStatistics = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchStatistics();
        setStatistics(data);
      } catch (error) {
        console.error('Failed to load statistics:', error);
        setError('Không thể tải dữ liệu thống kê');
      } finally {
        setLoading(false);
      }
    };

    loadStatistics();
  }, []);

  // Fetch news categories on component mount
  useEffect(() => {
    const loadNewsCategories = async () => {
      try {
        setNewsCategoriesLoading(true);
        const categories = await fetchNewsCategories();
        setNewsCategories(categories);
        
        // Load initial news data for first category
        if (categories.length > 0) {
          try {
            const newsResponse = await fetchNewsByCategory(categories[0].id, 1, 10, 'latest');
            setNewsData([newsResponse.data || []]);
          } catch (error) {
            console.error('Failed to load initial news:', error);
            setNewsData([[]]);
          }
        }
      } catch (error) {
        console.error('Failed to load news categories:', error);
      } finally {
        setNewsCategoriesLoading(false);
      }
    };

    loadNewsCategories();
  }, []);

  // Load initial property data
  useEffect(() => {
    const loadInitialPropertyData = async () => {
      try {
        const saleData = await propertyService.getPropertyRanking('latest_sale', 8);
        setPropertySliderSaleData(saleData);
      } catch (error) {
        console.error('Failed to load initial sale data:', error);
      }
    };

    loadInitialPropertyData();
  }, []);

  // Load initial ranking data
  useEffect(() => {
    const loadInitialRankingData = async () => {
      try {
        // Load top properties for the first tab by default
        const response = await propertyService.getTopProperties(1, 8);
        
        setRankingData(prev => {
          const newData = [...prev];
          newData[0] = response.data;
          return newData;
        });

        setRankingPages(prev => {
          const newPages = [...prev];
          newPages[0] = response.page;
          return newPages;
        });

        setRankingHasMore(prev => {
          const newHasMore = [...prev];
          newHasMore[0] = response.page < response.pageCount;
          return newHasMore;
        });

      } catch (error) {
        console.error('Failed to load initial ranking data:', error);
      }
    };

    loadInitialRankingData();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Header Banner */}
      <HeaderBanner
        activeTab={activeTab}
        searchForm={searchForm}
        statistics={statistics}
        loading={loading}
        error={error}
        onTabChange={handleTabChange}
        onInputChange={handleInputChange}
        onSearch={handleSearch}
      />

      {/* Property Ranking */}
      <PropertyRanking
        activeRankingTab={activeRankingTab}
        rankingLoading={rankingLoading}
        rankingData={rankingData}
        onRankingTabChange={handleRankingTabChange}
        onLoadMore={handleLoadMoreRanking}
        hasMoreData={rankingHasMore[activeRankingTab]}
        loadingMore={loadingMore}
      />

      {/* Property Suggest */}
      <PropertySuggest
        activePropertySliderTab={activePropertySliderTab}
        propertySliderLoading={propertySliderLoading}
        propertySliderIndex={propertySliderIndex}
        propertySliderSaleData={propertySliderSaleData}
        propertySliderRentData={propertySliderRentData}
        onPropertySliderTabChange={handlePropertySliderTabChange}
        onPropertySliderNext={handlePropertySliderNext}
        onPropertySliderPrev={handlePropertySliderPrev}
      />
      
      {/* News Property */}
      <NewsSection
        activeNewsTab={activeNewsTab}
        newsLoading={newsLoading}
        newsCategoriesLoading={newsCategoriesLoading}
        newsCategories={newsCategories}
        newsData={newsData}
        onNewsTabChange={handleNewsTabChange}
      />
       
      {/* About Home */}
      <AboutSection />
    </div>
  );
};

export default DesktopDashboard; 