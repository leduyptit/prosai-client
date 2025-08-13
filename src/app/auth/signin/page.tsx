'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, Typography, Button } from 'antd';
import LoginModal from '@/components/features/auth/login/LoginModal';
import RegisterModal from '@/components/features/auth/register/RegisterModal';
import ForgotPasswordModal from '@/components/features/auth/forgot-password/ForgotPasswordModal';

const { Title, Text } = Typography;

function SignInContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/account-overview';

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(true);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (status === 'authenticated' && session) {
      router.push(callbackUrl);
    }
  }, [session, status, router, callbackUrl]);

  const handleCloseLogin = () => {
    setIsLoginModalOpen(false);
    router.push('/');
  };

  const handleSwitchToRegister = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const handleSwitchToLogin = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const handleOpenForgotPassword = () => {
    setIsLoginModalOpen(false);
    setIsForgotPasswordModalOpen(true);
  };

  const handleCloseForgotPassword = () => {
    setIsForgotPasswordModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const handleCloseRegister = () => {
    setIsRegisterModalOpen(false);
    router.push('/');
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
          <Title level={2}>Đăng nhập vào ProSai</Title>
          <Text className="text-gray-600">
            Bạn cần đăng nhập để truy cập trang này
          </Text>
        </div>

        <div className="space-y-4">
          <Button 
            type="primary" 
            size="large" 
            className="w-full"
            onClick={() => setIsLoginModalOpen(true)}
          >
            Đăng nhập
          </Button>
          
          <Button 
            size="large" 
            className="w-full"
            onClick={() => setIsRegisterModalOpen(true)}
          >
            Đăng ký tài khoản mới
          </Button>
        </div>
      </Card>

      {/* Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={handleCloseLogin}
        onSwitchToRegister={handleSwitchToRegister}
        onOpenForgotPassword={handleOpenForgotPassword}
      />

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={handleCloseRegister}
        onSwitchToLogin={handleSwitchToLogin}
      />

      <ForgotPasswordModal
        isOpen={isForgotPasswordModalOpen}
        onClose={handleCloseForgotPassword}
      />
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInContent />
    </Suspense>
  );
}
