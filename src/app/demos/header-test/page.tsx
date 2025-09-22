'use client';

import React from 'react';
import { Layout } from 'antd';
import DesktopHeader from '@/layouts/desktop/Header';

const { Content } = Layout;

const HeaderTestPage: React.FC = () => {
  return (
    <Layout className="min-h-screen">
      <DesktopHeader />
      <Content className="p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-medium text-gray-900 mb-6">
            Header Test Page
          </h1>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-font-medium text-gray-800 mb-4">
              Desktop Header - Logged In State
            </h2>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium text-gray-700 mb-2">Features Included:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>PROSAI logo with tagline</li>
                  <li>Complete navigation menu (Rao bán, Cho thuê, Cần thuê, Cần mua, Chưa rõ, Xếp hạng, Tin tức, Dự án, Chat AI)</li>
                  <li>Heart icon for favorites</li>
                  <li>Bell icon with notification badge</li>
                  <li>&quot;Thông báo&quot; text</li>
                  <li>Balance display (Số dư: 150.000₫)</li>
                  <li>&quot;Nạp tiền&quot; button with wallet icon</li>
                  <li>User profile with avatar and username</li>
                  <li>Box shadow effect</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="font-medium text-blue-800 mb-2">Styling Details:</h3>
                <ul className="list-disc list-inside space-y-1 text-blue-700">
                  <li>White background with transparent header</li>
                  <li>Gray border bottom</li>
                  <li>Medium shadow effect</li>
                  <li>Consistent spacing and typography</li>
                  <li>Hover effects on navigation buttons</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default HeaderTestPage; 