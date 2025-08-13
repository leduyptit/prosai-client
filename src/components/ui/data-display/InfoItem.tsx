'use client';

import React from 'react';

interface InfoItemProps {
  icon?: string | React.ReactNode;
  label: string;
  value: string | number;
  iconAlt?: string;
  className?: string;
  layout?: 'vertical' | 'horizontal';
  iconSize?: 'small' | 'medium' | 'large';
}

const InfoItem: React.FC<InfoItemProps> = ({
  icon,
  label,
  value,
  iconAlt = '',
  className = '',
  layout = 'vertical',
  iconSize = 'small'
}) => {
  const getIconSizeClass = () => {
    switch (iconSize) {
      case 'small':
        return 'w-4 h-4';
      case 'medium':
        return 'w-5 h-5';
      case 'large':
        return 'w-6 h-6';
      default:
        return 'w-4 h-4';
    }
  };

  const renderIcon = () => {
    if (!icon) return null;
    
    if (typeof icon === 'string') {
      return (
        <img 
          src={icon} 
          alt={iconAlt} 
          className={`${getIconSizeClass()} flex-shrink-0`} 
        />
      );
    }
    
    return <span className={`${getIconSizeClass()} flex-shrink-0`}>{icon}</span>;
  };

  if (layout === 'horizontal') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {renderIcon()}
        <span className="text-gray-600 text-sm">{label}:</span>
        <span className="font-medium text-gray-900">{value}</span>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <div className="flex items-center gap-1 text-gray-600 text-sm mb-1">
        {renderIcon()}
        <span>{label}:</span>
      </div>
      <div className="font-medium text-gray-900">{value}</div>
    </div>
  );
};

export default InfoItem;