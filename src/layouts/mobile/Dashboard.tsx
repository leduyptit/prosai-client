'use client';

import React, { useState, useEffect } from 'react';
import { Select, Input, Button, Card } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { 
  LISTING_TYPES
} from '@/constants';
import { fetchStatistics, StatisticsResponse } from '@/services/statistics';
import { fetchNewsCategories, fetchNewsByCategory, NewsCategory, NewsArticle } from '@/services/news';
import { propertyService } from '@/services/property';
import { PropertyRankingItem } from '@/types/api';

// Import dashboard components (excluding HeaderBanner)
import {
  PropertyRanking,
  PropertySuggest,
  NewsSection,
  AboutSection
} from '@/components/features/dashboard';

const MobileDashboard: React.FC = () => {
  const router = useRouter();
  const [searchForm, setSearchForm] = useState({
    location: 'hn',
    keyword: '',
    propertyType: undefined,
    priceRange: undefined,
  });

  // Desktop dashboard states
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

  const handleSearch = () => {
    console.log('Search:', searchForm);
    // Navigate to search results
  };

  const handleInputChange = (field: string, value: string) => {
    setSearchForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Desktop dashboard handlers
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
      setPropertySliderIndex(0);
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
      if (rankingData[index].length > 0) {
        setRankingLoading(false);
        return;
      }

      let response;
      switch (index) {
        case 0:
          response = await propertyService.getTopProperties(1, 8);
          break;
        case 1:
          response = await propertyService.getHighRatedProperties(1, 8);
          break;
        case 2:
          response = await propertyService.getAISuggestedProperties(1, 8);
          break;
        default:
          response = await propertyService.getTopProperties(1, 8);
      }

      const newRankingData = [...rankingData];
      newRankingData[index] = response.data;
      setRankingData(newRankingData);

      const newRankingPages = [...rankingPages];
      newRankingPages[index] = response.page;
      setRankingPages(newRankingPages);

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
        case 0:
          response = await propertyService.getTopProperties(nextPage, 8);
          break;
        case 1:
          response = await propertyService.getHighRatedProperties(nextPage, 8);
          break;
        case 2:
          response = await propertyService.getAISuggestedProperties(nextPage, 8);
          break;
        default:
          response = await propertyService.getTopProperties(nextPage, 8);
      }

      const newRankingData = [...rankingData];
      newRankingData[activeRankingTab] = [...newRankingData[activeRankingTab], ...response.data];
      setRankingData(newRankingData);

      const newRankingPages = [...rankingPages];
      newRankingPages[activeRankingTab] = response.page;
      setRankingPages(newRankingPages);

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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative h-64 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/images/imgdemo_new@2x.png)'
        }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            <h1 className="text-2xl font-bold mb-2">Tìm kiếm BĐS</h1>
            <p className="text-sm opacity-90">Nền tảng bất động sản hàng đầu</p>
          </div>
        </div>
      </div>

      {/* Search Form */}
      <div className="px-4 -mt-8 relative z-20">
        <Card className="rounded-lg shadow-lg">
          <div className="space-y-3">
            {/* Location & Keyword */}
            <div className="flex gap-2">
              <Select
                value={searchForm.location}
                onChange={(value) => handleInputChange('location', value)}
                className="w-24"
                options={[
                  { value: 'hn', label: 'Hà Nội' },
                  { value: 'hcm', label: 'TP. HCM' },
                  { value: 'dn', label: 'Đà Nẵng' },
                ]}
              />
              <Input
                placeholder="Nhập địa điểm..."
                value={searchForm.keyword}
                onChange={(e) => handleInputChange('keyword', e.target.value)}
                className="flex-1"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-2 gap-2">
              <Select
                placeholder="Loại hình"
                value={searchForm.propertyType}
                onChange={(value) => handleInputChange('propertyType', value || '')}
                className="w-full"
                options={[
                  { value: 'apartment', label: 'Chung cư' },
                  { value: 'house', label: 'Nhà riêng' },
                  { value: 'villa', label: 'Biệt thự' },
                ]}
              />
              <Select
                placeholder="Mức giá"
                value={searchForm.priceRange}
                onChange={(value) => handleInputChange('priceRange', value || '')}
                className="w-full"
                options={[
                  { value: 'under-3', label: 'Dưới 3 tỷ' },
                  { value: '3-5', label: '3-5 tỷ' },
                  { value: 'over-5', label: 'Trên 5 tỷ' },
                ]}
              />
            </div>

            {/* Search Button */}
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={handleSearch}
              className="w-full bg-blue-600 hover:bg-blue-700"
              size="large"
            >
              Tìm kiếm
            </Button>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mt-6">
        <div className="grid grid-cols-2 gap-4">
          <Button
            size="large"
            className="bg-orange-500 hover:bg-orange-600 text-white border-none h-12"
          >
            <img src="/svgs/icon_post.svg" alt="post" className="w-5 h-5 mr-2" />
            Đăng tin bán
          </Button>
          <Button
            size="large"
            className="bg-blue-600 hover:bg-blue-700 text-white border-none h-12"
          >
            <img src="/svgs/icon_ai.svg" alt="ai" className="w-5 h-5 mr-2" />
            Tư vấn AI
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 mt-6">
        <div className="rounded-xl p-5 text-white relative">
          <div className="absolute top-0 left-0 w-full h-full bg-blue-600 rounded-xl text-white border-2 border-[#0080FF] z-0" style={{
            background: 'linear-gradient(180deg, #0080FF 0%, #0056B3 100%)',
            opacity: 0.9,
          }}></div>
          
          {/* Header */}
          <div className="text-center mb-4 border-b border-[#C3C3C3] pb-4 relative z-10">
            <h3 className="text-base font-medium mb-2">
              Thị trường nhà đất hôm nay
            </h3>
            <div className="text-sm">
              {statistics?.data.date || new Date().toISOString().split('T')[0]}
            </div>
            {error && (
              <div className="mt-2 p-2 bg-red-500/20 border border-red-500/30 rounded text-xs text-red-200">
                {error}
              </div>
            )}
            <div className="space-y-1 text-xs mt-3">
              <div className="flex items-center justify-center gap-2">
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <span>Nhà bán với giá trị thực tế: <span className="font-bold text-[#FFAA22]">{loading ? '...' : statistics?.data.market.real_value.toLocaleString() || '19,000'}</span></span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <span>Khoảng cách giao với giá thực tế: <span className="font-bold text-[#FFAA22]">{loading ? '...' : statistics?.data.market.transaction_gap.toLocaleString() || '5,000'}</span></span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <span>Mức độ quan tâm: <span className="font-bold text-[#FFAA22]">{loading ? '...' : statistics?.data.market.interest_rate_change || '+18%'}</span> so với hôm qua</span>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="relative z-10">
            {/* Card 1 */}
            <div className="text-center mb-2">
              <h4 className="text-sm font-medium mb-2">Các con số ấn tượng</h4>
              <div className="grid grid-cols-2 gap-0">
                <div className="text-center p-3 border-r border-b border-dashed border-[#C3C3C3]">
                  <div className="text-lg font-medium text-[#FFAA22] mb-1">
                    {loading ? '...' : statistics?.data.highlights.buyers.toLocaleString() || '1.000.000'}
                  </div>
                  <div className="text-xs">Tin mua bán/ cho thuê nhà trọ</div>
                </div>
                <div className="text-center p-3 border-b border-dashed border-[#C3C3C3]">
                  <div className="text-lg font-medium text-[#FFAA22] mb-1">
                    {loading ? '...' : statistics?.data.highlights.potential_customers.toLocaleString() || '100.000'}
                  </div>
                  <div className="text-xs">Khách hàng tiềm năng</div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="text-center">
              <div className="grid grid-cols-2 gap-0">
                <div className="text-center p-3 border-r border-dashed border-[#C3C3C3]">
                  <div className="text-lg font-medium text-[#FFAA22] mb-1">
                    {loading ? '...' : statistics?.data.highlights.ai_matching_accuracy || '100%'}
                  </div>
                  <div className="text-xs">Ứng dụng AI tìm nhà phù hợp theo yêu cầu</div>
                </div>
                <div className="text-center p-3">
                  <div className="text-lg font-medium text-[#FFAA22] mb-1">
                    {loading ? '...' : statistics?.data.highlights.matching_speed || '1s'}
                  </div>
                  <div className="text-xs">Hiển thị kết quả phù hợp với bạn</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Property Ranking */}
      <div className="md:mt-8">
        <PropertyRanking
          activeRankingTab={activeRankingTab}
          rankingLoading={rankingLoading}
          rankingData={rankingData}
          onRankingTabChange={handleRankingTabChange}
          onLoadMore={handleLoadMoreRanking}
          hasMoreData={rankingHasMore[activeRankingTab]}
          loadingMore={loadingMore}
        />
      </div>

      {/* Property Suggest */}
      <div className="md:mt-8">
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
      </div>
      
      {/* News Property */}
      <div className="md:mt-8">
        <NewsSection
          activeNewsTab={activeNewsTab}
          newsLoading={newsLoading}
          newsCategoriesLoading={newsCategoriesLoading}
          newsCategories={newsCategories}
          newsData={newsData}
          onNewsTabChange={handleNewsTabChange}
        />
      </div>
       
      {/* About Home */}
      <div className="md:mt-8">
        <AboutSection />
      </div>
    </div>
  );
};

export default MobileDashboard;