'use client';

import React from 'react';
import { StatsCircle } from '@/components/ui';
import { Loading } from '@/components/ui/feedback';

interface StatsOverviewProps {
  activeListings?: number;
  expiredListings?: number;
  totalViews?: number;
  totalInquiries?: number;
  className?: string;
  loading?: boolean;
  error?: string | null;
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ 
  activeListings = 0,
  expiredListings = 0,
  totalViews = 0,
  totalInquiries = 0,
  className = '',
  loading = false,
  error = null
}) => {
  if (loading) {
    return (
      <div className={`${className} bg-white rounded-lg border border-gray-200 overflow-hidden`}>
        <div className="overflow-hidden">
          <h3 className="text-lg text-center font-font-medium bg-[#005EBC] py-4 text-white">Tổng quan tin đăng</h3>
        </div>
        <div className="py-12">
          <Loading />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${className} bg-white rounded-lg border border-gray-200 overflow-hidden`}>
        <div className="overflow-hidden">
          <h3 className="text-lg text-center font-font-medium bg-[#005EBC] py-4 text-white">Tổng quan tin đăng</h3>
        </div>
        <div className="py-12 text-center">
          <div className="text-red-500 mb-2">⚠️</div>
          <p className="text-gray-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className} bg-white rounded-lg border border-gray-200 overflow-hidden`}>
      <div className="overflow-hidden">
        <h3 className="text-lg text-center font-font-medium bg-[#005EBC] py-4 text-white">Tổng quan tin đăng</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 py-12.5">
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