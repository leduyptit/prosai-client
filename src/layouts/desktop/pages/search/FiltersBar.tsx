'use client';

import React, { useState } from 'react';
import { Input, Button } from 'antd';
import Select from '@/components/ui/forms/Select';
import { HeartOutlined } from '@ant-design/icons';
import { 
  CITIES, 
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
    keyword?: string;
    propertyType?: string;
    priceRange?: string;
    areaRange?: string;
    bedrooms?: string;
    bathrooms?: string;
    legalStatus?: string;
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
    city: initialFilters?.city || 'all',
    keyword: initialFilters?.keyword || '',
    propertyType: initialFilters?.propertyType || 'all',
    priceRange: initialFilters?.priceRange || 'all',
    areaRange: initialFilters?.areaRange || 'all',
    bedrooms: initialFilters?.bedrooms || 'all',
    bathrooms: initialFilters?.bathrooms || 'all',
    legalStatus: initialFilters?.legalStatus || 'all'
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Convert filters to API params
    const apiParams: any = {};
    
    // City mapping - only include if not default
    if (newFilters.city !== 'all') {
      apiParams.city = newFilters.city;
    }
    
    // Keyword - only include if not empty
    if (newFilters.keyword && newFilters.keyword.trim() !== '') {
      apiParams.keyword = newFilters.keyword;
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
    
    onSearch?.(apiParams);
  };

  const handleSearchClick = () => {
    handleFilterChange('keyword', filters.keyword);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
      {/* Row 1 */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 flex-1 border border-gray-200 rounded-lg h-10 text-gray-700 min-w-[160px]">
          {/* Location */}
          <div className="flex items-center gap-2 rounded-lg px-3 h-10 text-gray-700 min-w-[160px]">
            <img src="/svgs/address.svg" alt="location" className="h-4 w-4" />
                         <Select
               size="small"
               className="w-[120px]"
               variant="borderless"
               value={filters.city}
               onChange={(value) => handleFilterChange('city', value)}
               options={
                [
                  { value: 'all', label: 'Tất cả' },
                  ...CITIES as any
                ]
              }
               popupMatchSelectWidth={160}
             />
        </div>
        
        {/* Keyword + Search */}
        <div className="flex items-stretch flex-1 min-w-[320px]">
                     <Input
             allowClear
             placeholder="Nhập địa điểm, dự án, quận, huyện..."
             variant="borderless"
             value={filters.keyword}
             onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
             onPressEnter={handleSearchClick}
           />
           <Button
             type="primary"
             className="rounded-l-none bg-blue-600 hover:bg-blue-700 text-white m-1"
             size="small"
             onClick={handleSearchClick}
           >
            <span className="font-medium">Tìm kiếm</span>
          </Button>
        </div>
        </div>

        {/* Save filter */}
        <Button className="h-10 px-4 border-gray-300 flex items-center gap-2" size="middle">
          <HeartOutlined />
          <span className="font-medium">Lưu bộ lọc</span>
        </Button>

        {/* View map */}
        <Button className="h-10 px-4 bg-orange-500 hover:bg-orange-600 text-white border-none flex items-center gap-2 map-button" size="middle">
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
              { value: 'all', label: 'Tất cả' },
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
              { value: 'all', label: 'Tất cả' },
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
              { value: 'all', label: 'Tất cả' },
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
             { value: 'all', label: 'Tất cả' },
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
             { value: 'all', label: 'Tất cả' },
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
