'use client';

import React from 'react';
import { 
  HomeOutlined, 
  SearchOutlined, 
  HeartOutlined, 
  UserOutlined,
  PlusOutlined 
} from '@ant-design/icons';
import Link from 'next/link';

const MobileBottomNav: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center py-2 px-4">
        {/* Home */}
        <Link href="/" className="flex flex-col items-center py-2">
          <HomeOutlined className="text-lg text-gray-600" />
          <span className="text-xs text-gray-600 mt-1">Trang chủ</span>
        </Link>

        {/* Search */}
        <Link href="/search" className="flex flex-col items-center py-2">
          <SearchOutlined className="text-lg text-gray-600" />
          <span className="text-xs text-gray-600 mt-1">Tìm kiếm</span>
        </Link>

        {/* Post */}
        <Link href="/post" className="flex flex-col items-center py-2">
          <div className="bg-blue-600 rounded-full p-2 mb-1">
            <PlusOutlined className="text-lg text-white" />
          </div>
          <span className="text-xs text-gray-600">Đăng tin</span>
        </Link>

        {/* Favorites */}
        <Link href="/favorites" className="flex flex-col items-center py-2">
          <HeartOutlined className="text-lg text-gray-600" />
          <span className="text-xs text-gray-600 mt-1">Yêu thích</span>
        </Link>

        {/* Profile */}
        <Link href="/profile" className="flex flex-col items-center py-2">
          <UserOutlined className="text-lg text-gray-600" />
          <span className="text-xs text-gray-600 mt-1">Cá nhân</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileBottomNav;