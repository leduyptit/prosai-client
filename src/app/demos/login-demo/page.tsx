'use client';

import React, { useState } from 'react';
import { LoginModal } from '@/components/features/auth';

export default function LoginDemoPage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleSwitchToRegister = () => {
    console.log('Switch to register modal');
    setIsLoginModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          PROSAI Login Modal Demo
        </h1>
        <p className="text-gray-600 mb-8">
          Click the button below to open the login modal
        </p>
        <button
          onClick={handleOpenLoginModal}
          className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-font-medium"
        >
          Mở Modal Đăng Nhập
        </button>

        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={handleCloseLoginModal}
          onSwitchToRegister={handleSwitchToRegister}
        />
      </div>
    </div>
  );
} 