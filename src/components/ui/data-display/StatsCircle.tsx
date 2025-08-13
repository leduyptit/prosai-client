'use client';

import React from 'react';

interface StatsCircleProps {
  value: string | number;
  label: string;
  color?: 'blue' | 'red' | 'gray' | 'orange';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const StatsCircle: React.FC<StatsCircleProps> = ({ 
  value, 
  label, 
  color = 'blue',
  size = 'medium',
  className = '' 
}) => {
  const getColorClasses = () => {
    switch (color) {
      case 'blue':
        return 'border-blue-500 text-[#005EBC]';
      case 'red':
        return 'border-red-500 text-[#FF0000]';
      case 'orange':
        return 'border-orange-500 text-[#FFA500]';
      case 'gray':
        return 'border-gray-500 text-[#8D8DA1]';
      default:
        return 'border-blue-500 text-[#005EBC]';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-16 h-16 text-lg';
      case 'large':
        return 'w-24 h-24 text-2xl';
      default:
        return 'w-20 h-20 text-xl';
    }
  };

  const getBackgroundImage = () => {
    switch (color) {
      case 'blue':
        return 'url(/images/img_tindanghienthi@2x.png)';
      case 'red':
        return 'url(/images/img_tinhethan@2x.png)';
      case 'orange':
        return 'url(/images/img_tonglienhe@2x.png)';
      case 'gray':
        return 'url(/images/img_tongluotxem@2x.png)';
      default:
        return 'url(/images/img_tonglienhe@2x.png)';
    }
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className={`
        ${getSizeClasses()} 
        ${getColorClasses()}
        flex items-center justify-center font-bold mb-4
      `}
      style={{
        backgroundImage: `${getBackgroundImage()}`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        {value}
      </div>
      <span className="text-sm text-gray-700 text-center font-medium">
        {label}
      </span>
    </div>
  );
};

export default StatsCircle;