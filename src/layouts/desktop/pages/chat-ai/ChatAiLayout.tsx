'use client';

import React from 'react';
import { Breadcrumb } from '@/components/ui/navigation';
import Link from 'next/link';
import { APP_CONFIG } from '@/utils/env';
import ChatInterface from './ChatInterface';
import SearchHistory from './SearchHistory';

const ChatAiLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gray-50 p-3">
        <div className="responsive-container mx-auto px-4">
          {/* Breadcrumb */}
          <Breadcrumb
            separator=">"
            className="text-sm"
            items={[
              {
                title: <Link href={APP_CONFIG.homeUrl} className="text-gray-600 hover:text-blue-600">Trang chủ</Link>,
              },
              {
                title: <span className="text-gray-900">Tư vấn AI</span>,
              },
            ]}
          />
        </div>
      </div>
      
      <div className="responsive-container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="col-span-12">
            <div className="space-y-6">
              {/* Page Title */}
              <div>
                <h1 className="text-2xl font-medium">Hỗ trợ AI thông minh 24/7 - Giúp bạn tìm bất động sản phù hợp</h1>
              </div>

              <div className="grid grid-cols-12 gap-6 h-[calc(100vh-300px)]">
                {/* Chat Interface - 2/3 width */}
                <div className="col-span-12 lg:col-span-8">
                  <ChatInterface />
                </div>
                
                {/* Search History - 1/3 width */}
                <div className="col-span-12 lg:col-span-4">
                  <SearchHistory />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatAiLayout;
