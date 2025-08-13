'use client';

import React from 'react';
import Link from 'next/link';
import { PropertySummary } from '@/types';

interface RelatedPropertiesProps {
  title?: string;
  properties: PropertySummary[];
  className?: string;
}

const RelatedProperties: React.FC<RelatedPropertiesProps> = ({
  title = "BDS gợi ý tương tự",
  properties,
  className = ''
}) => {
  if (!properties || properties.length === 0) {
    return null;
  }

  return (
    <div className={`bg-[#F5F5F5] border border-[#EBEBEB] shadow-md rounded-lg p-4 ${className}`}>
      {/* Title */}
      <h3 className="text-base font-bold text-[#1D1D44] mb-6">
        {title}
      </h3>

      {/* Properties List */}
      <div className="space-y-3">
        {properties.map((property) => (
          <Link
            key={property.id}
            href={property.url || `/property/${property.id}`}
            className="block hover:bg-white rounded-lg transition-colors duration-200"
          >
            <div className="space-y-1">
              {/* Title */}
              <h4 className="text-sm font-medium text-[#1D1D44] line-clamp-2">
                {property.title} - {property.price} - {property.area} - {property.location}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProperties;
