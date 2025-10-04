'use client';

import React, { useState } from 'react';

interface SearchHistoryItem {
  id: string;
  query: string;
  timestamp: Date;
}

const SearchHistory: React.FC = () => {
  const [searchHistory] = useState<SearchHistoryItem[]>([
    {
      id: '1',
      query: 'Xin chào! Tôi muốn tìm các thông tin về giá BĐS xung quanh khu vực Long Biên, Hà Nội',
      timestamp: new Date('2024-01-01T10:01:00'),
    },
    {
      id: '2',
      query: 'Tôi cần tìm nhà phố 3 tầng tại quận Cầu Giấy',
      timestamp: new Date('2024-01-01T09:30:00'),
    },
    {
      id: '3',
      query: 'Giá đất nền tại khu vực Nam Từ Liêm hiện tại như thế nào?',
      timestamp: new Date('2024-01-01T09:15:00'),
    },
    {
      id: '4',
      query: 'Tôi muốn mua chung cư 2 phòng ngủ giá dưới 3 tỷ',
      timestamp: new Date('2024-01-01T08:45:00'),
    },
    {
      id: '5',
      query: 'Thủ tục mua bán nhà đất cần những gì?',
      timestamp: new Date('2024-01-01T08:20:00'),
    },
  ]);

  const formatDateTime = (date: Date) => {
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }) + ' • ' + date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const handleSearchClick = (query: string) => {
    // TODO: Implement search functionality
    console.log('Search clicked:', query);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Lịch sử tìm kiếm</h2>
      </div>

      {/* Search History List */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-2 py-2">
          <div className="space-y-2">
            {searchHistory.map((item, index) => (
              <div key={item.id}>
                <div
                  className="cursor-pointer hover:bg-[#F7F7F7] hover:border-l-4 hover:border-l-[#005EBC] p-3 transition-all duration-200 relative group"
                  onClick={() => handleSearchClick(item.query)}
                >
                  <div className="text-xs text-gray-500 mb-2">
                    {formatDateTime(item.timestamp)}
                  </div>
                  <div className="text-sm text-gray-900 leading-relaxed">
                    {item.query}
                  </div>
                </div>
                <div className="border-t border-gray-100"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchHistory;
