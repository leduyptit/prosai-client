'use client';

import React from 'react';
import { StatsCircle } from '@/components/ui';

interface StatsOverviewProps {
  activeListings?: number;
  expiredListings?: number;
  totalViews?: number;
  totalInquiries?: number;
  className?: string;
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ 
  activeListings = 6,
  expiredListings = 12,
  totalViews = 3647,
  totalInquiries = 86,
  className = '' 
}) => {
  return (
    <div className={`${className} bg-white rounded-lg border border-gray-200 overflow-hidden`}>
      <div className="overflow-hidden">
        <h3 className="text-lg text-center font-font-medium bg-[#005EBC] py-4 text-white">Tổng quan tin đăng</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 py-6">
        <StatsCircle
          value={activeListings}
          label="Tin đang hiển thị"
          color="blue"
          className="col-span-3"
          size="large"
        />
        
        <StatsCircle
          value={expiredListings}
          label="Tin đã hết hạn"
          color="red"
          className="col-span-3"
          size="large"
        />
        
        <StatsCircle
          value={totalViews.toLocaleString()}
          label="Tổng lượt xem"
          color="gray"
          className="col-span-3"
          size="large"
        />
        
        <StatsCircle
          value={totalInquiries}
          label="Tổng lần hỏi"
          color="orange"
          className="col-span-3"
          size="large"
        />
      </div>
    </div>
  );
};

export default StatsOverview;