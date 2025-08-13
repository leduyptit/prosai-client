'use client';

import React from 'react';
import { InfoItem } from '@/components/ui';

interface PropertyDetailItem {
  icon: string;
  iconAlt: string;
  label: string;
  value: string | number;
  layout?: 'vertical' | 'horizontal';
}

interface PropertyDetailsGridProps {
  title?: string;
  items: PropertyDetailItem[];
  columns?: 3 | 4 | 5 | 6;
  className?: string;
}

const PropertyDetailsGrid: React.FC<PropertyDetailsGridProps> = ({
  title = "Đặc điểm bất động sản",
  items,
  columns = 3,
  className = ''
}) => {
  const getGridClass = () => {
    switch (columns) {
      case 3:
        return 'grid-cols-3';
      case 4:
        return 'grid-cols-4';
      case 5:
        return 'grid-cols-5';
      case 6:
        return 'grid-cols-6';
      default:
        return 'grid-cols-3';
    }
  };

  return (
    <div className={`mb-6 ${className}`}>
      <h3 className="text-lg font-font-medium text-gray-900 mb-3">{title}</h3>
      <div className={`grid ${getGridClass()} gap-4`}>
        {items.map((item, index) => (
          <InfoItem
            key={index}
            icon={item.icon}
            iconAlt={item.iconAlt}
            label={item.label}
            value={item.value}
            layout={item.layout || 'vertical'}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyDetailsGrid;