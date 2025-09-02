'use client';

import React from 'react';
import { Rating } from '@/components/ui/data-display';
import { FavoriteButton } from '@/components/features';

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
  onSave?: () => void;
  className?: string;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({
  propertyId,
  title,
  description,
  images,
  price,
  area,
  address,
  city,
  district,
  ward,
  bedrooms = 2,
  bathrooms = 1,
  rating = 4,
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
              price >= 1000000000 ? 
                `${(price / 1000000000).toFixed(1)} tỷ` : 
                `${(price / 1000000).toFixed(0)} triệu`
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
            title={title}
            description={description}
            images={images}
            price={price}
            area={area}
            address={address}
            city={city}
            district={district}
            ward={ward}
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