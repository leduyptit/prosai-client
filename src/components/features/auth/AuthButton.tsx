'use client';

import React from 'react';
import { Button, Dropdown, Avatar } from 'antd';
import { UserOutlined, LogoutOutlined, SettingOutlined, DashboardOutlined } from '@ant-design/icons';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

const AuthButton: React.FC = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return <Button loading>Đang tải...</Button>;
  }

  if (!isAuthenticated) {
    return (
      <div className="flex gap-2">
        <Button onClick={() => router.push('/auth/signin')}>
          Đăng nhập
        </Button>
        <Button type="primary" onClick={() => router.push('/auth/signup')}>
          Đăng ký
        </Button>
      </div>
    );
  }

  const menuItems = [
    {
      key: 'dashboard',
      label: 'Tổng quan tài khoản',
      icon: <DashboardOutlined />,
      onClick: () => router.push('/account-overview'),
    },
    {
      key: 'settings',
      label: 'Cài đặt tài khoản',
      icon: <SettingOutlined />,
      onClick: () => router.push('/account-overview/settings'),
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      label: 'Đăng xuất',
      icon: <LogoutOutlined />,
      onClick: logout,
    },
  ];

  return (
    <Dropdown menu={{ items: menuItems }} placement="bottomRight">
      <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
        <Avatar 
          src={user?.avatar} 
          icon={<UserOutlined />} 
          size="small" 
        />
        <span className="text-sm font-medium">{user?.name}</span>
      </div>
    </Dropdown>
  );
};

export default AuthButton;
