'use client';

import React from 'react';
import { AIRatingItem } from '@/components/ui';

interface RatingData {
  icon: string;
  label: string;
  rating?: number;
  isTotal?: boolean;
  totalScore?: number;
}

interface AIRatingSectionProps {
  title?: string;
  ratings: RatingData[];
  className?: string;
}

const AIRatingSection: React.FC<AIRatingSectionProps> = ({
  title = "Đánh giá AI (Thang điểm 5)",
  ratings,
  className = ''
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      <h3 className="text-lg font-font-medium text-gray-900 mb-3">{title}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:px-15 py-2">
        {ratings.map((item, index) => (
          <AIRatingItem
            key={index}
            icon={item.icon}
            label={item.label}
            rating={item.rating}
            isTotal={item.isTotal}
            totalScore={item.totalScore}
          />
        ))}
      </div>
    </div>
  );
};

export default AIRatingSection;