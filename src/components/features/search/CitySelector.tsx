'use client';

import React, { useState, useEffect } from 'react';
import { Input, Button } from 'antd';
import { CITIES } from '@/constants';

interface CitySelectorProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (city: string) => void;
  selectedCity: string;
  className?: string;
}

const CitySelector: React.FC<CitySelectorProps> = ({
  visible,
  onClose,
  onSelect,
  selectedCity,
  className = ''
}) => {
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
    <div className={`absolute top-full left-0 right-0 bg-white z-[9999] mt-1 border border-gray-200 rounded-b-lg shadow-lg ${className}`}>
      <div className="flex gap-6 p-4">
        {/* Left: City List */}
        <div className="w-50">
          <h3 className="text-sm font-medium mb-3 text-gray-700">Danh sách tỉnh, thành phố</h3>
          <div className="max-h-64 overflow-y-auto scrollbar-hide">
            {filteredCities.length > 0 ? (
              filteredCities.map((city: any) => (
                <div
                  key={city.value}
                  onClick={() => {
                    onSelect(city.label);
                    onClose();
                  }}
                  className={`flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-100 text-sm rounded-sm ${
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

export default CitySelector;
