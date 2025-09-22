'use client';

import React from 'react';
import Link from 'next/link';
import { PropertyRankingItem } from '@/types/api';
import { formatPrice, formatRelativeTime } from '@/utils/format';
import { EmptyState } from '@/components/shared/empty-states';

interface RelatedPropertiesProps {
  title?: string;
  properties: PropertyRankingItem[];
  className?: string;
  loading?: boolean;
}

const RelatedProperties: React.FC<RelatedPropertiesProps> = ({
  title = "BDS gợi ý tương tự",
  properties,
  className = '',
  loading = false
}) => {
  if (loading) {
    return (
      <div className={`bg-[#F5F5F5] border border-[#EBEBEB] shadow-md rounded-lg p-4 ${className}`}>
        <h3 className="text-base font-medium text-[#1D1D44] mb-6">
          {title}
        </h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!properties || properties.length === 0) {
    return (
      <div className={`bg-[#F5F5F5] border border-[#EBEBEB] shadow-md rounded-lg p-4 ${className}`}>
        {/* Title */}
        <h3 className="text-base font-medium text-[#1D1D44] mb-6">
          {title}
        </h3>
        
        {/* Empty State */}
        <EmptyState
          type="default"
          title="Không có dữ liệu"
          description="Chưa có bất động sản nào tương tự"
          className="py-6"
        />
      </div>
    );
  }

  return (
    <div className={`bg-[#F5F5F5] border border-[#EBEBEB] shadow-md rounded-lg p-4 ${className}`}>
      {/* Title */}
      <h3 className="text-base font-medium text-[#1D1D44] mb-6">
        {title}
      </h3>

      {/* Properties List */}
      <div className="space-y-3">
        {properties.map((property) => {
          const price = formatPrice(Number(property.price));
          const area = property.area || 0 + ' m²';
          
          return (
            <Link
              key={property.id}
              href={`/property/${property.id}`}
              className="block hover:bg-white rounded-lg transition-colors duration-200 p-2"
            >
              <div className="space-y-1">
                {/* Title */}
                <h4 className="text-sm font-medium text-[#1D1D44] line-clamp-2">
                  {property.title}
                </h4>
                {/* Price and Area */}
                <p className="text-xs text-gray-600">
                  {price} • {area}m² • {property.address || 'Chưa có địa chỉ'}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProperties;
