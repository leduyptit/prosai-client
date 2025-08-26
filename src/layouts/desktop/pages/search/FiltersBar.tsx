'use client';

import React, { useState, useEffect } from 'react';
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
    district?: string;
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

// Location Picker Dropdown Component
const LocationPickerDropdown: React.FC<{
  visible: boolean;
  onClose: () => void;
  onSelect: (city: string) => void;
  selectedCity: string;
}> = ({ visible, onClose, onSelect, selectedCity }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCities, setFilteredCities] = useState(CITIES as any);

  const uniqueCities = CITIES.filter((city, index, self) => 
    index === self.findIndex(c => c.value === city.value)
  );

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

  const getDistrictsForCity = (city: string) => {
    const mockDistricts: { [key: string]: any[] } = {
      'Hà Nội': [
        { value: 'cau-giay', label: 'Cầu Giấy', searchCount: 33987 },
        { value: 'long-bien', label: 'Long Biên', searchCount: 28945 },
        { value: 'ba-dinh', label: 'Ba Đình', searchCount: 25678 },
        { value: 'ha-dong', label: 'Hà Đông', searchCount: 23456 },
        { value: 'thanh-xuan', label: 'Thanh Xuân', searchCount: 21234 },
        { value: 'dong-da', label: 'Đống Đa', searchCount: 19876 },
        { value: 'bac-tu-liem', label: 'Bắc Từ Liêm', searchCount: 18765 },
        { value: 'nam-tu-liem', label: 'Nam Từ Liêm', searchCount: 17654 },
        { value: 'hai-ba-trung', label: 'Hai Bà Trưng', searchCount: 16543 },
        { value: 'hoan-kiem', label: 'Hoàn Kiếm', searchCount: 15432 },
        { value: 'tay-ho', label: 'Tây Hồ', searchCount: 14321 },
        { value: 'hoang-mai', label: 'Hoàng Mai', searchCount: 13210 }
      ],
      'TP. Hồ Chí Minh': [
        { value: 'quan-1', label: 'Quận 1', searchCount: 45678 },
        { value: 'quan-2', label: 'Quận 2', searchCount: 42345 },
        { value: 'quan-3', label: 'Quận 3', searchCount: 39876 },
        { value: 'quan-4', label: 'Quận 4', searchCount: 37654 },
        { value: 'quan-5', label: 'Quận 5', searchCount: 35432 },
        { value: 'quan-6', label: 'Quận 6', searchCount: 33210 },
        { value: 'quan-7', label: 'Quận 7', searchCount: 31987 },
        { value: 'quan-8', label: 'Quận 8', searchCount: 30765 },
        { value: 'quan-9', label: 'Quận 9', searchCount: 29543 },
        { value: 'quan-10', label: 'Quận 10', searchCount: 28321 }
      ],
      'Đà Nẵng': [
        { value: 'hai-chau', label: 'Quận Hải Châu', searchCount: 12345 },
        { value: 'thanh-khe', label: 'Quận Thanh Khê', searchCount: 11234 },
        { value: 'son-tra', label: 'Quận Sơn Trà', searchCount: 10123 },
        { value: 'ngu-hanh-son', label: 'Quận Ngũ Hành Sơn', searchCount: 9012 },
        { value: 'lien-chieu', label: 'Quận Liên Chiểu', searchCount: 8901 },
        { value: 'cam-le', label: 'Quận Cẩm Lệ', searchCount: 8790 }
      ]
    };
    return mockDistricts[city] || [];
  };

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

