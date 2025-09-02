'use client';

import React from 'react';
import { Menu } from 'antd';
import { UserOutlined, CrownOutlined, FileTextOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useLogout } from '@/hooks/useLogout';
import { useSession } from 'next-auth/react';

interface AccountSidebarProps {
  activeKey?: string;
  className?: string;
}

const AccountSidebar: React.FC<AccountSidebarProps> = ({ 
  activeKey = 'overview',
  className = '' 
}) => {
  const { logout, isLoading } = useLogout();
  const { data: session } = useSession();
  
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
          <div className="w-16 h-16 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center mb-3">
            {(session?.user?.avatar_url || session?.user?.image) ? (
              <img 
                src={session.user.avatar_url || session.user.image} 
                alt={session.user.name || 'User'} 
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <UserOutlined className="text-white text-2xl" />
            )}
          </div>
          <span className="text-sm px-3 py-1 rounded-full font-font-medium">
            {session?.user?.name || session?.user?.email || 'User'}
          </span>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="p-4 min-h-[265px]">
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

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200 flex justify-center">
        <button 
          onClick={() => logout('/')}
          disabled={isLoading}
          className="text-sm flex items-center gap-2 font-font-medium text-red-600 hover:text-red-700 transition-colors logout-button disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <LogoutOutlined />
          <span>{isLoading ? 'Đang đăng xuất...' : 'Đăng xuất'}</span>
        </button>
      </div>
    </div>
  );
};

export default AccountSidebar;