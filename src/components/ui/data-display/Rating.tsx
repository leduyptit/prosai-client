'use client';

import React from 'react';
import { Rate as AntRate } from 'antd';
import type { RateProps as AntRateProps } from 'antd';
import { StarFilled, StarOutlined } from '@ant-design/icons';

interface RatingProps extends Omit<AntRateProps, 'character'> {
  variant?: 'default' | 'gold' | 'orange' | 'blue';
  size?: 'small' | 'medium' | 'large';
  showValue?: boolean;
  showCount?: boolean;
  reviewCount?: number;
  className?: string;
}

const Rating: React.FC<RatingProps> = ({
  variant = 'default',
  size = 'medium',
  showValue = false,
  showCount = false,
  reviewCount = 0,
  className = '',
  value = 0,
  disabled = false,
  allowHalf = true,
  ...props
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'gold':
        return 'text-yellow-500';
      case 'orange':
        return 'text-orange-500';
      case 'blue':
        return 'text-blue-500';
      default:
        return 'text-yellow-400';
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'text-xs';
      case 'large':
        return 'text-lg';
      default:
        return 'text-base';
    }
  };

  const StarIcon = ({ filled }: { filled?: boolean }) => (
    filled ? <StarFilled /> : <StarOutlined />
  );

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <AntRate
        value={value}
        disabled={disabled}
        allowHalf={allowHalf}
        character={<StarIcon filled />}
        className={`${getVariantClass()} ${getSizeClass()} rating-component`}
        {...props}
      />
      
      {showValue && (
        <span className={`font-medium text-gray-700 ${getSizeClass()}`}>
          {value ? value.toFixed(1) : '0.0'}
        </span>
      )}
      
      {showCount && reviewCount > 0 && (
        <span className={`text-gray-500 ${getSizeClass()}`}>
          ({reviewCount} đánh giá)
        </span>
      )}
    </div>
  );
};

export default Rating;