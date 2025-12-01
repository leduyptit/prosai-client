'use client';

import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ResultsList from '@/layouts/desktop/pages/search/ResultsList';
import { EmptyState } from '@/components/shared/empty-states';
import { Loading } from '@/components/ui/feedback';
import { propertyService } from '@/services/property';
import { Property } from '@/types/api';
import { formatArea, formatPrice, formatRelativeTime } from '@/utils/format';
import { SearchItem } from '@/layouts/desktop/pages/search/ResultItem';
import { CloseOutlined } from '@ant-design/icons';
import { Button } from '@/components/ui/buttons';
import MapWithMarkers from './MapWithMarkers';
import FiltersBar from './FiltersBar';

const MapSearchLayout: React.FC = () => {
  const router = useRouter();
  const searchParamsFromUrl = useSearchParams();
  const filtersBarRef = useRef<HTMLDivElement>(null);
  const [filtersBarHeight, setFiltersBarHeight] = useState(0);

  const [properties, setProperties] = useState<Property[]>([]);
  const [mapProperties, setMapProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [, setMapLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [, setMapError] = useState<string | null>(null);
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
    listing_type: parseInt(searchParamsFromUrl.get('listing_type') || '1'),
    legal_status: searchParamsFromUrl.get('legal_status') && searchParamsFromUrl.get('legal_status') !== 'all' ? parseInt(searchParamsFromUrl.get('legal_status')!) : undefined,
    ward: (searchParamsFromUrl.get('ward') || searchParamsFromUrl.get('district')) && (searchParamsFromUrl.get('ward') || searchParamsFromUrl.get('district'))!.trim() !== '' ? (searchParamsFromUrl.get('ward') || searchParamsFromUrl.get('district'))! : undefined,
    from_price: searchParamsFromUrl.get('from_price') ? parseInt(searchParamsFromUrl.get('from_price')!) : undefined,
    to_price: searchParamsFromUrl.get('to_price') ? parseInt(searchParamsFromUrl.get('to_price')!) : undefined,
    from_area: searchParamsFromUrl.get('from_area') ? parseInt(searchParamsFromUrl.get('from_area')!) : undefined,
    to_area: searchParamsFromUrl.get('to_area') ? parseInt(searchParamsFromUrl.get('to_area')!) : undefined,
    bedrooms: searchParamsFromUrl.get('bedrooms') ? parseInt(searchParamsFromUrl.get('bedrooms')!) : undefined,
    bathrooms: searchParamsFromUrl.get('bathrooms') ? parseInt(searchParamsFromUrl.get('bathrooms')!) : undefined,
  });

  const convertUrlParamsToFilters = () => {
    const filters: any = {};
    if (searchParams.city) filters.city = searchParams.city;
    if ((searchParams as any).ward) filters.ward = (searchParams as any).ward;
    if (searchParams.property_type) filters.propertyType = searchParams.property_type.toString();
    if (searchParams.from_price || searchParams.to_price) {
      if (searchParams.from_price && searchParams.to_price) filters.priceRange = `${searchParams.from_price}-${searchParams.to_price}`;
      else if (searchParams.from_price && !searchParams.to_price) filters.priceRange = `${searchParams.from_price}+`;
      else if (!searchParams.from_price && searchParams.to_price) filters.priceRange = `0-${searchParams.to_price}`;
    }
    if (searchParams.from_area || searchParams.to_area) {
      if (searchParams.from_area && searchParams.to_area) filters.areaRange = `${searchParams.from_area}-${searchParams.to_area}`;
      else if (searchParams.from_area && !searchParams.to_area) filters.areaRange = `${searchParams.from_area}+`;
      else if (!searchParams.from_area && searchParams.to_area) filters.areaRange = `0-${searchParams.to_area}`;
    }
    if (searchParams.bedrooms) filters.bedrooms = searchParams.bedrooms.toString();
    if (searchParams.bathrooms) filters.bathrooms = searchParams.bathrooms.toString();
    if (searchParams.legal_status) filters.legalStatus = searchParams.legal_status.toString();
    return filters;
  };

  const convertToSearchItems = (props: Property[]): SearchItem[] => {
    return props.map((property) => {
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
        isFavorite: property.is_favorite || false,
        lat: (property as any).location?.lat,
        lng: (property as any).location?.lon,
        isVip: property.is_vip || false,
      };
    });
  };

  // Memoize map items to prevent unnecessary re-renders
  const mapItems = useMemo(() => {
    return mapProperties.map(property => ({
      id: property.id,
      priceLabel: property.price_all ? formatPrice(Array.isArray(property.price_all) ? property.price_all[0] : property.price_all) : 'Liên hệ',
      url: `/property/${property.id}`,
      isVip: property.is_vip || false,
      title: property.title,
      imageUrl: property.images?.[0] || '/images/imgdemo_new@2x.png',
      areaBadge: property.area ? formatArea(Array.isArray(property.area) ? property.area[0] : property.area) : 'Liên hệ',
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      lat: (property as any).location?.lat,
      lng: (property as any).location?.lon,
    }));
  }, [mapProperties]);

  const fetchProperties = async (params = searchParams) => {
    try {
      setLoading(true);
      setError(null);
      const response = await propertyService.searchPropertyProSai({ ...params, tpl: 'map' } as any);
      setProperties(response.data || []);
      setTotalCount(response.total || 0);
      setPagination({
        current: response.page || 1,
        total: response.total || 0,
        pageCount: response.pageCount || 0,
        count: response.count || 0,
      });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Có lỗi xảy ra khi tải dữ liệu');
      setProperties([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  const fetchMapProperties = async (params = searchParams) => {
    try {
      setMapLoading(true);
      setMapError(null);
      
      // Gọi API map riêng với limit=100 (qua propertyService để đồng nhất)
      const response = await propertyService.searchPropertyMap({
        ...params,
        page: 1,
        limit: 100,
        tpl: 'map'
      });

      
      setMapProperties(response.data || []);
    } catch (err: any) {
      console.error('Map API error:', err);
      setMapError(err.response?.data?.message || 'Có lỗi xảy ra khi tải dữ liệu bản đồ');
      setMapProperties([]);
    } finally {
      setMapLoading(false);
    }
  };

  const updateUrlParams = (params: any) => {
    const url = new URL(window.location.href);
    url.search = '';
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '' && value !== 'all') {
        if (key === 'listing_type' && Number(value) === 1) return;
        url.searchParams.set(key, String(value));
      }
    });
    router.push(url.pathname + url.search, { scroll: false });
  };

  const handleSearch = (newParams: any) => {
    const updatedParams: any = { ...searchParams, page: 1 };
    Object.keys(newParams).forEach((key) => {
      if (newParams[key] === undefined || newParams[key] === null || newParams[key] === '') delete updatedParams[key];
      else updatedParams[key] = newParams[key];
    });
    setSearchParams(updatedParams);
    updateUrlParams(updatedParams);
    fetchProperties(updatedParams);
    fetchMapProperties(updatedParams);
  };

  const handlePageChange = (page: number) => {
    const updatedParams = { ...searchParams, page };
    setSearchParams(updatedParams);
    updateUrlParams(updatedParams);
    fetchProperties(updatedParams);
    // Không cần gọi lại fetchMapProperties vì map chỉ cần load 1 lần
  };

  useEffect(() => {
    fetchProperties();
    fetchMapProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Đo chiều cao FiltersBar
  useEffect(() => {
    const updateFiltersBarHeight = () => {
      if (filtersBarRef.current) {
        setFiltersBarHeight(filtersBarRef.current.offsetHeight);
      }
    };

    updateFiltersBarHeight();
    window.addEventListener('resize', updateFiltersBarHeight);
    
    return () => {
      window.removeEventListener('resize', updateFiltersBarHeight);
    };
  }, []);

  // Ensure tpl=map is present in URL by default on map-search page
  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get('tpl') !== 'map') {
      url.searchParams.set('tpl', 'map');
      router.replace(url.pathname + '?' + url.searchParams.toString(), { scroll: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const newSearchParams = {
      page: parseInt(searchParamsFromUrl.get('page') || '1'),
      limit: parseInt(searchParamsFromUrl.get('limit') || '20'),
      city: searchParamsFromUrl.get('city') && searchParamsFromUrl.get('city') !== 'all' ? searchParamsFromUrl.get('city')! : undefined,
      property_type: searchParamsFromUrl.get('property_type') && searchParamsFromUrl.get('property_type') !== 'all' ? parseInt(searchParamsFromUrl.get('property_type')!) : undefined,
      listing_type: parseInt(searchParamsFromUrl.get('listing_type') || '1'),
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
    const action = searchParamsFromUrl.get('action');
    if (action === 'reload') {
      fetchProperties(newSearchParams);
      fetchMapProperties(newSearchParams); // Reload map when URL changes
      const url = new URL(window.location.href);
      url.searchParams.delete('action');
      window.history.replaceState({}, '', url.toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParamsFromUrl]);

  return (
    <div className="full-width">
      <div className="grid grid-cols-12 gap-0" style={{ minHeight: 'calc(100vh - 64px)' }}>
        {/* Left panel with filters and results */}
        <div className="col-span-12 lg:col-span-5 xl:col-span-5 border-r border-gray-200">
          <div ref={filtersBarRef} className="px-4 lg:px-6 py-4 sticky top-0 bg-white z-10">
            <FiltersBar onSearch={handleSearch} initialFilters={convertUrlParamsToFilters()} />
          </div>
          <div className="px-4 lg:px-6 pb-6 overflow-auto" style={{ maxHeight: `calc(100vh - ${filtersBarHeight + 64}px)` }}>
            <div className="flex items-end justify-between mb-4">
              <h2 className="text-2xl font-medium text-gray-900">Kết quả tìm kiếm</h2>
              <div className="text-sm text-gray-600">{totalCount} tin</div>
            </div>
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <Loading size="large" text="Loading..." variant="fullscreen" className="bg-white" />
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-500">{error}</div>
            ) : properties.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <EmptyState type="search" />
              </div>
            ) : (
              <ResultsList items={convertToSearchItems(properties)} pagination={pagination} onPageChange={handlePageChange} />
            )}
          </div>
        </div>

        {/* Right map */}
        <div className="col-span-12 lg:col-span-7 xl:col-span-7 relative">
          <div className="sticky top-0" style={{ height: 'calc(100vh - 64px)' }}>
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10">
              {/* <Button 
                size="large"
                className="flex items-center gap-2 bg-white/90 hover:bg-white text-[#1D1D44] shadow rounded-md border border-gray-200 text-sm">
                
                <span><EnvironmentOutlined /></span>
                <span>Tìm tin đăng trên toàn bản đồ</span>
              </Button> */}
            </div>
            <div className="absolute top-3 right-3 z-10 flex gap-2">
              <Button 
                size="large"
                type="primary"
                className="bg-[#2EB553] hover:brightness-95 text-white rounded-md px-3 py-2 text-sm"
                onClick={() => {
                  // Lấy tất cả tham số từ URL hiện tại
                  const currentUrl = new URL(window.location.href);
                  const searchParams = new URLSearchParams(currentUrl.search);
                  
                  // Loại bỏ tpl=map
                  searchParams.delete('tpl');
                  
                  // Tạo URL mới cho search
                  const searchUrl = `/search?${searchParams.toString()}`;
                  
                  // Chuyển đến trang search
                  window.location.href = searchUrl;
                }}
              >
                <CloseOutlined /> Đóng bản đồ
              </Button>
            </div>
            <MapWithMarkers 
              key={`${searchParams.city}-${searchParams.property_type}-${searchParams.from_price}-${searchParams.to_price}-${searchParams.from_area}-${searchParams.to_area}-${searchParams.bedrooms}-${searchParams.bathrooms}-${searchParams.legal_status}-${searchParams.ward}`}
              city={searchParams.city || 'Vietnam'} 
              items={mapItems}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapSearchLayout;