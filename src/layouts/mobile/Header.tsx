'use client';

import React, { useState } from 'react';
import { Button, Dropdown, Avatar, Drawer } from 'antd';
import { MenuOutlined, UserOutlined, SettingOutlined, LogoutOutlined, BellOutlined } from '@ant-design/icons';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { APP_CONFIG } from '@/utils/env';
import { useLogout } from '@/hooks/useLogout';

const { Header: AntHeader } = require('antd/lib/layout');

const MobileHeader: React.FC = () => {
  const { data: session, status } = useSession();
  const { logout, isLoading: isLoggingOut } = useLogout();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: <Link href="/account-overview/settings">Hồ sơ cá nhân</Link>,
    },
    {
      key: 'membership',
      icon: <SettingOutlined />,
      label: <Link href="/account-overview/membership">Gói hội viên</Link>,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: isLoggingOut ? 'Đang đăng xuất...' : 'Đăng xuất',
      onClick: () => logout(APP_CONFIG.homeUrl),
    },
  ];

  return (
    <>
      <AntHeader className="bg-white border-b border-gray-200 px-4 h-16 flex items-center justify-between space-x-5" style={{ padding: '0 15px' }}>
        {/* Left - Menu */}
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={showDrawer}
          className="text-gray-700"
        />

        {/* Center - Logo */}
        <Link href={APP_CONFIG.homeUrl}>
          <img src="/svgs/top_logo.svg" alt="logo" className="h-8" />
        </Link>

        {/* Right - Notifications & Profile */}
        <div className="flex items-center space-x-2">
          {status === 'loading' ? (
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
          ) : session ? (
            <>
              {/* Notifications */}
              <Button
                type="text"
                icon={<BellOutlined />}
                className="text-gray-700"
              />
              
              {/* User Menu */}
              <Dropdown menu={{ items: userMenuItems }} placement="bottomLeft">
                <Avatar 
                  src={session.user?.image} 
                  icon={<UserOutlined />} 
                  size="small"
                  className="cursor-pointer"
                />
              </Dropdown>
            </>
          ) : (
            <Button
              type="text"
              icon={<UserOutlined />}
              className="text-gray-700"
            />
          )}
        </div>
      </AntHeader>

      {/* Drawer Menu */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={onClose}
        open={drawerVisible}
        className="mobile-drawer"
      >
        <div className="flex flex-col space-y-1 px-6 py-6">
          <Link href={APP_CONFIG.homeUrl} onClick={onClose} className="text-gray-700 py-2">
            Trang chủ
          </Link>
          <Link href="/search" onClick={onClose} className="text-gray-700 py-2">
            Tìm kiếm
          </Link>
          <Link href="/post-property" onClick={onClose} className="text-gray-700 py-2">
            Đăng tin
          </Link>
          <Link href="/news" onClick={onClose} className="text-gray-700 py-2">
            Tin tức
          </Link>
          <Link href="/about" onClick={onClose} className="text-gray-700 py-2">
            Giới thiệu
          </Link>
        </div>
      </Drawer>
    </>
  );
};

export default MobileHeader;