const FiltersBar: React.FC<FiltersBarProps> = ({ onSearch, initialFilters }) => {
  const [filters, setFilters] = useState({
    city: initialFilters?.city || 'all',
    district: initialFilters?.district || '',
    propertyType: initialFilters?.propertyType || 'all',
    priceRange: initialFilters?.priceRange || 'all',
    areaRange: initialFilters?.areaRange || 'all',
    bedrooms: initialFilters?.bedrooms || 'all',
    bathrooms: initialFilters?.bathrooms || 'all',
    legalStatus: initialFilters?.legalStatus || 'all'
  });

  const [locationPickerVisible, setLocationPickerVisible] = useState(false);
  const [districtPickerVisible, setDistrictPickerVisible] = useState(false);
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);

  // Update filters when initialFilters change
  useEffect(() => {
    if (initialFilters) {
      setFilters({
        city: initialFilters.city || 'all',
        district: initialFilters.district || '',
        propertyType: initialFilters.propertyType || 'all',
        priceRange: initialFilters.priceRange || 'all',
        areaRange: initialFilters.areaRange || 'all',
        bedrooms: initialFilters.bedrooms || 'all',
        bathrooms: initialFilters.bathrooms || 'all',
        legalStatus: initialFilters.legalStatus || 'all'
      });

      // Parse district from URL params and update selectedDistricts
      if (initialFilters.district) {
        const districts = initialFilters.district.split(', ').map(d => d.trim());
        setSelectedDistricts(districts);
      } else {
        setSelectedDistricts([]);
      }
    }
  }, [initialFilters]);

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Convert filters to API params
    const apiParams: any = {};
    
    // City mapping - only include if not default
    if (newFilters.city !== 'all') {
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
    
    onSearch?.(apiParams);
  };

  const handleSearchClick = () => {
    handleFilterChange('district', filters.district);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
      {/* Row 1 */}
      <div className="md:flex md:flex-wrap items-center md:gap-3">
        <div className="mb-3 md:mb-0 md:flex items-center gap-2 flex-1 border border-gray-200 rounded-lg md:h-10 text-gray-700 min-w-[160px] relative">
          {/* Location */}
          <div className="flex items-center gap-2 rounded-lg px-3 h-10 text-gray-700 md:min-w-[160px]">
            <img src="/svgs/address.svg" alt="location" className="h-4 w-4" />
            <Button
              type="text"
              onClick={() => {
                setDistrictPickerVisible(false);
                setLocationPickerVisible(!locationPickerVisible);
              }}
              className="border-none bg-white text-left px-0 py-0 h-auto"
            >
              {filters.city !== 'all' ? filters.city : "Chọn vị trí"}
            </Button>
          </div>
          
          {/* Keyword + Search */}
          <div className="md:flex items-stretch md:flex-1 md:min-w-[320px] mb-3 md:mb-0">
            <div className="flex-1 flex items-center">
              <img src="/svgs/icon_search.svg" className="w-5 h-5 mr-2" alt="search" />
              <div className="flex-1 flex flex-wrap items-center gap-1 p-2">
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
                             handleFilterChange('district', newDistricts.join(', '));
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
                        if (filters.city && filters.city !== 'all') {
                          setLocationPickerVisible(false);
                          setDistrictPickerVisible(true);
                        } else {
                          setDistrictPickerVisible(false);
                          setLocationPickerVisible(true);
                        }
                      }}
                      className="flex-1 min-w-0 border-none outline-none bg-transparent text-sm"
                      disabled={!filters.city || filters.city === 'all'}
                    />
                  </>
                ) : (
                  <input
                    placeholder={filters.city && filters.city !== 'all' ? "Nhập địa điểm, dự án, quận, huyện..." : "Vui lòng chọn tỉnh/thành phố trước"}
                    value=""
                    onChange={() => {}}
                    onFocus={() => {
                      if (filters.city && filters.city !== 'all') {
                        setLocationPickerVisible(false);
                        setDistrictPickerVisible(true);
                      } else {
                        setDistrictPickerVisible(false);
                        setLocationPickerVisible(true);
                      }
                    }}
                    className={`flex-1 border-none outline-none bg-transparent text-sm ${
                      !filters.city || filters.city === 'all' ? 'cursor-pointer' : ''
                    }`}
                    disabled={!filters.city || filters.city === 'all'}
                  />
                )}
              </div>
              <Button
                type="primary"
                className="rounded-l-none bg-blue-600 hover:bg-blue-700 text-white m-1"
                size="small"
                onClick={handleSearchClick}
              >
                <span className="font-medium">Tìm kiếm</span>
              </Button>
              
              {/* District Picker Dropdown */}
              <DistrictPickerDropdown
                visible={districtPickerVisible}
                onClose={() => setDistrictPickerVisible(false)}
                                 onSelect={(districts: string[]) => {
                   setSelectedDistricts(districts);
                   handleFilterChange('district', districts.join(', '));
                 }}
                selectedCity={filters.city}
                selectedDistricts={selectedDistricts}
              />
            </div>
          </div>

          {/* Location Picker Dropdown */}
          <LocationPickerDropdown
            visible={locationPickerVisible}
            onClose={() => setLocationPickerVisible(false)}
                         onSelect={(city: string) => {
               handleFilterChange('city', city);
               if (city === 'Tất cả') {
                 setSelectedDistricts([]); // Reset selected districts when city is "Tất cả"
                 handleFilterChange('district', ''); // Clear district when city is "Tất cả"
               }
             }}
            selectedCity={filters.city}
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
