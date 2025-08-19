'use client';

import React, { useState, useEffect } from 'react';
import { Layout, Button, Drawer, Avatar, Dropdown } from 'antd';
import { 
  MenuOutlined,
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
  DashboardOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import type { MenuProps } from 'antd';

const { Header: AntHeader } = Layout;

const MobileHeader: React.FC = () => {
  const { data: session, status } = useSession();
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Debug session changes
  useEffect(() => {
    console.log('🔄 Mobile Header session updated:', { status, user: session?.user?.name });
  }, [session, status]);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
  };

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: <Link href="/account-overview">Tổng quan tài khoản</Link>,
    },
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
      label: 'Đăng xuất',
      onClick: () => signOut({ callbackUrl: '/' }),
    },
  ];

  return (
    <>
      <AntHeader className="bg-white border-b border-gray-200 px-4 h-16 flex items-center justify-between">
        {/* Left - Menu */}
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={showDrawer}
          className="text-gray-700"
        />

        {/* Center - Logo */}
        <Link href="/">
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
          <Link href="/" onClick={onClose} className="text-gray-700 py-2">
            Trang chủ
          </Link>
          <Link href="/property" onClick={onClose} className="text-gray-700 py-2">
            Bất động sản
          </Link>
          <Link href="/news" onClick={onClose} className="text-gray-700 py-2">
            Tin tức
          </Link>
          <Link href="/about" onClick={onClose} className="text-gray-700 py-2">
            Giới thiệu
          </Link>
          <Link href="/contact" onClick={onClose} className="text-gray-700 py-2">
            Liên hệ
          </Link>
        </div>
      </Drawer>
    </>
  );
};

export default MobileHeader;