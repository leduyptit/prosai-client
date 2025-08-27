'use client';

import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Avatar, Badge } from 'antd';
import { CrownOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { formatCurrency } from '@/utils/format';
import { LoginModal } from '@/components/features/auth/login';
import { RegisterModal } from '@/components/features/auth/register';
import { ForgotPasswordModal } from '@/components/features/auth/forgot-password';
import Link from 'next/link';
import { APP_CONFIG } from '@/utils/env';
import { useProfileStats } from '@/hooks';
import { FavoritesDropdown } from '@/components/features';

const Header: React.FC = () => {
  const { data: session, status } = useSession();
  const { data: profileStats } = useProfileStats();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
  const [isFavoritesDropdownOpen, setIsFavoritesDropdownOpen] = useState(false);

  const handleOpenLoginModal = () => setIsLoginModalOpen(true);
  const handleCloseLoginModal = () => setIsLoginModalOpen(false);
  const handleOpenRegisterModal = () => setIsRegisterModalOpen(true);
  const handleCloseRegisterModal = () => setIsRegisterModalOpen(false);
  const handleOpenForgotPasswordModal = () => setIsForgotPasswordModalOpen(true);
  const handleCloseForgotPasswordModal = () => setIsForgotPasswordModalOpen(false);

  const handleSwitchToRegisterFromLogin = () => {
    handleCloseLoginModal();
    handleOpenRegisterModal();
  };

  const handleSwitchToLoginFromRegister = () => {
    handleCloseRegisterModal();
    handleOpenLoginModal();
  };

  const handleBackToLoginFromForgotPassword = () => {
    handleCloseForgotPasswordModal();
    handleOpenLoginModal();
  };

  const userMenuItems = [
    {
      key: 'profile',
      label: <Link href="/account-overview">Thông tin cá nhân</Link>,
      icon: <UserOutlined />,
    },
    {
      key: 'settings',
      label: <Link href="/account-overview/settings">Cài đặt</Link>,
      icon: <SettingOutlined />,
    },
    {
      key: 'membership',
      label: <Link href="/account-overview/membership">Gói hội viên</Link>,
      icon: <CrownOutlined />,
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      label: 'Đăng xuất',
      icon: <LogoutOutlined />,
      onClick: () => {
        // Handle logout logic here
        console.log('Logout clicked');
      },
    },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.favorites-dropdown-container')) {
        setIsFavoritesDropdownOpen(false);
      }
    };

    if (isFavoritesDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFavoritesDropdownOpen]);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="responsive-container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left Section */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href={APP_CONFIG.homeUrl}>
                <img src="/svgs/top_logo.svg" alt="Logo" className="h-8" />
              </Link>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-6">
              <Link href={APP_CONFIG.homeUrl} className="text-gray-700 hover:text-blue-600 font-medium">
                Trang chủ
              </Link>
              <Link href="/search" className="text-gray-700 hover:text-blue-600 font-medium">
                Tìm kiếm
              </Link>
              <Link href="/post-property" className="text-gray-700 hover:text-blue-600 font-medium">
                Đăng tin
              </Link>
              <a href="/news" className="text-gray-700 hover:text-blue-600 font-medium">
                Tin tức
              </a>
              <a href="/about" className="text-gray-700 hover:text-blue-600 font-medium">
                Giới thiệu
              </a>
            </nav>
          </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {status === 'loading' ? (
          <div className="text-gray-500">Đang tải...</div>
                ) : session ? (
          /* Logged In State */
          <>
            {/* Favorites */}
            <div className="relative favorites-dropdown-container" style={{ margin: '0' }}>
              <Button 
                type="text" 
                icon={
                  <div className="relative inline-flex items-center">
                    <img src="/svgs/akar-heart.svg" alt="favorite" width={20} height={20} className="mt-2"/>
                    <Badge 
                      count={profileStats?.favorite_count || 0} 
                      size="small" 
                      className="absolute -top-1 right-1" 
                    />
                  </div>
                }
                style={{ margin: '0' }}
                className="text-gray-700 hover:text-red-500 text-lg mr-0 flex items-center"
                onClick={() => setIsFavoritesDropdownOpen(!isFavoritesDropdownOpen)}
              />
              
              <FavoritesDropdown
                visible={isFavoritesDropdownOpen}
                onClose={() => setIsFavoritesDropdownOpen(false)}
                favoritesCount={profileStats?.favorite_count || 0}
                bookmarkCount={profileStats?.bookmark_count || 0}
              />
            </div>

            {/* Notifications with Balance */}
            <div className="flex items-center space-x-1">
              <Button 
                type="text" 
                icon={<img src="/svgs/icon_thongbao_tbmoi.svg" alt="notification" width={20} height={20} />}
                className="text-gray-700 hover:text-blue-600"
              />
              {/* <span className="text-sm font-medium text-gray-700">Thông báo</span> */}
              <span className="font-medium text-sm">
                Số dư: {formatCurrency(parseFloat(session?.user?.balance || '0 ₫'))}
              </span>
            </div>

            {/* Top up money */}
            <Button 
              icon={<img src="/svgs/icon_naptien.svg" alt="payment" width={20} height={20} />}
              className="font-medium"
              style={{ border: '1px solid #D4D4D4', borderRadius: '20px' }}
            >
              Nạp tiền
            </Button>

            {/* User Menu */}
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" className="cursor-pointer">
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
              style={{ margin: '0' }}
              onClick={handleOpenLoginModal}
            >
              Đăng nhập
            </Button>
            <Button 
              type="text" 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              style={{ margin: '0' }}
              onClick={handleOpenRegisterModal}
            >
              Đăng ký
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" style={{ margin: '0' }}>
              <Image src="/svgs/icon_download_app.svg" alt="download" width={20} height={20} className="h-5" />
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
        </div>
      </div>
    </header>
  );
};

export default Header;