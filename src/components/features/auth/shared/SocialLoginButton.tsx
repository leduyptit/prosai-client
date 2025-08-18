'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import Button from '@/components/ui/buttons/Button';

interface SocialLoginButtonProps {
  provider: 'google' | 'facebook' | 'zalo';
  className?: string;
  children?: React.ReactNode;
  mode?: 'login' | 'register';
}

const providerConfig = {
  google: {
    name: 'Google',
    icon: '/svgs/icon_google.svg',
    color: 'bg-white hover:bg-gray-50',
    textColor: 'text-gray-700',
    borderColor: 'border-gray-300'
  },
  facebook: {
    name: 'Facebook',
    icon: '/svgs/social_fb.svg',
    color: 'bg-blue-600 hover:bg-blue-700',
    textColor: 'text-white',
    borderColor: 'border-blue-600'
  },
  zalo: {
    name: 'Zalo',
    icon: '/svgs/icon_zalo.svg',
    color: 'bg-blue-500 hover:bg-blue-600',
    textColor: 'text-white',
    borderColor: 'border-blue-500'
  }
};

export const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  provider,
  className = '',
  children,
  mode = 'login'
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const config = providerConfig[provider];

  const handleSocialLogin = async () => {
    try {
      setIsLoading(true);
      console.log(`🔐 Starting ${provider} social login...`);

      if (provider === 'zalo') {
        // Use NextAuth.js built-in PKCE support for Zalo
        console.log('🔐 Starting Zalo OAuth with NextAuth.js PKCE support...');
        
        const result = await signIn('zalo', {
          callbackUrl: '/',
          redirect: true
        });

        if (result?.error) {
          console.error('❌ Zalo login failed:', result.error);
          setIsLoading(false);
          alert(`${mode === 'login' ? 'Đăng nhập' : 'Đăng ký'} Zalo thất bại. Vui lòng thử lại.`);
        }
        return;
      }

      // Sử dụng NextAuth cho Google và Facebook
      const result = await signIn(provider, {
        callbackUrl: '/',
        redirect: true
      });

      if (result?.error) {
        console.error(`❌ ${provider} login failed:`, result.error);
        setIsLoading(false);
        alert(`${mode === 'login' ? 'Đăng nhập' : 'Đăng ký'} ${provider} thất bại. Vui lòng thử lại.`);
      }
    } catch (error) {
      console.error(`❌ ${provider} login error:`, error);
      setIsLoading(false);
      alert(`${mode === 'login' ? 'Đăng nhập' : 'Đăng ký'} ${provider} thất bại. Vui lòng thử lại.`);
    }
  };

  return (
    <Button
      onClick={handleSocialLogin}
      disabled={isLoading}
      variant="outline"
      className={`w-full flex items-center justify-center gap-3 px-4 py-3 ${config.color} ${config.textColor} ${config.borderColor} ${className} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <img 
          src={config.icon} 
          alt={`${config.name} icon`} 
          className="w-5 h-5"
        />
      )}
      {children || (isLoading ? 'Đang xử lý...' : `${mode === 'login' ? 'Đăng nhập' : 'Đăng ký'} bằng ${config.name}`)}
    </Button>
  );
};
