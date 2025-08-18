'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';

interface ZaloLoginButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export default function ZaloLoginButton({ className = '', children }: ZaloLoginButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleZaloLogin = async () => {
    try {
      setIsLoading(true);
      
      console.log('🔐 Starting Zalo OAuth flow via NextAuth with PKCE...');
      
      // Use NextAuth's signIn method which now handles PKCE automatically
      const result = await signIn('zalo', { 
        callbackUrl: '/',
        redirect: true 
      });
      
      if (result?.error) {
        console.error('❌ Zalo login failed:', result.error);
        alert('Đăng nhập Zalo thất bại. Vui lòng thử lại.');
      }
      
    } catch (error) {
      console.error('❌ Error starting Zalo login:', error);
      alert('Không thể khởi tạo đăng nhập Zalo. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleZaloLogin}
      disabled={isLoading}
      className={`flex items-center justify-center w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
      ) : (
        <img src="/svgs/icon_zalo.svg" alt="Zalo" className="w-5 h-5 mr-2" />
      )}
      {children || 'Đăng nhập với Zalo'}
    </button>
  );
}
