'use client';

import React from 'react';
import { EmptyState } from '@/components/shared/empty-states';

const EmptyDemoPage: React.FC = () => {
  const handleCreateListing = () => {
    console.log('Navigate to create listing');
  };

  const handleSearch = () => {
    console.log('Perform new search');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          EmptyState Component Demo
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Default Empty State */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-font-medium mb-4">Default Empty State</h2>
            <EmptyState />
          </div>

          {/* Search Empty State */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-font-medium mb-4">Search No Results</h2>
            <EmptyState type="search" />
          </div>

          {/* Listing Empty State */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-font-medium mb-4">No Listings</h2>
            <EmptyState 
              type="listing" 
              onAction={handleCreateListing}
            />
          </div>

          {/* Favorites Empty State */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-font-medium mb-4">No Favorites</h2>
            <EmptyState type="favorite" />
          </div>

          {/* Notifications Empty State */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-font-medium mb-4">No Notifications</h2>
            <EmptyState type="notification" />
          </div>

          {/* Custom Empty State */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-font-medium mb-4">Custom Empty State</h2>
            <EmptyState 
              title="Tùy chỉnh tiêu đề"
              description="Đây là mô tả tùy chỉnh cho trạng thái empty"
              actionText="Thực hiện hành động"
              onAction={handleSearch}
            />
          </div>
        </div>

        {/* Real Estate Use Cases */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Real Estate Use Cases</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Empty Search Results */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-font-medium mb-4">Kết quả tìm kiếm</h3>
              <EmptyState 
                type="search"
                title="Không tìm thấy bất động sản"
                description="Thử mở rộng khu vực tìm kiếm hoặc thay đổi tiêu chí lọc"
              />
            </div>

            {/* Empty User Listings */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-font-medium mb-4">Tin đăng của tôi</h3>
              <EmptyState 
                type="listing"
                title="Chưa có tin đăng nào"
                description="Bắt đầu đăng tin để tiếp cận khách hàng"
                actionText="Đăng tin bất động sản"
                onAction={handleCreateListing}
              />
            </div>

            {/* Empty Saved Properties */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-font-medium mb-4">Tin đã lưu</h3>
              <EmptyState 
                type="favorite"
                title="Chưa lưu tin nào"
                description="Lưu những tin đăng bạn quan tâm để xem lại"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyDemoPage;