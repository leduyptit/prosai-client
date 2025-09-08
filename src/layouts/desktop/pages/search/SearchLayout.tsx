'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import FiltersBar from './FiltersBar';
import ResultsList from './ResultsList';
import Sidebar from './Sidebar';
import { propertyService } from '@/services/property';
import { Property } from '@/types/api';
import { Loading } from '@/components/ui/feedback';
import { SearchItem } from './ResultItem';
import { EmptyState } from '@/components/shared/empty-states';
import { formatPrice, formatArea, formatRelativeTime } from '@/utils/format';

const SearchLayout: React.FC = () => {
  const router = useRouter();
  const searchParamsFromUrl = useSearchParams();
  
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [pagination, setPagination] = useState({
    current: 1,
    total: 0,
    pageCount: 0,
    count: 0
  });
  const [searchParams, setSearchParams] = useState({
    page: parseInt(searchParamsFromUrl.get('page') || '1'),
    limit: parseInt(searchParamsFromUrl.get('limit') || '20'),
    city: searchParamsFromUrl.get('city') && searchParamsFromUrl.get('city') !== 'all' ? searchParamsFromUrl.get('city')! : undefined,
    property_type: searchParamsFromUrl.get('property_type') && searchParamsFromUrl.get('property_type') !== 'all' ? parseInt(searchParamsFromUrl.get('property_type')!) : undefined,
    listing_type: searchParamsFromUrl.get('listing_type') && searchParamsFromUrl.get('listing_type') !== 'all' ? parseInt(searchParamsFromUrl.get('listing_type')!) : undefined,
    legal_status: searchParamsFromUrl.get('legal_status') && searchParamsFromUrl.get('legal_status') !== 'all' ? parseInt(searchParamsFromUrl.get('legal_status')!) : undefined,
    ward: (searchParamsFromUrl.get('ward') || searchParamsFromUrl.get('district')) && (searchParamsFromUrl.get('ward') || searchParamsFromUrl.get('district'))!.trim() !== '' ? (searchParamsFromUrl.get('ward') || searchParamsFromUrl.get('district'))! : undefined,
    from_price: searchParamsFromUrl.get('from_price') ? parseInt(searchParamsFromUrl.get('from_price')!) : undefined,
    to_price: searchParamsFromUrl.get('to_price') ? parseInt(searchParamsFromUrl.get('to_price')!) : undefined,
    from_area: searchParamsFromUrl.get('from_area') ? parseInt(searchParamsFromUrl.get('from_area')!) : undefined,
    to_area: searchParamsFromUrl.get('to_area') ? parseInt(searchParamsFromUrl.get('to_area')!) : undefined,
    bedrooms: searchParamsFromUrl.get('bedrooms') ? parseInt(searchParamsFromUrl.get('bedrooms')!) : undefined,
    bathrooms: searchParamsFromUrl.get('bathrooms') ? parseInt(searchParamsFromUrl.get('bathrooms')!) : undefined,
  });

  // Convert URL params to filter values
  const convertUrlParamsToFilters = () => {
    const filters: any = {};
    
    // City - only include if not undefined (which means it's not 'all')
    if (searchParams.city) {
      filters.city = searchParams.city;
    }
    
    // Ward - only include if not undefined (which means it's not empty)
    if ((searchParams as any).ward) {
      filters.ward = (searchParams as any).ward;
    }
    
    // Property type - only if not 'all'
    if (searchParams.property_type) {
      filters.propertyType = searchParams.property_type.toString();
    }
    
    // Price range - convert from_price and to_price to priceRange format, only if values exist
    if (searchParams.from_price || searchParams.to_price) {
      if (searchParams.from_price && searchParams.to_price) {
        filters.priceRange = `${searchParams.from_price}-${searchParams.to_price}`;
      } else if (searchParams.from_price && !searchParams.to_price) {
        filters.priceRange = `${searchParams.from_price}+`;
      } else if (!searchParams.from_price && searchParams.to_price) {
        filters.priceRange = `0-${searchParams.to_price}`;
      }
    }
    
    // Area range - convert from_area and to_area to areaRange format, only if values exist
    if (searchParams.from_area || searchParams.to_area) {
      if (searchParams.from_area && searchParams.to_area) {
        filters.areaRange = `${searchParams.from_area}-${searchParams.to_area}`;
      } else if (searchParams.from_area && !searchParams.to_area) {
        filters.areaRange = `${searchParams.from_area}+`;
      } else if (!searchParams.from_area && searchParams.to_area) {
        filters.areaRange = `0-${searchParams.to_area}`;
      }
    }
    
    // Bedrooms - only if not 'all'
    if (searchParams.bedrooms) {
      filters.bedrooms = searchParams.bedrooms.toString();
    }
    
    // Bathrooms - only if not 'all'
    if (searchParams.bathrooms) {
      filters.bathrooms = searchParams.bathrooms.toString();
    }
    
    // Legal status - only if not 'all'
    if (searchParams.legal_status) {
      filters.legalStatus = searchParams.legal_status.toString();
    }
    
    return filters;
  };

  // Convert Property to SearchItem
  const convertToSearchItems = (properties: Property[]): SearchItem[] => {
    const items = properties.map(property => {
      // Handle price_all and price which can be arrays
      const priceAll = Array.isArray(property.price_all) ? property.price_all[0] : property.price_all;
      const price = Array.isArray(property.price) ? property.price[0] : property.price;
      const area = Array.isArray(property.area) ? property.area[0] : property.area;
      
      return {
        id: property.id,
        title: property.title,
        priceLabel: priceAll ? formatPrice(priceAll) : 'Liên hệ',
        areaBadge: area ? formatArea(area) : 'Liên hệ',
        pricePerM2: price ? `${formatPrice(price).replace('triệu', '')} tr/m²` : 'Liên hệ',
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        address: property.address || 'Địa chỉ đang cập nhật',
        imageUrl: property.images?.[0] || '/images/imgdemo_new@2x.png',
        imagesCount: property.images?.length || 0,
        postedBy: property.user_name_social ? property.user_name_social : 'Người đăng',
        postedAt: property.created_at ? formatRelativeTime(property.created_at) : '',
        rating: property.ranking_score ? property.ranking_score : 0,
        phone: property.phone_user ? property.phone_user : property.phone_message?.[0] || '',
        isFavorite: false
      };
    });
    return items;
  };

  const fetchProperties = async (params = searchParams) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching properties with params:', params);
      const response = await propertyService.searchPropertyProSai(params);
      console.log('API Response:', response);
      console.log('Properties count:', response.data?.length);
      
      setProperties(response.data || []);
      setTotalCount(response.total || 0);
      setPagination({
        current: response.page || 1,
        total: response.total || 0,
        pageCount: response.pageCount || 0,
        count: response.count || 0
      });
    } catch (err: any) {
      console.error('Error fetching properties:', err);
      setError(err.response?.data?.message || 'Có lỗi xảy ra khi tải dữ liệu');
      setProperties([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  // Update URL with search params
  const updateUrlParams = (params: any) => {
    const url = new URL(window.location.href);
    
    // Clear existing params
    url.search = '';
    
    // Add new params - exclude 'all' values and empty values
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '' && value !== 'all') {
        url.searchParams.set(key, String(value));
      }
    });
    
    // Update URL without reloading page
    router.push(url.pathname + url.search, { scroll: false });
  };

  const handleSearch = (newParams: any) => {
    // Start with current search params but reset page to 1
    const updatedParams: any = { ...searchParams, page: 1 };
    
    // Apply new params - only update the specific params provided
    Object.keys(newParams).forEach(key => {
      if (newParams[key] === undefined || newParams[key] === null || newParams[key] === '') {
        // Remove the param if it's explicitly set to undefined/null/empty
        delete updatedParams[key];
      } else {
        // Update the param with new value
        updatedParams[key] = newParams[key];
      }
    });
    
    setSearchParams(updatedParams);
    updateUrlParams(updatedParams);
    fetchProperties(updatedParams);
  };

  const handlePageChange = (page: number) => {
    const updatedParams = { ...searchParams, page };
    setSearchParams(updatedParams);
    updateUrlParams(updatedParams);
    fetchProperties(updatedParams);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // Update filters when URL params change
  useEffect(() => {
    const newSearchParams = {
      page: parseInt(searchParamsFromUrl.get('page') || '1'),
      limit: parseInt(searchParamsFromUrl.get('limit') || '20'),
      city: searchParamsFromUrl.get('city') && searchParamsFromUrl.get('city') !== 'all' ? searchParamsFromUrl.get('city')! : undefined,
      property_type: searchParamsFromUrl.get('property_type') && searchParamsFromUrl.get('property_type') !== 'all' ? parseInt(searchParamsFromUrl.get('property_type')!) : undefined,
      listing_type: searchParamsFromUrl.get('listing_type') && searchParamsFromUrl.get('listing_type') !== 'all' ? parseInt(searchParamsFromUrl.get('listing_type')!) : undefined,
      legal_status: searchParamsFromUrl.get('legal_status') && searchParamsFromUrl.get('legal_status') !== 'all' ? parseInt(searchParamsFromUrl.get('legal_status')!) : undefined,
      ward: (searchParamsFromUrl.get('ward') || searchParamsFromUrl.get('district')) && (searchParamsFromUrl.get('ward') || searchParamsFromUrl.get('district'))!.trim() !== '' ? (searchParamsFromUrl.get('ward') || searchParamsFromUrl.get('district'))! : undefined,
      from_price: searchParamsFromUrl.get('from_price') ? parseInt(searchParamsFromUrl.get('from_price')!) : undefined,
      to_price: searchParamsFromUrl.get('to_price') ? parseInt(searchParamsFromUrl.get('to_price')!) : undefined,
      from_area: searchParamsFromUrl.get('from_area') ? parseInt(searchParamsFromUrl.get('from_area')!) : undefined,
      to_area: searchParamsFromUrl.get('to_area') ? parseInt(searchParamsFromUrl.get('to_area')!) : undefined,
      bedrooms: searchParamsFromUrl.get('bedrooms') ? parseInt(searchParamsFromUrl.get('bedrooms')!) : undefined,
      bathrooms: searchParamsFromUrl.get('bathrooms') ? parseInt(searchParamsFromUrl.get('bathrooms')!) : undefined,
    };
    setSearchParams(newSearchParams);
  }, [searchParamsFromUrl]);

  // Debug logs for render
  console.log('Render state - loading:', loading, 'properties length:', properties.length, 'totalCount:', totalCount);

  return (
    <div className="search-layout pb-10">
      <div className="full-width bg-[#FAFAFA] py-8 mb-5">
        <div className="responsive-container">
          {/* Filters section (top) */}
          <FiltersBar onSearch={handleSearch} initialFilters={convertUrlParamsToFilters()} />
        </div>
      </div>
      <div className="responsive-container mx-auto">
        {/* Top heading row */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-9">
            <div className="flex items-end justify-between mb-4">
              <h2 className="text-2xl font-medium text-gray-900">Kết quả tìm kiếm</h2>
              <div className="text-sm text-gray-600">
                Hiện có {totalCount} Bất động sản.
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-9">
            {loading ? (
              <div className="flex justify-center items-center py-8">
              <Loading 
                size="large" 
                text="Loading..." 
                variant="fullscreen"
                className="bg-white"
              />
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-500">
                {error}
              </div>
            ) : (
              properties.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <EmptyState type="search" />
                </div>
              ) : (
                <ResultsList 
                  items={convertToSearchItems(properties)}
                  pagination={pagination}
                  onPageChange={handlePageChange}
                />
              )
            )}
          </div>
          <div className="col-span-12 lg:col-span-3">
            <Sidebar 
              priceRange={searchParams.from_price && searchParams.to_price 
                ? `${searchParams.from_price}-${searchParams.to_price}` 
                : searchParams.from_price 
                  ? `${searchParams.from_price}+` 
                  : 'all'
              }
              areaRange={searchParams.from_area && searchParams.to_area 
                ? `${searchParams.from_area}-${searchParams.to_area}` 
                : searchParams.from_area 
                  ? `${searchParams.from_area}+` 
                  : 'all'
              }
              onPriceChange={(value) => {
                if (value === 'all') {
                  handleSearch({ from_price: undefined, to_price: undefined });
                } else if (value.includes('+')) {
                  const from = value.replace('+', '');
                  handleSearch({ from_price: parseInt(from), to_price: undefined });
                } else if (value.includes('-')) {
                  const [from, to] = value.split('-');
                  handleSearch({ from_price: parseInt(from), to_price: parseInt(to) });
                }
              }}
              onAreaChange={(value) => {
                if (value === 'all') {
                  handleSearch({ from_area: undefined, to_area: undefined });
                } else if (value.includes('+')) {
                  const from = value.replace('+', '');
                  handleSearch({ from_area: parseInt(from), to_area: undefined });
                } else if (value.includes('-')) {
                  const [from, to] = value.split('-');
                  handleSearch({ from_area: parseInt(from), to_area: parseInt(to) });
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchLayout;
