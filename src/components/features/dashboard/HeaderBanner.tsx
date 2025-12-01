'use client';

import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import Select from '@/components/ui/forms/Select';
import PriceRangeSelect from '@/components/ui/forms/PriceRangeSelect';
import { useRouter } from 'next/navigation';
import { 
  PROPERTY_TYPES, 
  AREA_RANGES, 
  LISTING_TYPES
} from '@/constants';
import { StatisticsResponse } from '@/services/statistics';
import Link from 'next/link';
import { LocationSearchInput } from '@/components/features/search';


interface HeaderBannerProps {
  activeTab: number;
  searchForm: {
    city: string;
    ward: string;
    propertyType?: string;
    listingType?: string;
    priceRange?: string;
    area?: string;
    bedrooms?: string;
    legal?: string;
  };
  statistics: StatisticsResponse | null;
  loading: boolean;
  error: string | null;
  onTabChange: (index: number) => void;
  onInputChange: (field: string, value: string | undefined) => void;
  onSearch: () => void;
}

const HeaderBanner: React.FC<HeaderBannerProps> = ({
  activeTab,
  searchForm,
  statistics,
  loading,
  error,
  onTabChange,
  onInputChange
}) => {
  const router = useRouter();
  const [keyword, setKeyword] = useState<string>('');
  const [keywordTagText, setKeywordTagText] = useState<string>('');
  const [showKeywordAsTag, setShowKeywordAsTag] = useState<boolean>(false);
  
  // Temporary local state for debugging
  const [localSearchForm, setLocalSearchForm] = useState({
    ...searchForm,
    listingType: searchForm.listingType || '1' // Default to "1" instead of activeTab
  });

  // Auto-load keyword from URL params on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const keywordFromUrl = urlParams.get('keyword');
      if (keywordFromUrl) {
        setKeyword(keywordFromUrl);
        setKeywordTagText(keywordFromUrl);
        setShowKeywordAsTag(true);
      }
    }
  }, []);
  
  // Update local state when prop changes
  useEffect(() => {
    setLocalSearchForm({
      ...searchForm,
      listingType: searchForm.listingType || '1' // Default to "1" instead of activeTab
    });
  }, [searchForm]);
  
  // Local input change handler for debugging
  const handleLocalInputChange = (field: string, value: string | undefined) => {
    console.log(`Local input change: ${field} = ${value}`);
    setLocalSearchForm(prev => ({ ...prev, [field]: value }));
    // Also call the original callback
    onInputChange(field, value);
  };

  // Handle tab change and update listingType
  const handleTabChange = (index: number) => {
    console.log(`Tab changed to: ${index}`);
    setLocalSearchForm(prev => ({ ...prev, listingType: index.toString() }));
    onTabChange(index);
  };

  // Handle search with keyword
  const handleSearch = () => {
    
    // Use local form data for search (for debugging)
    const formDataToUse = localSearchForm;
    
    // Create search params
    const searchParams = new URLSearchParams();
    
    // Add existing form data
    if (formDataToUse.city && formDataToUse.city !== 'Chọn vị trí') {
      searchParams.set('city', formDataToUse.city);
    }
    if (formDataToUse.ward) {
      searchParams.set('ward', formDataToUse.ward);
    }
    if (formDataToUse.propertyType) {
      searchParams.set('property_type', formDataToUse.propertyType);
    }
    
    // Always include listingType with default value 1
    const listingTypeValue = formDataToUse.listingType || '1';
    searchParams.set('listing_type', listingTypeValue);
    
                if (formDataToUse.priceRange && formDataToUse.priceRange !== 'all') {
      const [min, max] = formDataToUse.priceRange.split('-');
      if (min) searchParams.set('from_price', min);
      if (max && max !== '+') searchParams.set('to_price', max);
    }
    if (formDataToUse.area && formDataToUse.area !== 'all') {
      const [min, max] = formDataToUse.area.split('-');
      if (min) searchParams.set('from_area', min);
      if (max && max !== '+') searchParams.set('to_area', max);
    }
    if (formDataToUse.bedrooms) {
      searchParams.set('bedrooms', formDataToUse.bedrooms);
    }
    if (formDataToUse.legal) {
      searchParams.set('legal', formDataToUse.legal);
    }
    
    // Add keyword if exists
    if (keyword && keyword.trim()) {
      searchParams.set('keyword', keyword.trim());
      // Set keyword as tag after search
      setKeywordTagText(keyword.trim());
      setShowKeywordAsTag(true);
    }
    
    // Navigate to search page with params
    const searchUrl = `/search?${searchParams.toString()}`;
    router.push(searchUrl);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to image if video fails
            const target = e.target as HTMLVideoElement;
            target.style.display = 'none';
            const fallbackDiv = target.nextElementSibling as HTMLDivElement;
            if (fallbackDiv) {
              fallbackDiv.style.display = 'block';
            }
          }}
        >
          <source src="/videos/bg_video.mp4" type="video/mp4" />
          <source src="/videos/bg_video.webm" type="video/webm" />
        </video>
        
        {/* Fallback Background Image */}
        <div 
          className="hidden w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/imgdemo_new@2x.png)'
          }}
        />
        
        {/* Overlay */}
        <div className="absolute w-full h-full bg-black bg-opacity-50"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        <div className="responsive-container mx-auto grid grid-cols-12 py-40 space-x-5">
          {/* Left Content - Search Form */}
          <div className="col-span-8 flex justify-center">
            <div className="w-full max-w-2xl">
              {/* Search Form Container */}
              <div className="rounded-2xl shadow-lg p-8 mb-8 bg-[#DAE3EC] border-5 border-white">
                <h2 className="text-2xl font-medium mb-6 text-left">
                  Tìm kiếm BĐS
                </h2>
                {/* Listing Type Tabs */}
                <div className="flex mb-6 border-b-2 border-white space-x-2">
                  {LISTING_TYPES.map((type, index) => (
                    <button
                      key={type.value}
                      onClick={() => handleTabChange(index)}
                      className={`flex-1 py-2 px-3 font-medium rounded-t-md transition-colors text-sm ${
                        index === activeTab 
                          ? 'bg-gray-800 text-white' 
                          : 'bg-[#FFFFFF80] text-[#8D8DA1] border-t-1 border-r-1 border-l-1 border-white hover:bg-[#FFFFFFA0]'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>

                {/* Location and Search Input */}
                <div className="mb-4">
                  <LocationSearchInput
                    city={searchForm.city}
                    ward={searchForm.ward}
                    onCityChange={(city) => onInputChange('city', city)}
                    onWardChange={(ward) => onInputChange('ward', ward)}
                    onKeywordChange={(keyword) => {
                      setKeyword(keyword);
                      if (!keyword) {
                        setKeywordTagText('');
                        setShowKeywordAsTag(false);
                        // Remove keyword from URL params immediately
                        if (typeof window !== 'undefined') {
                          const urlParams = new URLSearchParams(window.location.search);
                          urlParams.delete('keyword');
                          const newUrl = `${window.location.pathname}${urlParams.toString() ? '?' + urlParams.toString() : ''}`;
                          window.history.replaceState({}, '', newUrl);
                        }
                      } else {
                        // Add keyword to URL params immediately
                        if (typeof window !== 'undefined') {
                          const urlParams = new URLSearchParams(window.location.search);
                          urlParams.set('keyword', keyword);
                          const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
                          window.history.replaceState({}, '', newUrl);
                        }
                      }
                    }}
                    onSearch={handleSearch}
                    showSearchButton={true}
                    searchButtonText="Tìm kiếm"
                    searchButtonClassName="bg-blue-600 hover:bg-blue-700"
                    className="mb-2"
                    showKeywordAsTag={showKeywordAsTag}
                    keywordTagText={keywordTagText}
                  />
                </div>

                {/* Filter Options */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <Select
                    placeholder="Loại hình"
                    value={localSearchForm.propertyType}
                    size="small"
                    onChange={(value) => {
                      handleLocalInputChange('propertyType', value || undefined);
                    }}
                    className="w-full placeholder:text-[#8D8DA1] bg-white border-[#C3C3C3] rounded-lg"
                    allowClear
                    options={[{ value: '', label: 'Tất cả loại hình' }, ...(PROPERTY_TYPES as any)]}
                  />
                  <PriceRangeSelect
                    placeholder="Mức giá"
                    value={localSearchForm.priceRange}
                    size="small"
                    onChange={(value) => {
                      handleLocalInputChange('priceRange', value);
                    }}
                    className="w-full placeholder:text-[#8D8DA1] bg-white border-[#C3C3C3] rounded-lg"
                  />
                  <Select
                    placeholder="Diện tích"
                    value={localSearchForm.area}
                    size="small"
                    onChange={(value) => {
                      handleLocalInputChange('area', value || undefined);
                    }}
                    className="w-full placeholder:text-[#8D8DA1] bg-white border-[#C3C3C3] rounded-lg"
                    allowClear
                    options={[{ value: '', label: 'Tất cả diện tích' }, ...(AREA_RANGES as any)]}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                <Button
                  size="large"
                  className="create-post-button text-white border-none px-8 py-3 font-medium"
                  icon={<img src="/svgs/icon_post.svg" className="w-8 h-8" alt="create-post" />}
                  style={{
                    background: 'transparent linear-gradient(270deg, #FFAA22 0%, #FC7400 100%) 0% 0% no-repeat padding-box',
                    color: '#FFFFFF',
                    height: '56px',
                    minWidth: '172px',
                  }}
                >
                  <Link href="/post-property">
                    Đăng tin bán
                  </Link>
                </Button>
                <Button
                  size="large"
                  className="ai-consult-button text-white border-none px-8 py-3 font-medium"
                  icon={<img src="/svgs/icon_ai.svg" className="w-8 h-8" alt="ai-consult" />}
                  style={{
                    background: 'transparent linear-gradient(270deg, #007AFF 0%, #0056B3 100%) 0% 0% no-repeat padding-box',
                    color: '#FFFFFF',
                    height: '56px',
                    minWidth: '172px',
                  }}
                >
                  Tư vấn AI
                </Button>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Statistics */}
          <div className="col-span-4">
            <div className="rounded-xl p-5 text-white relative">
                <div className="absolute top-0 left-0 w-full h-full bg-blue-600 rounded-xl px-10 py-6 text-white border-3 border-[#0080FF] z-0" style={{
                  background: 'transparent linear-gradient(180deg, #0080FF 0%, #0056B3 100%) 0% 0% no-repeat padding-box',
                  color: '#FFFFFF',
                  opacity: 0.9,
                }}></div>
              {/* Header */}
              <div className="text-center mb-6 border-b border-[#C3C3C3] pb-6 relative z-10">
                <h3 className="text-lg font-medium mb-2">
                  Thị trường nhà đất hôm nay {statistics?.data.date || new Date().toLocaleDateString('vi-VN')}
                </h3>
                {error && (
                  <div className="mb-4 p-2 bg-red-500/20 border border-red-500/30 rounded text-sm text-red-200">
                    {error}
                  </div>
                )}
                <div className="space-y-1 text-sm text-left">
                  <div className="flex items-center justify-start gap-2">
                    <img src="/svgs/Group 11556.svg" alt="" className="w-2 h-2"/>
                    <span>Nhà bán với giá trị thực tế: <span className="font-medium text-[#FFAA22]">{loading ? '...' : statistics?.data.market.real_value.toLocaleString() || '19,000'}</span></span>
                  </div>
                  <div className="flex items-center justify-start gap-2">
                    <img src="/svgs/Group 11556.svg" alt="" className="w-2 h-2"/>
                    <span>Khoảng cách giao với giá thực tế: <span className="font-medium text-[#FFAA22]">{loading ? '...' : statistics?.data.market.transaction_gap.toLocaleString() || '5,000'}</span></span>
                  </div>
                  <div className="flex items-center justify-start gap-2">
                    <img src="/svgs/Group 11556.svg" alt="" className="w-2 h-2"/>
                    <span>Mức độ quan tâm: {loading ? '...' : statistics?.data.market.interest_rate_change || '+18%'} so với hôm qua</span>
                  </div>
                </div>
              </div>

              {/* Statistics Cards */}
              <div className="mb-2 relative z-10">
                {/* Card 1 */}
                <div className="text-center mb-0">
                  <h4 className="text-lg font-medium mb-2">Các con số ấn tượng</h4>
                  <div className="grid grid-cols-2">
                    <div className="text-center p-4 border-r border-b border-dashed border-[#C3C3C3]">
                      <div className="text-xl font-medium text-[#FFAA22] mb-2">
                        {loading ? '...' : statistics?.data.highlights.buyers.toLocaleString() || '1 triệu'}
                      </div>
                      <div className="text-xs">Tin mua bán/ cho thuê nhà trọ</div>
                    </div>
                    <div className="text-center p-4 border-b border-dashed border-[#C3C3C3]">
                      <div className="text-xl font-medium text-[#FFAA22] mb-2">
                        {loading ? '...' : statistics?.data.highlights.potential_customers.toLocaleString() || '100,000'}
                      </div>
                      <div className="text-xs">Khách hàng tiềm năng</div>
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="text-center">
                  <div className="grid grid-cols-2">
                    <div className="text-center p-4 border-r border-dashed border-[#C3C3C3]">
                      <div className="text-xl font-medium text-[#FFAA22] mb-2">
                        {loading ? '...' : statistics?.data.highlights.ai_matching_accuracy || '100%'}
                      </div>
                      <div className="text-xs">Ứng dụng AI tìm nhà phù hợp theo yêu cầu</div>
                    </div>
                    <div className="text-center p-4 border-dashed border-[#C3C3C3]">
                      <div className="text-xl font-medium text-[#FFAA22] mb-2">
                        {loading ? '...' : statistics?.data.highlights.matching_speed || '1s'}
                      </div>
                      <div className="text-xs">Hiển thị kết quả phù hợp với bạn</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderBanner;

