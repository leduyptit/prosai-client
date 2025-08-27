'use client';

import React, { useState, useEffect } from 'react';
import { Input, Button } from 'antd';
import Select from '@/components/ui/forms/Select';
import { HeartOutlined } from '@ant-design/icons';
import { LocationSearchInput } from '@/components/features/search';
import { 
  PROPERTY_TYPES, 
  PRICE_RANGES, 
  AREA_RANGES, 
  BEDROOM_OPTIONS,
  BATHROOM_OPTIONS
} from '@/constants';

interface FiltersBarProps {
  onSearch?: (params: any) => void;
  initialFilters?: {
    city?: string;
    district?: string;
    propertyType?: string;
    priceRange?: string;
    areaRange?: string;
    bedrooms?: string;
    bathrooms?: string;
    legalStatus?: string;
    listingType?: string;
  };
}

const iconClass = 'inline-block align-middle';

const LocationIcon = () => (
  <svg className={iconClass} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const MapIcon = () => (
  <svg className={iconClass} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="1 6 8 3 16 6 23 3 23 18 16 21 8 18 1 21 1 6" />
    <line x1="8" y1="3" x2="8" y2="18" />
    <line x1="16" y1="6" x2="16" y2="21" />
  </svg>
);

const FiltersBar: React.FC<FiltersBarProps> = ({ onSearch, initialFilters }) => {
  const [filters, setFilters] = useState({
    city: initialFilters?.city || '',
    district: initialFilters?.district || '',
    propertyType: initialFilters?.propertyType || 'all',
    priceRange: initialFilters?.priceRange || 'all',
    areaRange: initialFilters?.areaRange || 'all',
    bedrooms: initialFilters?.bedrooms || 'all',
    bathrooms: initialFilters?.bathrooms || 'all',
    legalStatus: initialFilters?.legalStatus || 'all',
    listingType: initialFilters?.listingType || '1'
  });

  const [keyword, setKeyword] = useState<string>('');
  const [keywordTagText, setKeywordTagText] = useState<string>('');
  const [showKeywordAsTag, setShowKeywordAsTag] = useState<boolean>(false);

  // Update filters when initialFilters change
  useEffect(() => {
    if (initialFilters) {
      setFilters({
        city: initialFilters.city || '',
        district: initialFilters.district || '',
        propertyType: initialFilters.propertyType || 'all',
        priceRange: initialFilters.priceRange || 'all',
        areaRange: initialFilters.areaRange || 'all',
        bedrooms: initialFilters.bedrooms || 'all',
        bathrooms: initialFilters.bathrooms || 'all',
        legalStatus: initialFilters.legalStatus || 'all',
        listingType: initialFilters.listingType || '1'
      });
    }
  }, [initialFilters]);

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

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Convert filters to API params
    const apiParams: any = {};
    
    // City mapping - only include if not empty
    if (newFilters.city && newFilters.city.trim() !== '') {
      apiParams.city = newFilters.city;
    }
    
    // District - only include if not empty
    if (newFilters.district && newFilters.district.trim() !== '') {
      apiParams.district = newFilters.district;
    }
    
    // Property type - only include if not 'all'
    if (newFilters.propertyType !== 'all') {
      apiParams.property_type = newFilters.propertyType;
    }
    
    // Price range - only include if not 'all'
    if (newFilters.priceRange !== 'all') {
      const [min, max] = newFilters.priceRange.split('-');
      if (min) apiParams.from_price = parseInt(min);
      if (max && max !== '+') apiParams.to_price = parseInt(max);
    }
    
    // Area range - only include if not 'all'
    if (newFilters.areaRange !== 'all') {
      const [min, max] = newFilters.areaRange.split('-');
      if (min) apiParams.from_area = parseInt(min);
      if (max && max !== '+') apiParams.to_area = parseInt(max);
    }
    
    // Bedrooms - only include if not 'all'
    if (newFilters.bedrooms !== 'all') {
      apiParams.bedrooms = parseInt(newFilters.bedrooms);
    }
    
    // Bathrooms - only include if not 'all'
    if (newFilters.bathrooms !== 'all') {
      apiParams.bathrooms = parseInt(newFilters.bathrooms);
    }
    
    // Legal status - only include if not 'all'
    if (newFilters.legalStatus !== 'all') {
      apiParams.legal_status = newFilters.legalStatus;
    }
    
    // Listing type - always include
    if (newFilters.listingType) {
      apiParams.listing_type = newFilters.listingType;
    }
    
    // Add keyword if exists
    if (keyword && keyword.trim()) {
      apiParams.keyword = keyword.trim();
    }
    
    onSearch?.(apiParams);
  };

  const handleSearch = () => {
    // Convert current filters to API params
    const apiParams: any = {};
    
    if (filters.city && filters.city.trim() !== '') {
      apiParams.city = filters.city;
    }
    
    if (filters.district && filters.district.trim() !== '') {
      apiParams.district = filters.district;
    }
    
    if (filters.propertyType !== 'all') {
      apiParams.property_type = filters.propertyType;
    }
    
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-');
      if (min) apiParams.from_price = parseInt(min);
      if (max && max !== '+') apiParams.to_price = parseInt(max);
    }
    
    if (filters.areaRange !== 'all') {
      const [min, max] = filters.areaRange.split('-');
      if (min) apiParams.from_area = parseInt(min);
      if (max && max !== '+') apiParams.to_area = parseInt(max);
    }
    
    if (filters.bedrooms !== 'all') {
      apiParams.bedrooms = parseInt(filters.bedrooms);
    }
    
    if (filters.bathrooms !== 'all') {
      apiParams.bathrooms = parseInt(filters.bathrooms);
    }
    
    if (filters.legalStatus !== 'all') {
      apiParams.legal_status = filters.legalStatus;
    }
    
    // Listing type - always include
    if (filters.listingType) {
      apiParams.listing_type = filters.listingType;
    }
    
    if (keyword && keyword.trim()) {
      apiParams.keyword = keyword.trim();
      // Set keyword as tag after search
      setKeywordTagText(keyword.trim());
      setShowKeywordAsTag(true);
    }
    
    onSearch?.(apiParams);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
      {/* Row 1 */}
      <div className="md:flex md:flex-wrap items-center md:gap-3">
        <div className="mb-3 md:mb-0 flex-1">
          <LocationSearchInput
            city={filters.city}
            district={filters.district}
            onCityChange={(city) => handleFilterChange('city', city)}
            onDistrictChange={(district) => handleFilterChange('district', district)}
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
            placeholder="Nhập địa điểm, dự án, quận, huyện..."
            showKeywordAsTag={showKeywordAsTag}
            keywordTagText={keywordTagText}
          />
        </div>

        {/* Save filter */}
        <Button className="h-10 px-4 border-gray-300 flex items-center gap-2 w-full md:w-auto" size="middle">
          <HeartOutlined />
          <span className="font-medium">Lưu bộ lọc</span>
        </Button>

        {/* View map */}
        <Button className="h-10 px-4 bg-orange-500 hover:bg-orange-600 text-white border-none flex items-center gap-2 map-button w-full md:w-auto md:py-2 my-3 md:my-0" size="middle">
          <img src="/svgs/icon_map.svg" alt="map" className="h-4 w-4" />
          <span className="font-medium" >Xem bản đồ</span>
        </Button>
      </div>

      {/* Row 2 */}
      <div className="mt-3 grid grid-cols-2 md:grid-cols-6 gap-3">
                 <Select 
           size="small" 
           placeholder="Loại hình" 
           className="w-full" 
           variant="outlined" 
           value={filters.propertyType}
           onChange={(value) => handleFilterChange('propertyType', value)}
           options={[
             { value: 'all', label: 'Tất cả loại hình' },
             ...PROPERTY_TYPES as any
           ]} 
         />
                 <Select 
           size="small" 
           placeholder="Giá" 
           className="w-full" 
           variant="outlined" 
           value={filters.priceRange}
           onChange={(value) => handleFilterChange('priceRange', value)}
           options={
            [
              { value: 'all', label: 'Tất cả giá' },
              ...PRICE_RANGES as any
            ]
          } 
         />
                 <Select 
           size="small" 
           placeholder="Diện tích" 
           className="w-full" 
           variant="outlined" 
           value={filters.areaRange}
           onChange={(value) => handleFilterChange('areaRange', value)}
           options={
            [
              { value: 'all', label: 'Tất cả diện tích' },
              ...AREA_RANGES as any
            ]
          } 
         />
                 <Select 
           size="small" 
           placeholder="Số phòng ngủ" 
           className="w-full" 
           variant="outlined" 
           value={filters.bedrooms}
           onChange={(value) => handleFilterChange('bedrooms', value)}
           options={
            [
              { value: 'all', label: 'Tất cả phòng ngủ' },
              ...BEDROOM_OPTIONS as any
            ]
          } 
         />
                 <Select 
           size="small" 
           placeholder="Số phòng tắm" 
           className="w-full" 
           variant="outlined" 
           value={filters.bathrooms}
           onChange={(value) => handleFilterChange('bathrooms', value)}
           options={[
             { value: 'all', label: 'Tất cả phòng tắm' },
             ...BATHROOM_OPTIONS as any
           ]} 
         />
                 <Select 
           size="small" 
           placeholder="Pháp lý" 
           className="w-full" 
           variant="outlined"
           value={filters.legalStatus}
           onChange={(value) => handleFilterChange('legalStatus', value)}
           options={[
             { value: 'all', label: 'Tất cả pháp lý' },
             { value: 'sổ đỏ', label: 'Sổ đỏ' },
             { value: 'hđmb', label: 'HĐMB' },
             { value: 'khác', label: 'Khác' },
           ]} 
         />
      </div>
    </div>
  );
};

export default FiltersBar;
