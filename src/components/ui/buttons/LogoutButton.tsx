'use client';

import React from 'react';
import { Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useLogout } from '@/hooks/useLogout';

interface LogoutButtonProps {
  callbackUrl?: string;
  className?: string;
  size?: 'small' | 'middle' | 'large';
  type?: 'text' | 'link' | 'default' | 'primary' | 'dashed';
  danger?: boolean;
  children?: React.ReactNode;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({
  callbackUrl = '/',
  className = '',
  size = 'middle',
  type = 'text',
  danger = true,
  children
}) => {
  const { logout, isLoading } = useLogout();

  const handleLogout = () => {
    logout(callbackUrl);
  };

  return (
    <Button
      type={type}
      size={size}
      danger={danger}
      loading={isLoading}
      onClick={handleLogout}
      className={className}
      icon={<LogoutOutlined />}
    >
      {children || (isLoading ? 'Đang đăng xuất...' : 'Đăng xuất')}
    </Button>
  );
};

export default LogoutButton;
