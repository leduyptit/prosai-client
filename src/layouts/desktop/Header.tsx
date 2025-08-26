'use client';

import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Avatar, Badge } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { formatCurrency } from '@/utils/format';
import { LoginModal } from '@/components/features/auth/login';
import { RegisterModal } from '@/components/features/auth/register';
import { ForgotPasswordModal } from '@/components/features/auth/forgot-password';

// Favorites Dropdown Component
const FavoritesDropdown: React.FC<{
  visible: boolean;
  onClose: () => void;
}> = ({ visible, onClose }) => {
  const [activeTab, setActiveTab] = useState(0);

  if (!visible) return null;

  const favoriteItems = [
    {
      id: 1,
      icon: '/images/imgdemo_new@2x.png',
      title: 'Cần thuê căn hộ 45m2 - 3 phòng ngủ - gần các khu công nghiệp, bệ....',
      time: 'Vừa lưu xong',
      type: 'rent'
    },
    {
      id: 2,
      icon: '/images/imgdemo_new@2x.png',
      title: 'Rao bán căn hộ 60m2 - 3 phòng ngủ - gần các khu công nghiệp, bệ...',
      time: 'Lưu 16 phút trước',
      type: 'sale'
    },
    {
      id: 3,
      icon: '/images/imgdemo_new@2x.png',
      title: 'Quỹ căn nội bộ tăng đẹp - Giá niêm yết - Chiết khấu cao tại The ...',
      time: 'Lưu 1 ngày trước',
      type: 'internal'
    }
  ];

  const savedFilters = [
    {
      id: 1,
      name: 'Bộ lọc tìm kiếm 1',
      description: 'Căn hộ 2-3 phòng ngủ, giá 500-800 triệu',
      time: 'Lưu 2 ngày trước'
    },
    {
      id: 2,
      name: 'Bộ lọc tìm kiếm 2',
      description: 'Nhà riêng 4-5 phòng ngủ, giá 1-2 tỷ',
      time: 'Lưu 1 tuần trước'
    }
  ];

  return (
    <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-96">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab(0)}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            activeTab === 0 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Tin yêu thích
        </button>
        <button
          onClick={() => setActiveTab(1)}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            activeTab === 1 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Bộ lọc tìm kiếm đã lưu
        </button>
      </div>

      {/* Content */}
      <div className="max-h-96 overflow-y-auto">
        {activeTab === 0 ? (
          // Favorite Items Tab
          <div className="p-4">
            {favoriteItems.map((item) => (
              <div key={item.id} className="flex items-start space-x-3 py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex-shrink-0">
                  <img src={item.icon} alt="item" width={80} height={80} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {item.time}
                  </p>
                </div>
              </div>
            ))}
            
            {/* View All Link */}
            <div className="mt-4 pt-3 border-t border-gray-200">
              <button className="flex items-center justify-center w-full text-sm text-red-500 hover:text-red-600 font-medium">
                Xem tất cả
                <img src="/svgs/icon_arrow_right.svg" alt="arrow" width={16} height={16} className="ml-1" />
              </button>
            </div>
          </div>
        ) : (
          // Saved Filters Tab
          <div className="p-4">
            {savedFilters.map((filter) => (
              <div key={filter.id} className="flex items-start space-x-3 py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex-shrink-0">
                  <img src="/images/imgdemo_new@2x.png" alt="filter" width={80} height={80} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900">
                    {filter.name}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    {filter.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {filter.time}
                  </p>
                </div>
              </div>
            ))}
            
            {/* View All Link */}
            <div className="mt-4 pt-3 border-t border-gray-200">
              <button className="flex items-center justify-center w-full text-sm text-red-500 hover:text-red-600 font-medium">
                Xem tất cả
                <img src="/svgs/icon_arrow_right.svg" alt="arrow" width={16} height={16} className="ml-1" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Header: React.FC = () => {
  const { data: session, status } = useSession();
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
      label: 'Thông tin cá nhân',
      icon: <UserOutlined />,
    },
    {
      key: 'settings',
      label: 'Cài đặt',
      icon: <UserOutlined />,
    },
    {
      key: 'logout',
      label: 'Đăng xuất',
      icon: <UserOutlined />,
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
              <img src="/svgs/top_logo.svg" alt="Logo" className="h-8" />
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-6">
              <a href="/" className="text-gray-700 hover:text-blue-600 font-medium">
                Trang chủ
              </a>
              <a href="/search" className="text-gray-700 hover:text-blue-600 font-medium">
                Tìm kiếm
              </a>
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
                    <Badge count={5} size="small" className="absolute -top-1 right-1" />
                  </div>
                }
                style={{ margin: '0' }}
                className="text-gray-700 hover:text-red-500 text-lg mr-0 flex items-center"
                onClick={() => setIsFavoritesDropdownOpen(!isFavoritesDropdownOpen)}
              />
              
              <FavoritesDropdown
                visible={isFavoritesDropdownOpen}
                onClose={() => setIsFavoritesDropdownOpen(false)}
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
              <span className="text-base">
                Số dư: {formatCurrency(parseFloat(session?.user?.balance || '0'))}đ
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