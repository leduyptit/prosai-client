'use client';

import React, { useState, useEffect } from 'react';
import { Layout, Button, Dropdown, Avatar } from 'antd';
import Image from 'next/image';
import { 
  UserOutlined, 
  SettingOutlined, 
  LogoutOutlined, 
  DashboardOutlined,
  BellOutlined,
  HeartOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import LoginModal from '@/components/features/auth/login/LoginModal';
import RegisterModal from '@/components/features/auth/register/RegisterModal';
import ForgotPasswordModal from '@/components/features/auth/forgot-password/ForgotPasswordModal';
import { APP_CONFIG } from '@/utils/env';

const { Header: AntHeader } = Layout;

const DesktopHeader: React.FC = () => {
  const { data: session, status } = useSession();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);

  // Debug session changes
  useEffect(() => {
    console.log('🔄 Header session updated:', { status, user: session?.user?.name });
  }, [session, status]);

  // Format currency
  const formatCurrency = (amount: string | number) => {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('vi-VN').format(num);
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

  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleSwitchToRegisterFromLogin = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const handleOpenRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  const handleSwitchToLoginFromRegister = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const handleOpenForgotPasswordModal = () => {
    setIsForgotPasswordModalOpen(true);
  };

  const handleCloseForgotPasswordModal = () => {
    setIsForgotPasswordModalOpen(false);
  };

  const handleBackToLoginFromForgotPassword = () => {
    setIsForgotPasswordModalOpen(false);
    setIsLoginModalOpen(true);
  };

  return (
    <AntHeader className="prosai-header flex-between border-b border-gray-200 px-10 h-20 shadow-md relative" style={{ background: 'transparent' }}>
      {/* Left Section */}
      <div className="flex items-center space-x-8">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          {/* Logo */}
          {/* utils env APP_CONFIG.name */}
          <Link href={APP_CONFIG.homeUrl}><Image src="/svgs/top_logo.svg" alt={APP_CONFIG.name} width={160} height={40} className="w-40" /></Link>
        </div>

        {/* Navigation Menu */}
        <div className="flex items-center space-0">
          <Button type="text" className="font-medium">
            Rao bán
          </Button>
          <Button type="text" className="font-medium px-0">
            Cho thuê
          </Button>
          <Button type="text" className="font-medium">
            Cần thuê
          </Button>
          <Button type="text" className="font-medium">
            Cần mua
          </Button>
          <Button type="text" className="font-medium">
            Chưa rõ
          </Button>
          <Button type="text" className="font-medium">
            Xếp hạng
          </Button>
          <Button type="text" className="font-medium">
            Tin tức
          </Button>
          <Button type="text" className="font-medium">
            Dự án
          </Button>
          <Button type="text" className="font-medium">
            Chat AI
          </Button>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {status === 'loading' ? (
          <div className="text-gray-500">Đang tải...</div>
                ) : session ? (
          /* Logged In State */
          <>
            {/* Favorites */}
            <Button 
              type="text" 
              icon={<HeartOutlined />}
              className="text-gray-700 hover:text-red-500 text-lg"
            />

            {/* Notifications with Balance */}
            <div className="flex items-center space-x-1">
              <Button 
                type="text" 
                icon={<BellOutlined />}
                className="text-gray-700 hover:text-blue-600"
              />
              <span className="text-sm font-medium text-gray-700">Thông báo</span>
              <span className="text-sm font-bold text-orange-600">
                Số dư: {formatCurrency(session?.user?.balance || '0')}đ
              </span>
            </div>

            {/* Top up money */}
            <Button 
              icon={<Image src="/svgs/icon_naptien.svg" alt="payment" width={16} height={16} />}
              className="font-medium"
              style={{ border: '1px solid #D4D4D4', borderRadius: '20px' }}
            >
              Nạp tiền
            </Button>

            {/* User Menu */}
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <div className="flex items-center">
                <Avatar
                  src={session.user?.avatar_url}
                  icon={<UserOutlined />}
                  size="default"
                  className="bg-blue-500"
                />
                <span className="text-sm font-medium text-gray-700 ml-2">
                  {session.user?.name || `user${session.user?.id?.slice(-7) || '4499682'}`}
                </span>
              </div>
            </Dropdown>
          </>
        ) : (
          /* Not Logged In State */
          <>
            <Button 
              type="text" 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleOpenLoginModal}
            >
              Đăng nhập
            </Button>
            <Button 
              type="text" 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleOpenRegisterModal}
            >
              Đăng ký
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Image src="/svgs/icon_download_app.svg" alt="download" width={20} height={20} className="h-5 mr-2" />
              Tải ứng dụng
            </Button>
          </>
        )}
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={handleCloseLoginModal}
        onOpenForgotPassword={handleOpenForgotPasswordModal}
        onSwitchToRegister={handleSwitchToRegisterFromLogin}
      />

      {/* Register Modal */}
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={handleCloseRegisterModal}
        onSwitchToLogin={handleSwitchToLoginFromRegister}
      />

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={isForgotPasswordModalOpen}
        onClose={handleCloseForgotPasswordModal}
        onBackToLogin={handleBackToLoginFromForgotPassword}
      />
    </AntHeader>
  );
};

export default DesktopHeader;