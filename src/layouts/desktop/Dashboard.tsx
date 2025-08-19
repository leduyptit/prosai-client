'use client';

import React, { useState, useEffect } from 'react';
import { Input, Button } from 'antd';
import Select from '@/components/ui/forms/Select';
import { useRouter } from 'next/navigation';
import { 
  CITIES, 
  PROPERTY_TYPES, 
  PRICE_RANGES, 
  AREA_RANGES, 
  LISTING_TYPES
} from '@/constants';
import { fetchStatistics, StatisticsResponse } from '@/services/statistics';
import { fetchNewsCategories, fetchNewsByCategory, NewsCategory, NewsArticle } from '@/services/news';
import { formatRelativeTime } from '@/utils/format';
import Image from 'next/image';
import Link from 'next/link';
import { EmptyState } from '@/components/shared/empty-states';



interface PropertyItem {
  id: string;
  title: string;
  price: string;
  area: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  image: string;
  type: 'sale' | 'rent';
  postedDate: string;
  status: 'opening' | 'delivered';
  imageCount: number;
}

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
  
    // News state
  const [newsCategories, setNewsCategories] = useState<NewsCategory[]>([]);
  const [newsData, setNewsData] = useState<NewsArticle[][]>([]);
  const [newsCategoriesLoading, setNewsCategoriesLoading] = useState(true);

    // Property Ranking data
    const rankingTabs = [
      'Top BĐS được quan tâm',
      'BĐS đánh giá cao nhất', 
      'Gợi ý AI xếp hạng'
    ];

    const rankingData: PropertyItem[][] = [
      // Top BĐS được quan tâm
      Array.from({ length: 8 }, (_, index) => ({
        id: `ranking1_${index + 1}`,
        title: 'Chung cư mini Bạch Mai - 52m2 11P',
        price: '10,5 tỷ',
        area: '62 m²',
        location: 'Hai Bà Trưng, Hà Nội',
        bedrooms: 2,
        bathrooms: 1,
        image: '/images/imgdemo_new@2x.png',
        type: 'rent',
        postedDate: 'Đăng 2 ngày trước',
        status: 'opening',
        imageCount: 5
      })),
      // BĐS đánh giá cao nhất
      Array.from({ length: 8 }, (_, index) => ({
        id: `ranking2_${index + 1}`,
        title: 'Căn hộ cao cấp Vinhomes - 85m2 2PN',
        price: '15,2 tỷ',
        area: '85 m²',
        location: 'Ba Đình, Hà Nội',
        bedrooms: 2,
        bathrooms: 2,
        image: '/images/imgdemo_new@2x.png',
        type: 'sale',
        postedDate: 'Đăng 1 ngày trước',
        status: 'opening',
        imageCount: 5
      })),
      // Gợi ý AI xếp hạng
      Array.from({ length: 8 }, (_, index) => ({
        id: `ranking3_${index + 1}`,
        title: 'Biệt thự liền kề Golden - 120m2 3PN',
        price: '25,8 tỷ',
        area: '120 m²',
        location: 'Cầu Giấy, Hà Nội',
        bedrooms: 3,
        bathrooms: 2,
        image: '/images/imgdemo_new@2x.png',
        type: 'sale',
        postedDate: 'Đăng 3 ngày trước',
        status: 'delivered',
        imageCount: 5
      }))
    ];

    // Property data for slider - Sale
    const propertySliderSaleData: PropertyItem[] = [
      {
        id: 'sale1',
        title: 'Nhà phố thương mại Golden...',
        price: '100tr/m²',
        area: '133,44 ha',
        location: 'Hai Bà Trưng, Hà Nội',
        bedrooms: 2,
        bathrooms: 2,
        image: '/images/imgdemo_new@2x.png',
        type: 'sale',
        postedDate: 'Đăng 2 ngày trước',
        status: 'opening',
        imageCount: 5
      },
      {
        id: 'sale2',
        title: 'Căn hộ cao cấp Vinhomes...',
        price: '85tr/m²',
        area: '95,5 ha',
        location: 'Ba Đình, Hà Nội',
        bedrooms: 3,
        bathrooms: 2,
        image: '/images/imgdemo_new@2x.png',
        type: 'sale',
        postedDate: 'Đăng 1 ngày trước',
        status: 'opening',
        imageCount: 5
      },
      {
        id: 'sale3',
        title: 'Biệt thự liền kề Golden...',
        price: '120tr/m²',
        area: '200 ha',
        location: 'Cầu Giấy, Hà Nội',
        bedrooms: 4,
        bathrooms: 3,
        image: '/images/imgdemo_new@2x.png',
        type: 'sale',
        postedDate: 'Đăng 3 ngày trước',
        status: 'delivered',
        imageCount: 5
      },
      {
        id: 'sale4',
        title: 'Căn hộ chung cư Times...',
        price: '75tr/m²',
        area: '85 ha',
        location: 'Đống Đa, Hà Nội',
        bedrooms: 2,
        bathrooms: 2,
        image: '/images/imgdemo_new@2x.png',
        type: 'sale',
        postedDate: 'Đăng 5 ngày trước',
        status: 'delivered',
        imageCount: 5
      },
      {
        id: 'sale5',
        title: 'Nhà phố mặt tiền Golden...',
        price: '150tr/m²',
        area: '180 ha',
        location: 'Hoàn Kiếm, Hà Nội',
        bedrooms: 5,
        bathrooms: 4,
        image: '/images/imgdemo_new@2x.png',
        type: 'sale',
        postedDate: 'Đăng 1 tuần trước',
        status: 'opening',
        imageCount: 5
      },
      {
        id: 'sale6',
        title: 'Căn hộ penthouse Luxury...',
        price: '200tr/m²',
        area: '250 ha',
        location: 'Tây Hồ, Hà Nội',
        bedrooms: 4,
        bathrooms: 3,
        image: '/images/imgdemo_new@2x.png',
        type: 'sale',
        postedDate: 'Đăng 3 ngày trước',
        status: 'opening',
        imageCount: 5
      },
      {
        id: 'sale7',
        title: 'Shophouse mặt tiền Times...',
        price: '180tr/m²',
        area: '160 ha',
        location: 'Long Biên, Hà Nội',
        bedrooms: 3,
        bathrooms: 2,
        image: '/images/imgdemo_new@2x.png',
        type: 'sale',
        postedDate: 'Đăng 4 ngày trước',
        status: 'delivered',
        imageCount: 5
      },
      {
        id: 'sale8',
        title: 'Căn hộ studio hiện đại...',
        price: '65tr/m²',
        area: '45 ha',
        location: 'Thanh Xuân, Hà Nội',
        bedrooms: 1,
        bathrooms: 1,
        image: '/images/imgdemo_new@2x.png',
        type: 'sale',
        postedDate: 'Đăng 6 giờ trước',
        status: 'opening',
        imageCount: 5
      },
      {
        id: 'sale9',
        title: 'Biệt thự vườn cao cấp...',
        price: '300tr/m²',
        area: '400 ha',
        location: 'Sóc Sơn, Hà Nội',
        bedrooms: 6,
        bathrooms: 5,
        image: '/images/imgdemo_new@2x.png',
        type: 'sale',
        postedDate: 'Đăng 2 tuần trước',
        status: 'opening',
        imageCount: 5
      },
      {
        id: 'sale10',
        title: 'Căn hộ 2 phòng ngủ Vinhomes...',
        price: '95tr/m²',
        area: '75 ha',
        location: 'Nam Từ Liêm, Hà Nội',
        bedrooms: 2,
        bathrooms: 2,
        image: '/images/imgdemo_new@2x.png',
        type: 'sale',
        postedDate: 'Đăng 1 ngày trước',
        status: 'delivered',
        imageCount: 5
      },
      {
        id: 'sale11',
        title: 'Nhà phố 4 tầng mặt tiền...',
        price: '220tr/m²',
        area: '180 ha',
        location: 'Hà Đông, Hà Nội',
        bedrooms: 4,
        bathrooms: 3,
        image: '/images/imgdemo_new@2x.png',
        type: 'sale',
        postedDate: 'Đăng 5 ngày trước',
        status: 'opening',
        imageCount: 5
      },
      {
        id: 'sale12',
        title: 'Căn hộ 3 phòng ngủ Times...',
        price: '110tr/m²',
        area: '95 ha',
        location: 'Cầu Giấy, Hà Nội',
        bedrooms: 3,
        bathrooms: 2,
        image: '/images/imgdemo_new@2x.png',
        type: 'sale',
        postedDate: 'Đăng 8 giờ trước',
        status: 'delivered',
        imageCount: 5
      }
    ];

    // Property data for slider - Rent
    const propertySliderRentData: PropertyItem[] = [
      {
        id: 'rent1',
        title: 'Căn hộ cho thuê Golden...',
        price: '15tr/tháng',
        area: '45m²',
        location: 'Hai Bà Trưng, Hà Nội',
        bedrooms: 1,
        bathrooms: 1,
        image: '/images/imgdemo_new@2x.png',
        type: 'rent',
        postedDate: 'Đăng 1 ngày trước',
        status: 'opening',
        imageCount: 5
      },
      {
        id: 'rent2',
        title: 'Căn hộ 2 phòng ngủ Vinhomes...',
        price: '25tr/tháng',
        area: '65m²',
        location: 'Ba Đình, Hà Nội',
        bedrooms: 2,
        bathrooms: 2,
        image: '/images/imgdemo_new@2x.png',
        type: 'rent',
        postedDate: 'Đăng 5 giờ trước',
        status: 'opening',
        imageCount: 5
      },
      {
        id: 'rent3',
        title: 'Căn hộ 1 phòng hiện đại...',
        price: '12tr/tháng',
        area: '40m²',
        location: 'Cầu Giấy, Hà Nội',
        bedrooms: 1,
        bathrooms: 1,
        image: '/images/imgdemo_new@2x.png',
        type: 'rent',
        postedDate: 'Đăng 15 phút trước',
        status: 'delivered',
        imageCount: 5
      },
      {
        id: 'rent4',
        title: 'Căn hộ 2 phòng full đồ...',
        price: '18tr/tháng',
        area: '60m²',
        location: 'Đống Đa, Hà Nội',
        bedrooms: 2,
        bathrooms: 2,
        image: '/images/imgdemo_new@2x.png',
        type: 'rent',
        postedDate: 'Đăng 45 phút trước',
        status: 'delivered',
        imageCount: 5
      },
      {
        id: 'rent5',
        title: 'Nhà riêng 3 phòng ngủ...',
        price: '35tr/tháng',
        area: '120m²',
        location: 'Hoàn Kiếm, Hà Nội',
        bedrooms: 3,
        bathrooms: 2,
        image: '/images/imgdemo_new@2x.png',
        type: 'rent',
        postedDate: 'Đăng 1 giờ trước',
        status: 'opening',
        imageCount: 5
      },
      {
        id: 'rent6',
        title: 'Căn hộ studio cho thuê...',
        price: '8tr/tháng',
        area: '30m²',
        location: 'Thanh Xuân, Hà Nội',
        bedrooms: 1,
        bathrooms: 1,
        image: '/images/imgdemo_new@2x.png',
        type: 'rent',
        postedDate: 'Đăng 2 giờ trước',
        status: 'opening',
        imageCount: 5
      },
      {
        id: 'rent7',
        title: 'Căn hộ 3 phòng ngủ cao cấp...',
        price: '45tr/tháng',
        area: '90m²',
        location: 'Tây Hồ, Hà Nội',
        bedrooms: 3,
        bathrooms: 2,
        image: '/images/imgdemo_new@2x.png',
        type: 'rent',
        postedDate: 'Đăng 3 ngày trước',
        status: 'delivered',
        imageCount: 5
      },
      {
        id: 'rent8',
        title: 'Căn hộ 1 phòng ngủ Times...',
        price: '10tr/tháng',
        area: '35m²',
        location: 'Long Biên, Hà Nội',
        bedrooms: 1,
        bathrooms: 1,
        image: '/images/imgdemo_new@2x.png',
        type: 'rent',
        postedDate: 'Đăng 4 giờ trước',
        status: 'opening',
        imageCount: 5
      },
      {
        id: 'rent9',
        title: 'Nhà riêng 4 phòng ngủ...',
        price: '55tr/tháng',
        area: '150m²',
        location: 'Nam Từ Liêm, Hà Nội',
        bedrooms: 4,
        bathrooms: 3,
        image: '/images/imgdemo_new@2x.png',
        type: 'rent',
        postedDate: 'Đăng 1 tuần trước',
        status: 'opening',
        imageCount: 5
      },
      {
        id: 'rent10',
        title: 'Căn hộ 2 phòng ngủ Vinhomes...',
        price: '22tr/tháng',
        area: '70m²',
        location: 'Hà Đông, Hà Nội',
        bedrooms: 2,
        bathrooms: 2,
        image: '/images/imgdemo_new@2x.png',
        type: 'rent',
        postedDate: 'Đăng 6 giờ trước',
        status: 'delivered',
        imageCount: 5
      },
      {
        id: 'rent11',
        title: 'Căn hộ 1 phòng ngủ hiện đại...',
        price: '9tr/tháng',
        area: '38m²',
        location: 'Cầu Giấy, Hà Nội',
        bedrooms: 1,
        bathrooms: 1,
        image: '/images/imgdemo_new@2x.png',
        type: 'rent',
        postedDate: 'Đăng 30 phút trước',
        status: 'opening',
        imageCount: 5
      },
      {
        id: 'rent12',
        title: 'Căn hộ 3 phòng ngủ full đồ...',
        price: '40tr/tháng',
        area: '85m²',
        location: 'Đống Đa, Hà Nội',
        bedrooms: 3,
        bathrooms: 2,
        image: '/images/imgdemo_new@2x.png',
        type: 'rent',
        postedDate: 'Đăng 2 ngày trước',
        status: 'delivered',
        imageCount: 5
      }
    ];

   
  
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
    const searchUrl = `/demos/search-demo${params.toString() ? `?${params.toString()}` : ''}`;
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
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 600));
    setActivePropertySliderTab(type);
    setPropertySliderIndex(0); // Reset slider index when changing tabs
    setPropertySliderLoading(false);
  };

  const handleRankingTabChange = async (index: number) => {
    setRankingLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    setActiveRankingTab(index);
    setRankingLoading(false);
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



  return (
    <div className="dashboard-container">
      {/* Header Banner */}
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
                  <div className="flex gap-3 mb-4 bg-white border border-[#C3C3C3] rounded-lg pr-1 pl-4">
                    <div className="flex items-center">
                      <img src="/svgs/address.svg" alt="location" className="w-4 h-4 mr-2" />
                      <Select
                        placeholder="Chọn vi trí"
                        value={searchForm.city}
                        variant="borderless"
                        onChange={(value) => handleInputChange('city', value)}
                        className="border-none bg-white w-30"
                        options={CITIES as any}
                      />
                    </div>
                    
                    <div className="flex-1 flex items-center">
                      <img src="/svgs/icon_search.svg" className="w-5 h-5 mr-2" alt="search" />
                      <Input
                        placeholder="Nhập địa điểm, dự án, quận, huyện..."
                        value={searchForm.keyword}
                        onChange={(e) => handleInputChange('keyword', e.target.value)}
                        className="flex-1 rounded-r-none border-none bg-white focus:box-shadow-none"
                        size="small"
                        style={{
                          border: 'none'
                        }}
                      />
                      <Button
                        type="primary"
                        size="small"
                        onClick={handleSearch}
                        className="rounded-l-none border-none text-white font-medium"
                      >
                        Tìm kiếm
                      </Button>
                    </div>
                  </div>

                  {/* Filter Options */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <Select
                      placeholder="Loại hình"
                      value={searchForm.propertyType}
                      size="small"
                      onChange={(value) => handleInputChange('propertyType', value)}
                      className="w-full placeholder:text-[#8D8DA1] bg-white border-[#C3C3C3] rounded-lg"
                      options={PROPERTY_TYPES as any}
                    />
                    <Select
                      placeholder="Mức giá"
                      value={searchForm.priceRange}
                      size="small"
                      onChange={(value) => handleInputChange('priceRange', value)}
                      className="w-full placeholder:text-[#8D8DA1] bg-white border-[#C3C3C3] rounded-lg"
                      options={PRICE_RANGES as any}
                    />
                    <Select
                      placeholder="Diện tích"
                      value={searchForm.area}
                      size="small"
                      onChange={(value) => handleInputChange('area', value)}
                      className="w-full placeholder:text-[#8D8DA1] bg-white border-[#C3C3C3] rounded-lg"
                      options={AREA_RANGES as any}
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
                    Đăng tin bán
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
                      <img src="/svgs/Group 11556.svg" className="w-2 h-2"/>
                      <span>Nhà bán với giá trị thực tế: <span className="font-bold text-[#FFAA22]">{loading ? '...' : statistics?.data.market.real_value.toLocaleString() || '19,000'}</span></span>
                    </div>
                    <div className="flex items-center justify-start gap-2">
                      <img src="/svgs/Group 11556.svg" className="w-2 h-2"/>
                      <span>Khoảng cách giao với giá thực tế: <span className="font-bold text-[#FFAA22]">{loading ? '...' : statistics?.data.market.transaction_gap.toLocaleString() || '5,000'}</span></span>
                    </div>
                    <div className="flex items-center justify-start gap-2">
                      <img src="/svgs/Group 11556.svg" className="w-2 h-2"/>
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

      {/* Property Ranking */}
      <div className="full-width bg-white py-16">
        <div className="responsive-container">
          {/* Section Header with Title and Tabs */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-medium text-[#1D1D44] mb-2 border-l-5 border-[#1D1D44] pl-4">
                Bất động sản Ranking
              </h2>
              <p className="text-gray-600 mt-2">Những bất động sản được quan tâm nhiều nhất</p>
            </div>
            
            {/* Ranking Tabs */}
            <div className="flex items-center">
              {rankingTabs.map((tab, index) => (
                <div key={index} className="py-4">
                <button
                  key={index}
                  onClick={() => handleRankingTabChange(index)}
                  disabled={rankingLoading}
                  className={`font-medium text-sm transition-colors ${
                    activeRankingTab === index
                      ? 'text-[#005EBC]'
                      : 'text-[#8D8DA1] hover:text-[#005EBC]'
                  } ${rankingLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {tab}
                </button>
                {index !== rankingTabs.length - 1 && <span className="text-gray-300 mx-4">|</span>}
                </div>
              ))}
            </div>
          </div>
          
          {/* Property Grid */}
          <div className="relative">
            {/* Loading Overlay */}
            {rankingLoading && (
              <div className="absolute inset-0 bg-white bg-opacity-75 z-10 flex items-center justify-center rounded-lg">
                <div className="text-center">
                  <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-600">Đang tải dữ liệu...</p>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-4 gap-6">
              {rankingData[activeRankingTab].map((property: PropertyItem) => (
                <div key={property.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                  <div className="relative">
                    <Image
                      src={property.image}
                      alt={property.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    {/* Image Count Overlay */}
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                      <img src="/svgs/icon_picture.svg" alt="camera" className="w-3 h-3" />
                      <span>{property.imageCount}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-[#1D1D44] mb-2 line-clamp-2">
                      <Link href={`/property/${property.id}`}>
                        {property.title}
                      </Link>
                    </h3>
                    <div className="flex items-center gap-0 text-xs font-medium text-[#FF0000] mb-3 rounded-sm overflow-hidden">
                      <span className="bg-[#FFEEEE] px-2 py-1">{property.price}</span>
                      <span className="bg-[#F7F7F7] px-2 py-1">{property.area}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-[#8D8DA1] mb-3">
                      <img src="/svgs/address.svg" alt="location" className="w-4 h-4" />
                      <span className="line-clamp-1">{property.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <button className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50">
                        <img src="/svgs/btn_tindaluu.svg" alt="favorite" className="w-4 h-4" />
                      </button>
                      <span className="text-xs text-[#C3C3C3]">{property.postedDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Expand Button */}
            <div className="text-center mt-8">
              <Button 
                type="default" 
                size="large"
                className="font-medium align-middle">
                  Mở rộng
                  <img src="/svgs/Path 704.svg" alt="expand" className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Property Suggest */}
      <div className="full-width bg-gray-50 py-16">
        <div className="responsive-container">
          {/* Section Header with Title and Tabs */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-medium text-[#1D1D44] mb-2 border-l-5 border-[#1D1D44] pl-4">
                Bất động sản dành cho bạn
              </h2>
              <p className="text-gray-600 mt-2">Những bất động sản phù hợp với nhu cầu của bạn</p>
            </div>
            
            {/* Property Tabs */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handlePropertySliderTabChange('sale')}
                disabled={propertySliderLoading}
                className={`py-2 font-medium text-sm transition-colors ${
                  activePropertySliderTab === 'sale'
                    ? 'text-[#005EBC]'
                    : 'text-[#8D8DA1] hover:text-[#005EBC]'
                } ${propertySliderLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Bán mới nhất
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => handlePropertySliderTabChange('rent')}
                disabled={propertySliderLoading}
                className={`py-2 font-medium text-sm transition-colors ${
                  activePropertySliderTab === 'rent'
                    ? 'text-[#005EBC]'
                    : 'text-[#8D8DA1] hover:text-[#005EBC]'
                } ${propertySliderLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Cho thuê mới nhất
              </button>
            </div>
          </div>
          
          {/* Property Slider */}
          <div className="relative">
            {/* Loading Overlay */}
            {propertySliderLoading && (
              <div className="absolute inset-0 bg-white bg-opacity-75 z-10 flex items-center justify-center rounded-lg">
                <div className="text-center">
                  <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-600">Đang tải dữ liệu...</p>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-4 gap-6">
              {(activePropertySliderTab === 'sale' ? propertySliderSaleData : propertySliderRentData)
                .slice(propertySliderIndex, propertySliderIndex + 4)
                .map((property: PropertyItem) => (
                <div key={property.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                  <div className="relative">
                    <Image
                      src={property.image}
                      alt={property.title}
                      width={320}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    {/* Image Count Overlay */}
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                      <img src="/svgs/icon_picture.svg" alt="camera" className="w-3 h-3" />
                      <span>{property.imageCount}</span>
                    </div>
                    {/* Status Badge */}
                    <div className={`absolute bottom-2 right-2 px-2 py-1 rounded text-xs font-medium ${
                      property.status === 'opening' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-300 text-gray-700'
                    }`}>
                      {property.status === 'opening' ? 'Đang mở bán' : 'Đã bàn giao'}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium mb-2 line-clamp-2 text-[#1D1D44]">
                      {property.title}
                    </h3>
                    <div className="text-sm mb-3">
                      {property.price} • {property.area}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                      <img src="/svgs/address.svg" alt="location" className="w-4 h-4" />
                      <span className="line-clamp-1">{property.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <button className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50">
                        <img src="/svgs/btn_tindaluu.svg" alt="favorite" className="w-4 h-4" />
                      </button>
                      <span className="text-xs text-gray-500">{property.postedDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation arrows */}
            <button 
              onClick={handlePropertySliderPrev}
              className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow z-10 hover:bg-gray-100"
              disabled={propertySliderIndex === 0}
            >
              <img src="/svgs/btn_previous.svg" alt="prev" className="w-6 h-6" />
            </button>
            <button 
              onClick={handlePropertySliderNext}
              className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow z-10 hover:bg-gray-100"
              disabled={propertySliderIndex >= (activePropertySliderTab === 'sale' ? propertySliderSaleData.length : propertySliderRentData.length) - 4}
            >
              <img src="/svgs/btn_previous.svg" alt="next" className="w-6 h-6 rotate-180" />
            </button>
          </div>
        </div>
      </div>
      
      {/* News Property */}
      <div className="full-width bg-white py-16">
        <div className="responsive-container">
          <div className="mb-8">
            <h2 className="text-3xl font-medium text-[#1D1D44] mb-2 border-l-5 border-[#1D1D44] pl-4">
              Tin tức BĐS
            </h2>
          </div>
          
          {/* News Tabs */}
          <div className="flex border-b-1 border-gray-200 mb-8">
            {newsCategories.map((category, index) => (
                <button
                  key={category.id}
                  onClick={() => handleNewsTabChange(index)}
                  disabled={newsLoading}
                  className={`px-6 py-3 font-medium text-sm transition-colors ${
                    activeNewsTab === index
                      ? 'text-[#1D1D44] border-b-3 border-[#005EBC]'
                      : 'text-[#8D8DA1] hover:text-[#1D1D44]'
                  } ${newsLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {category.name}
                </button>
            ))}
          </div>
          
          {/* News Content */}
          {(newsLoading || newsCategoriesLoading) ? (
            // Loading state
            <div className="grid grid-cols-12 gap-6 relative">
              <div className="absolute inset-0 bg-white bg-opacity-75 z-10 flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-600">Đang tải tin tức...</p>
                </div>
              </div>
              
              {/* Main Article Skeleton */}
              <div className="col-span-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="relative">
                    <div className="w-full h-64 bg-gray-200 animate-pulse"></div>
                    <div className="absolute top-4 left-4 bg-gray-300 w-20 h-6 rounded-full animate-pulse"></div>
                  </div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded mb-1 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded mb-1 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-3/4 animate-pulse"></div>
                    <div className="flex items-center justify-between">
                      <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Side Articles Skeleton */}
              <div className="col-span-6">
                <div className="space-y-2 pl-4">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="rounded-lg shadow-sm border border-gray-200 p-4">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-20 h-15 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="h-4 bg-gray-200 rounded mb-1 animate-pulse"></div>
                          <div className="h-4 bg-gray-200 rounded mb-1 animate-pulse w-3/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (!newsData[activeNewsTab] || newsData[activeNewsTab].length === 0) ? (
            // Empty state - single EmptyState for entire section
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden p-12">
              <EmptyState 
                description="Chưa có tin tức nào trong danh mục này"
                type="default"
              />
            </div>
          ) : (
            // News content when data exists
            <div className="grid grid-cols-12 gap-6">
              {/* Main Article */}
              <div className="col-span-6">
                <div className="rounded-lg overflow-hidden">
                  <div className="relative">
                    <Image
                      src={newsData[activeNewsTab]?.[0]?.featured_image || "/images/imgdemo_new@2x.png"}
                      alt={newsData[activeNewsTab]?.[0]?.title || "Tin tức"}
                      width={800}
                      height={400}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {newsCategories[activeNewsTab]?.name || 'Tin tức'}
                    </div>
                  </div>
                  <div className="py-6">
                    <h3 className="text-xl font-medium mb-2">
                      <Link href="/news/detail">
                        {newsData[activeNewsTab]?.[0]?.title || 'Tiêu đề đang cập nhật...'}
                      </Link>
                    </h3>
                    <p className="mb-4">
                      {newsData[activeNewsTab]?.[0]?.summary || 'Nội dung đang cập nhật...'}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#8D8DA1]">
                        {newsData[activeNewsTab]?.[0]?.published_at ? 
                          formatRelativeTime(newsData[activeNewsTab][0].published_at) : 
                          'Đang cập nhật'
                        }
                      </span>
                      <Button type="link" className="text-[#005EBC] p-0 h-auto">
                        Đọc thêm →
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Side Articles */}
              <div className="col-span-6">
                <div className="space-y-2 pl-4">
                  {(newsData[activeNewsTab] || []).slice(1, 7).map((article: NewsArticle, index: number) => (
                    <div key={index}>
                      <div className="items-center border-b border-gray-200">
                        <h4 className="text-lg font-medium line-clamp-2">
                          <Link href="/news/detail">
                            {article.title}
                          </Link>
                        </h4>
                        <p className="text-xs text-[#8D8DA1] mb-2">
                          {article.published_at ? 
                            formatRelativeTime(article.published_at) : 
                            'Đang cập nhật'
                          }
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* View More Button */}
          <div className="text-center mt-8">
            <Button
              type="primary"
              size="large"
              className="bg-blue-600 hover:bg-blue-700 border-none px-8 py-3"
              disabled={newsLoading}
              loading={newsLoading}
            >
              {newsLoading ? 'Đang tải...' : 'Xem thêm >'}
            </Button>
          </div>
        </div>
      </div>
       
      {/* About Home */}
      <div className="about-home">
        <div className="full-width bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
          {/* Background with bokeh effect */}
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: 'url(/images/about_BG@2x.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}></div>
          
          <div className="responsive-container relative z-10">
            <div className="grid grid-cols-12 gap-8 items-center py-30">
              {/* Left Content */}
              <div className="col-span-6">
                <div className="text-white space-y-6">
                  {/* Logo and Tagline */}
                  <div className="flex items-center gap-3 mb-20">
                    <Image src="/images/about_logo@2x.png" alt="about-logo" width={200} height={100} />
                  </div>
                  
                  {/* Main Heading */}
                  <h2 className="text-2xl font-medium text-white mb-4 border-l-5 border-white pl-4">
                    Về doanh nghiệp
                  </h2>
                  
                  {/* Description */}
                  <p className="text-xl leading-relaxed">
                    <span className="font-normal">Prosai - nền tảng AI giúp người Việt tìm nhà hiệu quả. </span>
                    <span className="font-normal">Hợp tác với chúng tôi ngay hôm nay!</span>
                  </p>
                  
                  {/* CTA Button */}
                  <div className="flex justify-end">
                    <Link
                      href="/account-overview/about"
                      className="border-none flex items-center gap-2 text-white"
                      style={{
                        color: '#FFFFFF',
                      }}
                    >
                      Xem thêm <Image src="/svgs/viewmore.svg" alt="arrow-right" width={30} height={30} />
                    </Link>
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

export default DesktopDashboard; 