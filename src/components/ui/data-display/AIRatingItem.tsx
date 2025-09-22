'use client';

import React from 'react';
import { Rating } from '@/components/ui';

interface AIRatingItemProps {
  icon: string;
  label: string;
  rating?: number;
  isTotal?: boolean;
  totalScore?: number;
  className?: string;
}

const AIRatingItem: React.FC<AIRatingItemProps> = ({
  icon,
  label,
  rating = 0,
  isTotal = false,
  totalScore,
  className = ''
}) => {
  if (isTotal) {
    return (
      <div className={`items-center text-center ${className}`}>
        <div className="relative w-20 h-20 rounded-full" style={{ margin: '0 auto', backgroundImage:  `url("/images/Ai_tong@2x.png")`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <img src={icon} alt="AI Review Total" className="py-3 px-3" />
          <p className="text-3xl font-medium absolute bottom-5 w-full text-center text-[#FC7400]">
            {totalScore || 0}
          </p>
        </div>
        <p className="text-sm font-font-medium">{label}</p>
      </div>
    );
  }

  return (
    <div className={`items-center text-center ${className}`}>
      <img 
        src={icon} 
        alt="AI Review" 
        className="w-20 h-20" 
        style={{ margin: '0 auto' }} 
      />
      <p className="text-sm font-font-medium">{label}</p>
      <Rating 
        disabled 
        value={rating} 
        style={{ 
          color: '#FFC107', 
          margin: '0 auto', 
          fontSize: '10px' 
        }}
      />
    </div>
  );
};

export default AIRatingItem;