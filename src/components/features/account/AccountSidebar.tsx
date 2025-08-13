'use client';

import React from 'react';
import { Menu } from 'antd';
import { UserOutlined, CrownOutlined, FileTextOutlined, SettingOutlined } from '@ant-design/icons';
import { Card } from '@/components/ui';
import Link from 'next/link';

interface AccountSidebarProps {
  activeKey?: string;
  className?: string;
}

const AccountSidebar: React.FC<AccountSidebarProps> = ({ 
  activeKey = 'overview',
  className = '' 
}) => {
  const menuItems = [
    {
      key: 'membership',
      icon: <CrownOutlined />,
      label: <Link href="/account-overview/membership">Gói hội viên</Link>,
    },
    {
      key: 'posts',
      icon: <FileTextOutlined />,
      label: <Link href="/account-overview/post-manager">Quản lý tin đăng</Link>,
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: <Link href="/account-overview/settings">Cài đặt tài khoản</Link>,
    },
  ];

  return (
    <div className={`bg-[#F7F7F7] rounded-lg shadow-sm ${className}`}>
      {/* User Profile Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-3">
            <UserOutlined className="text-white text-2xl" />
          </div>
          <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full font-font-medium">
            User 6367949
          </span>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="p-4">
        <Menu
          mode="vertical"
          selectedKeys={[activeKey]}
          style={{
            backgroundColor: '#F7F7F7',
            border: 'none',
            fontWeight: 'font-medium',
          }}
          items={menuItems}
        />
      </div>

      {/* Contact Support Link */}
      <div className="p-4 border-t border-gray-200 flex justify-center">
        <Link 
          href="/logout" 
          className="text-sm flex items-center gap-2 font-font-medium logout-button"
        >
          <span>Đăng xuất</span>
        </Link>
      </div>
    </div>
  );
};

export default AccountSidebar;