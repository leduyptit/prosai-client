'use client';

import React from 'react';
import { Rating } from '@/components/ui/data-display';
import { FavoriteButton } from '@/components/features';
import { formatPrice } from '@/utils/format';

interface PropertyDetailsProps {
  propertyId: string;
  title: string;
  description: string;
  images: string[];
  price: number;
  area: number;
  address: string;
  city: string;
  district: string;
  ward: string;
  bedrooms?: number;
  bathrooms?: number;
  rating?: number;
  isFavorite?: boolean;
  onSave?: () => void;
  className?: string;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({
  propertyId,
  price,
  area,
  bedrooms = 2,
  bathrooms = 1,
  rating = 4,
  isFavorite = false,
  onSave,
  className = ''
}) => {
  return (
    <div className={`bg-white md:border-b border-gray-200 p-4 pl-0 pr-0 ${className}`}>
      {/* Price and Property Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-1 mb-4">
        {/* Price */}
        <div className="text-left md:border-r border-gray-200">
          <div className="text-sm text-gray-500 mb-1">Mức giá</div>
          <div className="font-font-medium text-gray-900">
            {price === 0 ? 'Thỏa thuận' : 
              formatPrice(price)
            }
          </div>
        </div>

        {/* Area */}
        <div className="text-left md:border-r border-gray-200 md:px-2">
          <div className="text-sm text-gray-500 mb-1">Diện tích</div>
          <div className="font-font-medium text-gray-900">{area}m²</div>
        </div>

        {/* Bedrooms */}
        <div className="text-left md:border-r border-gray-200 md:px-2">
          <div className="text-sm text-gray-500 mb-1">Phòng ngủ</div>
          <div className="font-font-medium text-gray-900">{bedrooms} phòng</div>
        </div>

        {/* Bathrooms */}
        <div className="text-left md:border-r border-gray-200 md:px-2">
          <div className="text-sm text-gray-500 mb-1">Phòng tắm/WC</div>
          <div className="font-font-medium text-gray-900">{bathrooms} phòng</div>
        </div>

        {/* Rating */}
        <div className="text-left md:px-2">
          <div className="text-sm text-gray-500 mb-1">Tiềm năng</div>
          <Rating
            value={rating}
            allowHalf
            className="text-yellow-400 rating-detail-property"
            size="small"
            style={{
              color: '#FFC107',
              fontSize: '10px'
            }}
          />
        </div>
        {/* Favorite */}
        <div className="text-left md:px-2">
          <FavoriteButton
            propertyId={propertyId}
            isFavorite={isFavorite}
            size="small"
            showText={true}
            onFavoriteChange={onSave}
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;