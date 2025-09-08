'use client';

import React, { useState, useEffect } from 'react';
import { Input, Button } from 'antd';
import { wardsService, type Ward } from '@/services';

interface WardSelectorProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (wards: string[]) => void;
  selectedCity: string;
  selectedWards: string[];
  className?: string;
  showKeywordAsTag?: boolean;
  keywordTagText?: string;
  onRemoveKeyword?: () => void;
}

const WardSelector: React.FC<WardSelectorProps> = ({
  visible,
  onClose,
  onSelect,
  selectedCity,
  selectedWards,
  className = '',
  showKeywordAsTag = false,
  keywordTagText = '',
  onRemoveKeyword
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [wards, setWards] = useState<Ward[]>([]);
  const [filteredWards, setFilteredWards] = useState<Ward[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch wards (wards service reused) from API when city changes
  const fetchWards = async (city: string) => {
    if (!city) {
      setWards([]);
      setFilteredWards([]);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const wardsData = await wardsService.getWardsByCity(city);
      setWards(wardsData);
      setFilteredWards(wardsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải dữ liệu');
      setWards([]);
      setFilteredWards([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch wards when city changes
  useEffect(() => {
    if (selectedCity) {
      fetchWards(selectedCity);
    } else {
      setWards([]);
      setFilteredWards([]);
    }
  }, [selectedCity]);

  // Filter wards based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = wards.filter(ward => 
        ward.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredWards(filtered);
    } else {
      setFilteredWards(wards);
    }
  }, [searchTerm, wards]);

  // Reset search term when dropdown closes
  useEffect(() => {
    if (!visible) {
      setSearchTerm('');
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div className={`absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-lg z-[9999] mt-1 ${className}`}>
      {/* Top Section - Selected Items */}
      {(selectedWards.length > 0 || (showKeywordAsTag && keywordTagText)) && (
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-start mb-3">
            <span className="text-sm font-medium text-gray-700">Đã chọn</span>
            <Button
              type="text"
              size="small"
              onClick={() => {
                onSelect([]);
                if (onRemoveKeyword) {
                  onRemoveKeyword();
                }
              }}
              className="text-red-500 hover:text-red-700 p-0 h-auto"
            >
              Xóa tất cả
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {/* Show selected wards */}
            {selectedWards.map((ward, index) => (
              <div
                key={index}
                className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                <span>{ward}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const newWards = selectedWards.filter((_, i) => i !== index);
                    onSelect(newWards);
                  }}
                  className="text-blue-600 hover:text-blue-800 ml-1 text-lg leading-none"
                >
                  ×
                </button>
              </div>
            ))}
            
            {/* Show keyword tag */}
            {showKeywordAsTag && keywordTagText && (
              <div className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                <span>🔍</span>
                <span className="max-w-none break-words">{keywordTagText}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveKeyword?.();
                  }}
                  className="text-green-600 hover:text-green-800 ml-1 text-lg leading-none flex-shrink-0"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Content - Left: Ward List, Right: Search Input */}
      <div className="flex gap-6 p-4">
        {/* Left: Ward List */}
        <div className="w-50">
          <h3 className="text-sm font-medium mb-3 text-gray-700">Xu hướng tìm kiếm</h3>
          <div className="max-h-64 overflow-y-auto scrollbar-hide">
            {loading ? (
              <div className="p-4 text-center text-gray-500 text-sm">
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  Đang tải dữ liệu...
                </div>
              </div>
            ) : error ? (
              <div className="p-4 text-center text-red-500 text-sm">
                {error}
              </div>
            ) : selectedCity ? (
              filteredWards.length > 0 ? (
                filteredWards.map((ward) => (
                  <div
                    key={ward.id}
                    onClick={() => {
                      const isSelected = selectedWards.includes(ward.name);
                      let newSelectedWards: string[];
                      
                      if (isSelected) {
                        // Remove from selection
                        newSelectedWards = selectedWards.filter(d => d !== ward.name);
                      } else {
                        // Add to selection
                        newSelectedWards = [...selectedWards, ward.name];
                      }
                      
                      onSelect(newSelectedWards);
                    }}
                    className={`flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100 text-sm mb-1 rounded-sm ${
                      selectedWards.includes(ward.name) ? 'bg-gray-200' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img src="/svgs/address.svg" alt="location" className="w-4 h-4 text-gray-500" />
                      <div>
                        <div className="text-gray-700 font-medium">{(ward.type === 'WARD' ? 'Phường' : 'Xã')} {ward.name}</div>
                        <div className="text-xs text-gray-500">
                          {ward.search_count.toLocaleString()} lượt tìm kiếm
                        </div>
                      </div>
                    </div>
                    {selectedWards.includes(ward.name) && (
                      <div className="text-blue-600">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))
              ) : searchTerm ? (
                <div className="p-4 text-center text-gray-500 text-sm">
                  Không tìm thấy phường/xã nào
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500 text-sm">
                  Không có dữ liệu phường/xã
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
            <Input
              placeholder="Tên Phường, Xã"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              suffix={<img src="/svgs/icon_search.svg" className="w-4 h-4" alt="search" />}
              size="small"
              className="w-full"
              autoFocus
            />
            {searchTerm && (
              <div className="mt-2 text-xs text-gray-500">
                Tìm thấy {filteredWards.length} kết quả
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WardSelector;


