'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card, Typography, Button, Alert } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { Loading } from '@/components/ui/feedback';

const { Title, Text } = Typography;

interface TokenProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
}

const TokenProtectedRoute: React.FC<TokenProtectedRouteProps> = ({ 
  children, 
  fallback,
  redirectTo = '/auth/signin'
}) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Show loading while checking authentication
  if (status === 'loading') {
    return fallback || (
      <Loading 
        size="large" 
        text="Loading..." 
        variant="fullscreen"
      />
    );
  }

  // If user is authenticated via NextAuth, show content
  if (status === 'authenticated' && session) {
    // Show warning for token-based authentication
    const isTokenAuth = (session as any)?.user?.provider === 'token';
    
    if (isTokenAuth) {
      return (
        <>
          <div className="bg-yellow-50 border-b border-yellow-200 p-3">
            <div className="responsive-container mx-auto px-4">
              <Alert
                message="Tạm thời đăng nhập"
                description="Bạn đang truy cập bằng token tạm thời. Để có trải nghiệm đầy đủ, vui lòng đăng nhập chính thức."
                type="warning"
                showIcon
                action={
                  <Button 
                    size="small" 
                    type="primary"
                    onClick={() => router.push('/auth/signin')}
                  >
                    Đăng nhập
                  </Button>
                }
                closable
              />
            </div>
          </div>
          {children}
        </>
      );
    }
    
    return <>{children}</>;
  }

  // If not authenticated, show login prompt
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
};

export default TokenProtectedRoute;
