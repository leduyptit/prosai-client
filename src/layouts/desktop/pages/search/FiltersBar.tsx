'use client';

import React, { useState, useEffect } from 'react';
import { App, Input, Button } from 'antd';
import Select from '@/components/ui/forms/Select';
import PriceRangeSelect from '@/components/ui/forms/PriceRangeSelect';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { LocationSearchInput } from '@/components/features/search';
import { useSession } from 'next-auth/react';
import { 
  PROPERTY_TYPES, 
  PRICE_RANGES, 
  AREA_RANGES, 
  BEDROOM_OPTIONS,
  BATHROOM_OPTIONS,
  LISTING_TYPES,
  LEGAL_STATUS
} from '@/constants';
import { bookmarkService, BookmarkRequest } from '@/services/bookmarks';

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
  const { data: session } = useSession();
  const { message } = App.useApp();
  
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
  const [hasLoadedFromUrl, setHasLoadedFromUrl] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [isBookmarking, setIsBookmarking] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>('Lưu bộ lọc');

  // Update filters when initialFilters change - but don't override listingType if user has already set it
  useEffect(() => {
    if (initialFilters && !hasLoadedFromUrl) {
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
  }, [initialFilters, hasLoadedFromUrl]);

  // Function to load all filters from URL params
  const loadFiltersFromUrl = () => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      
      // Load keyword from URL params
      const keywordFromUrl = urlParams.get('keyword');
      if (keywordFromUrl) {
        setKeyword(keywordFromUrl);
        setKeywordTagText(keywordFromUrl);
        setShowKeywordAsTag(true);
      } else {
        setKeyword('');
        setKeywordTagText('');
        setShowKeywordAsTag(false);
      }
      
      // Load all filters from URL params - use snake_case consistently
      const listingTypeFromUrl = urlParams.get('listing_type');
      const cityFromUrl = urlParams.get('city');
      const districtFromUrl = urlParams.get('district');
      const propertyTypeFromUrl = urlParams.get('property_type');
      const bedroomsFromUrl = urlParams.get('bedrooms');
      const bathroomsFromUrl = urlParams.get('bathrooms');
      const legalStatusFromUrl = urlParams.get('legal_status');
      
      // Handle price range - convert from_price/to_price back to priceRange
      let priceRangeFromUrl = urlParams.get('price_range');
      if (!priceRangeFromUrl) {
        const fromPrice = urlParams.get('from_price');
        const toPrice = urlParams.get('to_price');
        if (fromPrice || toPrice) {
          if (fromPrice && toPrice) {
            priceRangeFromUrl = `${fromPrice}-${toPrice}`;
          } else if (fromPrice && !toPrice) {
            priceRangeFromUrl = `${fromPrice}+`;
          } else if (!fromPrice && toPrice) {
            priceRangeFromUrl = `0-${toPrice}`;
          }
        }
      }
      
      // Handle area range - convert from_area/to_area back to areaRange
      let areaRangeFromUrl = urlParams.get('area_range');
      if (!areaRangeFromUrl) {
        const fromArea = urlParams.get('from_area');
        const toArea = urlParams.get('to_area');
        if (fromArea || toArea) {
          if (fromArea && toArea) {
            areaRangeFromUrl = `${fromArea}-${toArea}`;
          } else if (fromArea && !toArea) {
            areaRangeFromUrl = `${fromArea}+`;
          } else if (!fromArea && toArea) {
            areaRangeFromUrl = `0-${toArea}`;
          }
        }
      }
      
      setFilters(prev => ({
        ...prev,
        listingType: listingTypeFromUrl || '1', // Default to '1' if not in URL (like HeaderBanner)
        city: cityFromUrl || '',
        district: districtFromUrl || '',
        propertyType: propertyTypeFromUrl || 'all',
        priceRange: priceRangeFromUrl || 'all',
        areaRange: areaRangeFromUrl || 'all',
        bedrooms: bedroomsFromUrl || 'all',
        bathrooms: bathroomsFromUrl || 'all',
        legalStatus: legalStatusFromUrl || 'all',
      }));
    }
  };

  // Auto-load from URL params on component mount
  useEffect(() => {
    loadFiltersFromUrl();
    setHasLoadedFromUrl(true);
    // Reset button text to default
    setButtonText('Lưu bộ lọc');
  }, []); // Empty dependency array - only run once on mount

  // Listen for URL changes and update filters accordingly
  useEffect(() => {
    if (typeof window !== 'undefined') { // Temporarily remove hasLoadedFromUrl check
      const handleUrlChange = () => {
        loadFiltersFromUrl(); // Use the new function
      };

      // Listen for popstate event (back/forward navigation)
      window.addEventListener('popstate', handleUrlChange);
      
      // Listen for pushstate/replacestate events (programmatic navigation)
      const originalPushState = window.history.pushState;
      const originalReplaceState = window.history.replaceState;
      
      window.history.pushState = function(...args) {
        originalPushState.apply(this, args);
        setTimeout(handleUrlChange, 0);
      };
      
      window.history.replaceState = function(...args) {
        originalReplaceState.apply(this, args);
        setTimeout(handleUrlChange, 0);
      };

      return () => {
        window.removeEventListener('popstate', handleUrlChange);
        window.history.pushState = originalPushState;
        window.history.replaceState = originalReplaceState;
      };
    }
  }, [keyword, filters]); // Removed hasLoadedFromUrl dependency

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Update URL params immediately with snake_case
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      
      // Update URL params based on the changed filter
      if (key === 'city') {
        if (value && value.trim() !== '') {
          urlParams.set('city', value);
        } else {
          urlParams.delete('city');
        }
      } else if (key === 'district') {
        if (value && value.trim() !== '') {
          urlParams.set('district', value);
        } else {
          urlParams.delete('district');
        }
      } else if (key === 'propertyType') {
        if (value !== 'all') {
          urlParams.set('property_type', value);
        } else {
          urlParams.delete('property_type');
        }
      } else if (key === 'priceRange') {
        if (value !== 'all') {
          if (value.includes('+')) {
            // Handle cases like "1000+"
            const min = value.replace('+', '');
            urlParams.set('from_price', min);
            urlParams.delete('to_price');
          } else {
            // Handle cases like "1000-2000"
            const [min, max] = value.split('-');
            if (min) urlParams.set('from_price', min);
            if (max) urlParams.set('to_price', max);
          }
        } else {
          urlParams.delete('from_price');
          urlParams.delete('to_price');
        }
      } else if (key === 'areaRange') {
        if (value !== 'all') {
          if (value.includes('+')) {
            // Handle cases like "100+"
            const min = value.replace('+', '');
            urlParams.set('from_area', min);
            urlParams.delete('to_area');
          } else {
            // Handle cases like "100-200"
            const [min, max] = value.split('-');
            if (min) urlParams.set('from_area', min);
            if (max) urlParams.set('to_area', max);
          }
        } else {
          urlParams.delete('from_area');
          urlParams.delete('to_area');
        }
      } else if (key === 'bedrooms') {
        if (value !== 'all') {
          urlParams.set('bedrooms', value);
        } else {
          urlParams.delete('bedrooms');
        }
      } else if (key === 'bathrooms') {
        if (value !== 'all') {
          urlParams.set('bathrooms', value);
        } else {
          urlParams.delete('bathrooms');
        }
      } else if (key === 'legalStatus') {
        if (value !== 'all') {
          urlParams.set('legal_status', value);
        } else {
          urlParams.delete('legal_status');
        }
      }
      
      const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
      window.history.replaceState({}, '', newUrl);
    }
    
    // Only call onSearch for non-location filters to prevent reload
    if (key !== 'city' && key !== 'district') {
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
        if (newFilters.priceRange.includes('+')) {
          // Handle cases like "1000+"
          const min = newFilters.priceRange.replace('+', '');
          apiParams.from_price = parseInt(min);
        } else {
          // Handle cases like "1000-2000"
          const [min, max] = newFilters.priceRange.split('-');
          if (min) apiParams.from_price = parseInt(min);
          if (max) apiParams.to_price = parseInt(max);
        }
      }
      
      // Area range - only include if not 'all'
      if (newFilters.areaRange !== 'all') {
        if (newFilters.areaRange.includes('+')) {
          // Handle cases like "100+"
          const min = newFilters.areaRange.replace('+', '');
          apiParams.from_area = parseInt(min);
        } else {
          // Handle cases like "100-200"
          const [min, max] = newFilters.areaRange.split('-');
          if (min) apiParams.from_area = parseInt(min);
          if (max) apiParams.to_area = parseInt(max);
        }
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
      
      // Listing type - only include if not default
      if (newFilters.listingType && newFilters.listingType !== '1') {
        apiParams.listing_type = newFilters.listingType;
      }
      
      // Add keyword if exists
      if (keyword && keyword.trim()) {
        apiParams.keyword = keyword.trim();
      }
      
      onSearch?.(apiParams);
    }
  };

  const handleSearch = () => {
    // Convert filters to API params
    const apiParams: any = {};
    
    if (filters.city && filters.city !== 'Chọn vị trí') {
      apiParams.city = filters.city;
    }
    if (filters.district) {
      apiParams.district = filters.district;
    }
    if (keyword) {
      apiParams.keyword = keyword;
      // Set keyword as tag after search
      setKeywordTagText(keyword);
      setShowKeywordAsTag(true);
    }
    if (filters.propertyType && filters.propertyType !== 'all') {
      apiParams.property_type = filters.propertyType;
    }
    if (filters.priceRange && filters.priceRange !== 'all') {
      if (filters.priceRange.includes('+')) {
        // Handle cases like "1000+"
        const min = filters.priceRange.replace('+', '');
        apiParams.from_price = parseInt(min);
      } else {
        // Handle cases like "1000-2000"
        const [min, max] = filters.priceRange.split('-');
        if (min) apiParams.from_price = parseInt(min);
        if (max) apiParams.to_price = parseInt(max);
      }
    }
    if (filters.areaRange && filters.areaRange !== 'all') {
      if (filters.areaRange.includes('+')) {
        // Handle cases like "100+"
        const min = filters.areaRange.replace('+', '');
        apiParams.from_area = parseInt(min);
      } else {
        // Handle cases like "100-200"
        const [min, max] = filters.areaRange.split('-');
        if (min) apiParams.from_area = parseInt(min);
        if (max) apiParams.to_area = parseInt(max);
      }
    }
    if (filters.bedrooms && filters.bedrooms !== 'all') {
      apiParams.bedrooms = parseInt(filters.bedrooms);
    }
    if (filters.bathrooms && filters.bathrooms !== 'all') {
      apiParams.bathrooms = parseInt(filters.bathrooms);
    }
    if (filters.legalStatus && filters.legalStatus !== 'all') {
      apiParams.legal_status = filters.legalStatus;
    }
    if (filters.listingType && filters.listingType !== '1') {
      apiParams.listing_type = filters.listingType;
    }

    // Update URL params
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams();
      
      // Convert to snake_case for URL params
      if (apiParams.city) urlParams.set('city', apiParams.city);
      if (apiParams.district) urlParams.set('district', apiParams.district);
      if (apiParams.keyword) urlParams.set('keyword', apiParams.keyword);
      if (apiParams.listing_type) urlParams.set('listing_type', apiParams.listing_type);
      if (apiParams.property_type) urlParams.set('property_type', apiParams.property_type);
      if (apiParams.from_price) urlParams.set('from_price', apiParams.from_price.toString());
      if (apiParams.to_price) urlParams.set('to_price', apiParams.to_price.toString());
      if (apiParams.from_area) urlParams.set('from_area', apiParams.from_area.toString());
      if (apiParams.to_area) urlParams.set('to_area', apiParams.to_area.toString());
      if (apiParams.bedrooms) urlParams.set('bedrooms', apiParams.bedrooms.toString());
      if (apiParams.bathrooms) urlParams.set('bathrooms', apiParams.bathrooms.toString());
      if (apiParams.legal_status) urlParams.set('legal_status', apiParams.legal_status);
      
      const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
      window.history.pushState({}, '', newUrl);
    }

    if (onSearch) {
      onSearch(apiParams);
    }
  };

  const handleListingTypeChange = (type: string) => {
    setFilters(prev => ({ ...prev, listingType: type }));
    
    // Update URL params immediately
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (type === '1') {
        // Don't set listing_type for default value (like HeaderBanner)
        urlParams.delete('listing_type');
      } else {
        urlParams.set('listing_type', type);
      }
      const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
      window.history.replaceState({}, '', newUrl);
    }
  };

  const handleBookmarkClick = async () => {
    if (isBookmarking) return; // Prevent multiple clicks
    
    // Check if user is logged in
    if (!session?.user?.id) {
      console.error('User not logged in');
      message.error('Vui lòng đăng nhập để lưu bộ lọc.');
      return;
    }
    
    try {
      setIsBookmarking(true);
      
      // Generate name and description based on current filters
      const filterNames = [];
      if (filters.listingType) filterNames.push(LISTING_TYPES.find(type => type.value === filters.listingType)?.label || '');
      if (filters.city) filterNames.push(filters.city);
      if (filters.district) filterNames.push(filters.district);
      if (filters.bedrooms !== 'all') filterNames.push(`${filters.bedrooms} phòng ngủ`);
      
      const name = filterNames.length > 0 ? filterNames.join(' - ') : 'Bộ lọc tìm kiếm';
      const description = `Lưu bộ lọc: ${name}`;
      
      // Convert filters to API format
      const request: BookmarkRequest = {
        name,
        description,
        city: filters.city || undefined,
        district: filters.district || undefined,
        keyword: keyword || undefined,
        property_type: filters.propertyType !== 'all' ? parseInt(filters.propertyType) : undefined,
        listing_type: filters.listingType !== '1' ? parseInt(filters.listingType) : undefined,
        legal_status: filters.legalStatus !== 'all' ? parseInt(filters.legalStatus) : undefined,
        num_bedrooms: filters.bedrooms !== 'all' ? parseInt(filters.bedrooms) : undefined,
      };
      
      // Add price range if specified
      if (filters.priceRange !== 'all') {
        if (filters.priceRange.includes('+')) {
          // Handle cases like "1000+"
          const min = filters.priceRange.replace('+', '');
          request.from_price = parseInt(min); // Convert to VND
        } else {
          // Handle cases like "1000-2000"
          const [min, max] = filters.priceRange.split('-');
          if (min) request.from_price = parseInt(min); // Convert to VND
          if (max) request.to_price = parseInt(max); // Convert to VND
        }
      }
      
      // Add area range if specified
      if (filters.areaRange !== 'all') {
        if (filters.areaRange.includes('+')) {
          // Handle cases like "100+"
          const min = filters.areaRange.replace('+', '');
          request.from_area = parseInt(min);
        } else {
          // Handle cases like "100-200"
          const [min, max] = filters.areaRange.split('-');
          if (min) request.from_area = parseInt(min);
          if (max) request.to_area = parseInt(max);
        }
      }

      const response = await bookmarkService.createBookmark(request);
      if (response.success) {
        // 201 Created - Successfully created
        if (response.statusCode === 201) {
          setIsBookmarked(true);
          setButtonText('Đã lưu');
          // Reset button text after 2 seconds
          setTimeout(() => {
            setButtonText('Lưu bộ lọc');
            setIsBookmarked(false);
          }, 2000);
        } else {
          // Other success cases
          setIsBookmarked(true);
          setButtonText('Đã lưu');
          setTimeout(() => {
            setButtonText('Lưu bộ lọc');
            setIsBookmarked(false);
          }, 2000);
        }
      } else {
        // Handle different error cases
        if (response.statusCode === 409) {
          // 409 Conflict - Already exists
          setButtonText('Đã tồn tại');
          // Reset button text after 2 seconds
          setTimeout(() => {
            setButtonText('Lưu bộ lọc');
          }, 2000);
        } else {
          // Other error cases
          console.error('Lưu bộ lọc thất bại:', response.message);
        }
      }
    } catch (error) {
      console.error('Error creating bookmark:', error);
    } finally {
      setIsBookmarking(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
      {/* Transaction Type Tabs */}
      <div className="flex mb-3 space-x-2 w-3/4">
        {LISTING_TYPES.map((type, index) => (
          <button
            key={type.value}
            onClick={() => handleListingTypeChange(type.value)}
            className={`flex-1 py-2 px-3 font-medium rounded-t-md transition-colors text-sm ${
              filters.listingType === type.value
                ? 'bg-[#005EBC] text-white' 
                : 'border-t-1 border-r-1 border-l-1 border-white hover:bg-[#005EBC] hover:text-white'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

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
              // Don't call onSearch here to prevent reload
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
        <Button 
          className={`md:w-auto transition-all duration-200`}
          style={{ padding: '0 15px'}}
          size="large"
          onClick={handleBookmarkClick}
          loading={isBookmarking}
          icon={isBookmarked ? <HeartFilled style={{ color: '#FF0000' }} /> : <HeartOutlined/>}
        >
          <span className="font-medium">
            { isBookmarking 
                ? 'Đang lưu...' 
                : buttonText
            }
          </span>
        </Button>

        {/* View map */}
        <Button 
          className="px-4 bg-orange-500 text-white border-none flex items-center gap-2 map-button w-full md:w-auto md:py-2 my-3 md:my-0" 
          size="large"
          style={{ padding: '0 15px'}}
        >
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
                 <PriceRangeSelect
           size="small" 
           placeholder="Mức giá" 
           className="w-full" 
           value={filters.priceRange}
           onChange={(value) => handleFilterChange('priceRange', value)}
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
             ...LEGAL_STATUS as any
           ]} 
         />
      </div>
    </div>
  );
};

export default FiltersBar;
