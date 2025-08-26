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
import { StatisticsResponse } from '@/services/statistics';

// Location Picker Dropdown Component
const LocationPickerDropdown: React.FC<{
  visible: boolean;
  onClose: () => void;
  onSelect: (city: string) => void;
  selectedCity: string;
}> = ({ visible, onClose, onSelect, selectedCity }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCities, setFilteredCities] = useState(CITIES as any);

  // Remove duplicates from CITIES
  const uniqueCities = CITIES.filter((city, index, self) => 
    index === self.findIndex(c => c.value === city.value)
  );

  // Filter cities based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = uniqueCities.filter(city => 
        city.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCities(filtered as any);
    } else {
      setFilteredCities(uniqueCities as any);
    }
  }, [searchTerm]);

  // Reset search term when dropdown closes
  useEffect(() => {
    if (!visible) {
      setSearchTerm('');
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-lg z-50 mt-1">
      <div className="flex gap-6 p-4">
        {/* Left: City List */}
        <div className="w-50">
          <h3 className="text-sm font-medium mb-3 text-gray-700">Danh sách tỉnh, thành phố</h3>
          <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg bg-gray-50">
            {filteredCities.length > 0 ? (
              filteredCities.map((city: any) => (
                <div
                  key={city.value}
                  onClick={() => {
                    onSelect(city.label);
                    onClose();
                  }}
                  className={`flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-100 border-b border-gray-200 text-sm ${
                    selectedCity === city.label ? 'bg-gray-200' : ''
                  }`}
                >
                  <img src="/svgs/address.svg" alt="location" className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">{city.label}</span>
                </div>
              ))
            ) : searchTerm ? (
              <div className="p-4 text-center text-gray-500 text-sm">
                Không tìm thấy tỉnh/thành phố nào
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500 text-sm">
                Vui lòng nhập tên tỉnh/thành phố để tìm kiếm
              </div>
            )}
          </div>
        </div>

        {/* Right: Search Input */}
        <div className="w-30 flex-1 flex justify-end">
          <div className="relative">
            <Input
              placeholder="Tên tỉnh, thành phố"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              suffix={<img src="/svgs/icon_search.svg" className="w-4 h-4" alt="search" />}
              size="small"
              className="w-full"
              autoFocus
            />
            {searchTerm && (
              <div className="mt-2 text-xs text-gray-500">
                Tìm thấy {filteredCities.length} kết quả
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// District Picker Dropdown Component
const DistrictPickerDropdown: React.FC<{
  visible: boolean;
  onClose: () => void;
  onSelect: (districts: string[]) => void;
  selectedCity: string;
  selectedDistricts: string[];
}> = ({ visible, onClose, onSelect, selectedCity, selectedDistricts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDistricts, setFilteredDistricts] = useState<any[]>([]);

  // Mock district data for selected city
  const getDistrictsForCity = (city: string) => {
    const mockDistricts: { [key: string]: any[] } = {
      'Hà Nội': [
        { value: 'Cầu Giấy', label: 'Cầu Giấy', searchCount: 33987 },
        { value: 'Long Biên', label: 'Long Biên', searchCount: 28945 },
        { value: 'Ba Đình', label: 'Ba Đình', searchCount: 25678 },
        { value: 'Hà Đông', label: 'Hà Đông', searchCount: 23456 },
        { value: 'Thanh Xuân', label: 'Thanh Xuân', searchCount: 21234 },
        { value: 'Đống Đa', label: 'Đống Đa', searchCount: 19876 },
        { value: 'Bắc Từ Liêm', label: 'Bắc Từ Liêm', searchCount: 18765 },
        { value: 'Nam Từ Liêm', label: 'Nam Từ Liêm', searchCount: 17654 },
        { value: 'Hai Bà Trưng', label: 'Hai Bà Trưng', searchCount: 16543 },
        { value: 'Hoàn Kiếm', label: 'Hoàn Kiếm', searchCount: 15432 },
        { value: 'Tây Hồ', label: 'Tây Hồ', searchCount: 14321 },
        { value: 'Hoàng Mai', label: 'Hoàng Mai', searchCount: 13210 }
      ],
      'TP. Hồ Chí Minh': [
        { value: 'Quận 1', label: 'Quận 1', searchCount: 45678 },
        { value: 'Quận 2', label: 'Quận 2', searchCount: 42345 },
        { value: 'Quận 3', label: 'Quận 3', searchCount: 39876 },
        { value: 'Quận 4', label: 'Quận 4', searchCount: 37654 },
        { value: 'Quận 5', label: 'Quận 5', searchCount: 35432 },
        { value: 'Quận 6', label: 'Quận 6', searchCount: 33210 },
        { value: 'Quận 7', label: 'Quận 7', searchCount: 31987 },
        { value: 'Quận 8', label: 'Quận 8', searchCount: 30765 },
        { value: 'Quận 9', label: 'Quận 9', searchCount: 29543 },
        { value: 'Quận 10', label: 'Quận 10', searchCount: 28321 }
      ],
      'Đà Nẵng': [
        { value: 'Quận Hải Châu', label: 'Quận Hải Châu', searchCount: 12345 },
        { value: 'Quận Thanh Khê', label: 'Quận Thanh Khê', searchCount: 11234 },
        { value: 'Quận Sơn Trà', label: 'Quận Sơn Trà', searchCount: 10123 },
        { value: 'Quận Ngũ Hành Sơn', label: 'Quận Ngũ Hành Sơn', searchCount: 9012 },
        { value: 'Quận Liên Chiểu', label: 'Quận Liên Chiểu', searchCount: 8901 },
        { value: 'Quận Cẩm Lệ', label: 'Quận Cẩm Lệ', searchCount: 8790 }
      ]
    };
    return mockDistricts[city] || [];
  };

  // Filter districts based on search term
  useEffect(() => {
    if (selectedCity) {
      const allDistricts = getDistrictsForCity(selectedCity);
      if (searchTerm) {
        const filtered = allDistricts.filter(district => 
          district.label.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredDistricts(filtered);
      } else {
        setFilteredDistricts(allDistricts);
      }
    } else {
      setFilteredDistricts([]);
    }
  }, [searchTerm, selectedCity]);

  // Reset search term when dropdown closes
  useEffect(() => {
    if (!visible) {
      setSearchTerm('');
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-lg z-50 mt-1">
      <div className="flex gap-6 p-4">
        {/* Left: District List */}
        <div className="flex-1">
          <h3 className="text-sm font-medium mb-3 text-gray-700">Xu hướng tìm kiếm</h3>
          <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg bg-gray-50">
            {selectedCity ? (
              filteredDistricts.length > 0 ? (
                filteredDistricts.map((district: any) => (
                  <div
                    key={district.value}
                    onClick={() => {
                      const isSelected = selectedDistricts.includes(district.label);
                      let newSelectedDistricts: string[];
                      
                      if (isSelected) {
                        // Remove from selection
                        newSelectedDistricts = selectedDistricts.filter(d => d !== district.label);
                      } else {
                        // Add to selection
                        newSelectedDistricts = [...selectedDistricts, district.label];
                      }
                      
                      onSelect(newSelectedDistricts);
                      // Auto-close dropdown after selection
                      setTimeout(() => {
                        onClose();
                      }, 200);
                    }}
                    className={`flex flex-col gap-1 p-3 cursor-pointer hover:bg-gray-100 border-b border-gray-200 text-sm ${
                      selectedDistricts.includes(district.label) ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img src="/svgs/address.svg" alt="location" className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700 font-medium">{district.label}</span>
                    </div>
                    <div className="text-xs text-gray-500 ml-7">
                      {district.searchCount.toLocaleString()} lượt tìm kiếm
                    </div>
                  </div>
                ))
              ) : searchTerm ? (
                <div className="p-4 text-center text-gray-500 text-sm">
                  Không tìm thấy quận/huyện nào
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500 text-sm">
                  Không có dữ liệu quận/huyện
                </div>
              )
            ) : (
              <div className="p-4 text-center text-gray-500 text-sm">
                Vui lòng chọn tỉnh/thành phố trước
              </div>
            )}
          </div>
        </div>

        {/* Right: Search Input */}
        <div className="w-30 flex-1 flex justify-end">
          <div className="relative">
            <h3 className="text-sm font-medium mb-3 text-gray-700">Tên Phường, xã</h3>
            <Input
              placeholder="Tên Phường, xã"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              suffix={<img src="/svgs/icon_search.svg" className="w-4 h-4" alt="search" />}
              size="small"
              className="w-full"
              autoFocus
            />
            {searchTerm && (
              <div className="mt-2 text-xs text-gray-500">
                Tìm thấy {filteredDistricts.length} kết quả
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Selection Counter */}
      <div className="flex justify-between items-center p-4 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          Đã chọn {selectedDistricts.length} quận/huyện
        </div>
        <div className="text-xs text-gray-500">
          Click để chọn/bỏ chọn
        </div>
      </div>
    </div>
  );
};

interface HeaderBannerProps {
  activeTab: number;
  searchForm: {
    city: string;
    district: string;
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
  onInputChange,
  onSearch
}) => {
  const router = useRouter();
  const [locationPickerVisible, setLocationPickerVisible] = useState(false);
  const [districtPickerVisible, setDistrictPickerVisible] = useState(false);
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);

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
                      onClick={() => onTabChange(index)}
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
                <div className="relative">
                  <div className="flex gap-3 mb-4 bg-white border border-[#C3C3C3] rounded-lg pr-1 pl-4">
                    <div className="flex items-center relative">
                      <img src="/svgs/address.svg" alt="location" className="w-4 h-4 mr-2" />
                      <Button
                        type="text"
                        onClick={() => {
                          setDistrictPickerVisible(false);
                          setLocationPickerVisible(!locationPickerVisible);
                        }}
                        className="border-none bg-white text-left px-0 py-0 h-auto"
                      >
                        {searchForm.city || "Chọn vị trí"}
                      </Button>
                    </div>
                     
                    <div className="flex-1 flex items-center">
                       <img src="/svgs/icon_search.svg" className="w-5 h-5 mr-2" alt="search" />
                       <div className="flex-1 flex flex-wrap items-center gap-1 p-2 bg-white rounded-l border-none">
                         {selectedDistricts.length > 0 ? (
                           <>
                             {selectedDistricts.map((district, index) => (
                               <div
                                 key={index}
                                 className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                               >
                                 <span>{district}</span>
                                 <button
                                   type="button"
                                   onClick={(e) => {
                                     e.stopPropagation();
                                     const newDistricts = selectedDistricts.filter((_, i) => i !== index);
                                     setSelectedDistricts(newDistricts);
                                     onInputChange('district', newDistricts.join(', '));
                                   }}
                                   className="text-blue-600 hover:text-blue-800 ml-1"
                                 >
                                   ×
                                 </button>
                               </div>
                             ))}
                              <input
                                 placeholder="Nhập địa điểm, dự án, quận, huyện..."
                                 value=""
                                 onChange={() => {}}
                                 onFocus={() => {
                                   if (searchForm.city && searchForm.city !== 'Tất cả') {
                                     setLocationPickerVisible(false);
                                     setDistrictPickerVisible(true);
                                   } else {
                                     setDistrictPickerVisible(false);
                                     setLocationPickerVisible(true);
                                   }
                                 }}
                                 className="flex-1 min-w-0 border-none outline-none bg-transparent text-sm"
                                 disabled={!searchForm.city || searchForm.city === 'Tất cả'}
                               />
                           </>
                         ) : (
                                                         <input
                               placeholder={searchForm.city && searchForm.city !== 'Tất cả' ? "Nhập địa điểm, dự án, quận, huyện..." : "Vui lòng chọn tỉnh/thành phố trước"}
                               value=""
                               onChange={() => {}}
                               onFocus={() => {
                                 if (searchForm.city && searchForm.city !== 'Tất cả') {
                                   setLocationPickerVisible(false);
                                   setDistrictPickerVisible(true);
                                 } else {
                                   setDistrictPickerVisible(false);
                                   setLocationPickerVisible(true);
                                 }
                               }}
                               className={`flex-1 border-none outline-none bg-transparent text-sm ${
                                 !searchForm.city || searchForm.city === 'Tất cả' ? 'cursor-pointer' : ''
                               }`}
                               disabled={!searchForm.city || searchForm.city === 'Tất cả'}
                             />
                         )}
                       </div>
                       <Button
                         type="primary"
                         size="small"
                         onClick={onSearch}
                         className="rounded-l-none border-none text-white font-medium"
                       >
                         Tìm kiếm
                       </Button>
                       
                       {/* District Picker Dropdown */}
                       <DistrictPickerDropdown
                         visible={districtPickerVisible}
                         onClose={() => setDistrictPickerVisible(false)}
                         onSelect={(districts: string[]) => {
                           setSelectedDistricts(districts);
                           onInputChange('district', districts.join(', '));
                         }}
                         selectedCity={searchForm.city}
                         selectedDistricts={selectedDistricts}
                       />
                     </div>
                  </div>

                  {/* Location Picker Dropdown */}
                  <LocationPickerDropdown
                    visible={locationPickerVisible}
                    onClose={() => setLocationPickerVisible(false)}
                    onSelect={(city: string) => {
                      onInputChange('city', city);
                                     if (city === 'Tất cả') {
                 setSelectedDistricts([]); // Reset selected districts when city is "Tất cả"
                 onInputChange('district', ''); // Clear district when city is "Tất cả"
               }
                    }}
                    selectedCity={searchForm.city}
                  />
                </div>

                {/* Filter Options */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <Select
                    placeholder="Loại hình"
                    value={searchForm.propertyType}
                    size="small"
                    onChange={(value) => onInputChange('propertyType', value)}
                    className="w-full placeholder:text-[#8D8DA1] bg-white border-[#C3C3C3] rounded-lg"
                    options={PROPERTY_TYPES as any}
                  />
                  <Select
                    placeholder="Mức giá"
                    value={searchForm.priceRange}
                    size="small"
                    onChange={(value) => onInputChange('priceRange', value)}
                    className="w-full placeholder:text-[#8D8DA1] bg-white border-[#C3C3C3] rounded-lg"
                    options={PRICE_RANGES as any}
                  />
                  <Select
                    placeholder="Diện tích"
                    value={searchForm.area}
                    size="small"
                    onChange={(value) => onInputChange('area', value)}
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
  );
};

export default HeaderBanner;
