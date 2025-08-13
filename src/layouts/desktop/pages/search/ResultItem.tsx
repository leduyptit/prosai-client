'use client';

import React, { useState } from 'react';
import { Button, message } from 'antd';
import Rating from '@/components/ui/data-display/Rating';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import PhoneButton from '@/components/ui/buttons/PhoneButton';

export interface SearchItem {
  id: string;
  title: string;
  priceLabel: string; // e.g., "2 tỷ"
  areaBadge?: string; // e.g., "45 m²"
  pricePerM2?: string; // e.g., "44.44 tr/m²"
  bedrooms?: number;
  bathrooms?: number;
  address: string;
  imageUrl: string;
  imagesCount?: number;
  postedBy?: string;
  postedAt?: string; // e.g., "Đăng 2 ngày trước"
  rating?: number; // 0-5
  phone?: string; // e.g., "0982560123"
  isFavorite?: boolean;
}

interface ResultItemProps {
  item: SearchItem;
}

const ResultItem: React.FC<ResultItemProps> = ({ item }) => {

  return (
    <>
      <div className="mb-4 rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="flex items-stretch">
          {/* Image */}
          <div className="relative w-60 min-h-[112px] self-stretch overflow-hidden rounded-md flex-shrink-0 bg-gray-100">
            <img src={item.imageUrl} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
            {item.imagesCount ? (
              <div className="absolute bottom-2 left-2 text-white text-xs bg-black/60 px-2 py-0.5 rounded-sm flex items-center gap-1">
                <img src="/svgs/icon_picture.svg" alt="images" className="h-4 w-4" />
                <span className="font-medium text-white">{item.imagesCount}</span>
              </div>
            ) : null}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 p-4">
            {/* Title */}
            <div className="font-medium text-gray-900 text-[15px] leading-5 line-clamp-2 pr-2">
              {item.title}
            </div>

            {/* Badges Row */}
            <div className="mt-2 flex flex-wrap items-center gap-5 text-sm">
              <div className="inline-flex rounded-md overflow-hidden">
                <span className="px-2 py-0.5 bg-red-50 text-red-600 font-medium">{item.priceLabel}</span>
                {item.areaBadge && (
                  <span className="px-2 py-0.5 bg-[#F7F7F7] text-red-600 font-medium">{item.areaBadge}</span>
                )}
              </div>
              {item.pricePerM2 && (
                <span className="text-gray-700">{item.pricePerM2}</span>
              )}
              {typeof item.bedrooms === 'number' && (
                <span className="text-gray-700 flex items-center gap-1">{item.bedrooms} <img src="/svgs/bedroom.svg" alt="bed" className="h-4 w-4" /></span>
              )}
              {typeof item.bathrooms === 'number' && (
                <span className="text-gray-700 flex items-center gap-1">{item.bathrooms} <img src="/svgs/bathroom.svg" alt="bath" className="h-4 w-4" /></span>
              )}
              <span className="ml-1 text-gray-700">Tiềm năng</span>
              <Rating disabled value={item.rating ?? 4} className="rating-star" style={{ fontSize: '18px' }} />
            </div>

            {/* Address */}
            <div className="mt-2 text-sm text-gray-700 flex items-center gap-1">
              <img src="/svgs/address.svg" alt="location" className="h-4 w-4" />
              {item.address}
            </div>

            {/* Footer Row */}
            <div className="mt-3 flex items-center justify-between gap-3 border-t border-gray-200 pt-3">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium text-sm">
                  {(item.postedBy ?? 'U')[0]}
                </div>
                <div className="text-sm text-gray-700 truncate">
                  <div className="font-medium truncate">{item.postedBy ?? 'Người đăng'}</div>
                  <div className="text-xs text-gray-500">{item.postedAt ?? 'Đăng 2 ngày trước'}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <PhoneButton
                  phoneNumber={item.phone || ''}
                  className="px-4"
                />
                <Button className="h-9 rounded-full border-gray-300 favorite-button">
                  {item.isFavorite ? (
                    <HeartFilled className="text-red-500 text-lg" />
                  ) : (
                    <HeartOutlined className="text-lg" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultItem;
