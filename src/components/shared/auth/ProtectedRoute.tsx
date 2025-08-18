'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card, Typography, Button } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { Loading } from '@/components/ui/feedback';

const { Title, Text } = Typography;

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  fallback,
  redirectTo = '/auth/signin'
}) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return fallback || (
      <Loading 
        size="large" 
        text="Loading..." 
        variant="fullscreen"
      />
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <div className="mb-6">
            <LockOutlined className="text-4xl text-gray-400 mb-4" />
            <Title level={3}>Yêu cầu đăng nhập</Title>
            <Text className="text-gray-600">
              Bạn cần đăng nhập để truy cập trang này
            </Text>
          </div>
          
          <div className="space-y-3">
            <Button 
              type="primary" 
              size="large" 
              className="w-full"
              onClick={() => router.push(`${redirectTo}?callbackUrl=${encodeURIComponent(window.location.pathname)}`)}
            >
              Đăng nhập ngay
            </Button>
            
            <Button 
              size="large" 
              className="w-full"
              onClick={() => router.push('/auth/signup')}
            >
              Đăng ký tài khoản mới
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (status === 'authenticated' && session) {
    return <>{children}</>;
  }

  return null;
};

export default ProtectedRoute;
