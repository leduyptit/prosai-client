'use client';

import React from 'react';
import Image from 'next/image';
import { PropertyRankingItem } from '@/types/api';
import { formatPrice, formatRelativeTime } from '@/utils/format';
import Link from 'next/link';

interface PropertySuggestProps {
  activePropertySliderTab: 'sale' | 'rent';
  propertySliderLoading: boolean;
  propertySliderIndex: number;
  propertySliderSaleData: PropertyRankingItem[];
  propertySliderRentData: PropertyRankingItem[];
  onPropertySliderTabChange: (type: 'sale' | 'rent') => void;
  onPropertySliderNext: () => void;
  onPropertySliderPrev: () => void;
}

const PropertySuggest: React.FC<PropertySuggestProps> = ({
  activePropertySliderTab,
  propertySliderLoading,
  propertySliderIndex,
  propertySliderSaleData,
  propertySliderRentData,
  onPropertySliderTabChange,
  onPropertySliderNext,
  onPropertySliderPrev
}) => {
  // Helper function to convert PropertyRankingItem to display format
  const convertPropertyToDisplayFormat = (property: PropertyRankingItem) => {
    const price = property.price_all?.[0] || property.price?.[0] || 0;
    const area = property.area?.[0] || 0;
    
    return {
      id: property.id,
      title: property.title,
      price: property.price_all ? formatPrice(property.price_all[0]) : formatPrice(property.price[0]),
      area: `${area}m²`,
      location: property.address || 'Chưa có địa chỉ',
      bedrooms: 0, // Not available in API
      bathrooms: 0, // Not available in API
      image: property.images?.[0] || '/images/imgdemo_new@2x.png',
      type: activePropertySliderTab,
      postedDate: formatRelativeTime(new Date(property.created_at)),
      status: 'opening' as const, // Default status
      imageCount: property.images?.length || 0
    };
  };

  return (
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
              onClick={() => onPropertySliderTabChange('sale')}
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
              onClick={() => onPropertySliderTabChange('rent')}
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
              .map((property: PropertyRankingItem) => {
                const displayProperty = convertPropertyToDisplayFormat(property);
                return (
                  <div key={displayProperty.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                    <div className="relative">
                      <Image
                        src={displayProperty.image}
                        alt={displayProperty.title}
                        width={320}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                      {/* Image Count Overlay */}
                      <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                        <img src="/svgs/icon_picture.svg" alt="camera" className="w-3 h-3" />
                        <span>{displayProperty.imageCount}</span>
                      </div>
                      {/* Status Badge */}
                      <div className={`absolute bottom-2 right-2 px-2 py-1 rounded text-xs font-medium ${
                        displayProperty.status === 'opening' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-300 text-gray-700'
                      }`}>
                        {displayProperty.status === 'opening' ? 'Đang mở bán' : 'Đã bàn giao'}
                      </div>
                    </div>
                    <div className="p-4">
                      <Link href={`/property/${displayProperty.id}`}>
                        <h3 className="text-lg font-medium mb-2 line-clamp-2 text-[#1D1D44]">
                          {displayProperty.title}
                        </h3>
                      </Link>
                      <div className="text-sm mb-3">
                        {displayProperty.price} • {displayProperty.area}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                        <img src="/svgs/address.svg" alt="location" className="w-4 h-4" />
                        <span className="line-clamp-1">{displayProperty.location}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <button className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50">
                          <img src="/svgs/btn_tindaluu.svg" alt="favorite" className="w-4 h-4" />
                        </button>
                        <span className="text-xs text-gray-500">{displayProperty.postedDate}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          
          {/* Navigation arrows */}
          <button 
            onClick={onPropertySliderPrev}
            className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow z-10 hover:bg-gray-100"
            disabled={propertySliderIndex === 0}
          >
            <img src="/svgs/btn_previous.svg" alt="prev" className="w-6 h-6" />
          </button>
          <button 
            onClick={onPropertySliderNext}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow z-10 hover:bg-gray-100"
            disabled={propertySliderIndex >= (activePropertySliderTab === 'sale' ? propertySliderSaleData.length : propertySliderRentData.length) - 4}
          >
            <img src="/svgs/btn_previous.svg" alt="next" className="w-6 h-6 rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertySuggest;
