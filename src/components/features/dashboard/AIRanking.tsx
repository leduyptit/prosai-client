'use client';

import React from 'react';
import { Button } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { PropertyRankingItem } from '@/types/api';
import { formatPrice, formatRelativeTime } from '@/utils/format';
import { FavoriteButton } from '@/components/features';

interface AIRankingProps {
  rankingLoading: boolean;
  rankingData: PropertyRankingItem[];
  onLoadMore: () => void;
  hasMoreData: boolean;
  loadingMore: boolean;
}

const AIRanking: React.FC<AIRankingProps> = ({
  rankingLoading,
  rankingData,
  onLoadMore,
  hasMoreData,
  loadingMore
}) => {
  // Helper function to convert PropertyRankingItem to display format
  const convertPropertyToDisplayFormat = (property: PropertyRankingItem) => {
    const price = property.price_all?.[0] || property.price?.[0] || 0;
    const area = property.area?.[0] || 0;
    
    return {
      id: property.id,
      title: property.title,
      price: formatPrice(price),
      area: `${area}m²`,
      location: property.address || 'Chưa có địa chỉ',
      image: property.images?.[0] || '/images/imgdemo_new@2x.png',
      postedDate: formatRelativeTime(new Date(property.created_at)),
      imageCount: property.images?.length || 0
    };
  };

  return (
    <div className="full-width bg-white py-16">
      <div className="responsive-container">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-medium text-[#1D1D44] mb-2">
            Bảng xếp hạng 100 BĐS
          </h2>
          <p className="text-gray-600 mt-2">Những bất động sản được AI gợi ý dựa trên sở thích của bạn</p>
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
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {rankingData?.map((property: PropertyRankingItem) => {
              const displayProperty = convertPropertyToDisplayFormat(property);
              return (
                <div key={displayProperty.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                  <div className="relative">
                    <Image
                      src={displayProperty.image}
                      alt={displayProperty.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    {/* Image Count Overlay */}
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                      <img src="/svgs/icon_picture.svg" alt="camera" className="w-3 h-3" />
                      <span>{displayProperty.imageCount}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-[#1D1D44] mb-2 line-clamp-2">
                      <Link href={`/property/${displayProperty.id}`}>
                        {displayProperty.title}
                      </Link>
                    </h3>
                    <div className="flex items-center gap-0 text-xs font-medium text-[#FF0000] mb-3 rounded-sm overflow-hidden">
                      <span className="bg-[#FFEEEE] px-2 py-1">{displayProperty.price}</span>
                      <span className="bg-[#F7F7F7] px-2 py-1">{displayProperty.area}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-[#8D8DA1] mb-3">
                      <img src="/svgs/address.svg" alt="location" className="w-4 h-4" />
                      <span className="line-clamp-1">{displayProperty.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <FavoriteButton
                        propertyId={property.id}
                        isFavorite={property.is_favorite || false}
                        className="w-8 h-8 rounded"
                        size="small"
                      />
                      <span className="text-xs text-[#C3C3C3]">{displayProperty.postedDate}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Expand Button */}
          {hasMoreData && (
            <div className="text-center mt-8">
              <Button 
                type="default" 
                size="large"
                loading={loadingMore}
                onClick={onLoadMore}
                disabled={loadingMore}
                className="font-medium align-middle">
                  {loadingMore ? 'Đang tải...' : 'Xem thêm'}
                  {!loadingMore && <img src="/svgs/Path 704.svg" alt="expand" className="w-3 h-3" />}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIRanking;
