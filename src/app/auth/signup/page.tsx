'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card, Typography, Button } from 'antd';
import RegisterModal from '@/components/features/auth/register/RegisterModal';
import LoginModal from '@/components/features/auth/login/LoginModal';

const { Title, Text } = Typography;

export default function SignUpPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (status === 'authenticated' && session) {
      router.push('/account-overview');
    }
  }, [session, status, router]);

  const handleCloseRegister = () => {
    setIsRegisterModalOpen(false);
    router.push('/');
  };

  const handleSwitchToLogin = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const handleCloseLogin = () => {
    setIsLoginModalOpen(false);
    router.push('/');
  };

  const handleSwitchToRegister = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <Text>Đang tải...</Text>
        </div>
      </div>
    );
  }

  if (status === 'authenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <div className="text-center">
            <Title level={3}>Đã đăng nhập</Title>
            <Text>Chuyển hướng...</Text>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <div className="text-center mb-6">
          <img src="/svgs/logo_login.svg" alt="ProSai" className="h-12 mx-auto mb-4" />
          <Title level={2}>Đăng ký ProSai</Title>
          <Text className="text-gray-600">
            Tạo tài khoản để sử dụng đầy đủ tính năng
          </Text>
        </div>

        <div className="space-y-4">
          <Button 
            type="primary" 
            size="large" 
            className="w-full"
            onClick={() => setIsRegisterModalOpen(true)}
          >
            Đăng ký
          </Button>
          
          <Button 
            size="large" 
            className="w-full"
            onClick={() => setIsLoginModalOpen(true)}
          >
            Đã có tài khoản? Đăng nhập
          </Button>
        </div>
      </Card>

      {/* Modals */}
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={handleCloseRegister}
        onSwitchToLogin={handleSwitchToLogin}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={handleCloseLogin}
        onSwitchToRegister={handleSwitchToRegister}
      />
    </div>
  );
}
