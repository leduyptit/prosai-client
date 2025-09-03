'use client';

import React, { useState } from 'react';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Modal from '@/components/ui/overlay/Modal';
import Input from '@/components/ui/forms/Input';
import Button from '@/components/ui/buttons/Button';
import { SocialLoginButton } from '../shared';
import { App, Divider } from 'antd';
import { requestBalanceRefresh } from '@/hooks/useUserBalance';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister?: () => void;
  onOpenForgotPassword?: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSwitchToRegister,
  onOpenForgotPassword
}) => {
  const { update } = useSession();
  const router = useRouter();
  const { message } = App.useApp();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    // Clear error message when user starts typing
    if (errorMessage) {
      setErrorMessage(null);
    }
    
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null); // Clear previous errors
    
    if (!formData.email || !formData.password) {
      console.log('❌ Validation failed - showing error message');
      const error = 'Vui lòng nhập đầy đủ email và mật khẩu để đăng nhập';
      setErrorMessage(error);
      message.error(error);
      return;
    }

    setIsLoading(true);
    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      console.log('🔍 Login result:', result);
      
      if (result?.error) {
        console.error('❌ Login failed with error:', result.error);
        
        // Simple error message that should definitely show
        let errorMessage = 'Email hoặc mật khẩu không chính xác';
        
        if (result.error === 'CredentialsSignin') {
          errorMessage = 'Email hoặc mật khẩu không chính xác';
        } else if (result.error === 'Configuration') {
          errorMessage = 'Lỗi hệ thống, vui lòng liên hệ admin';
        } else if (result.error === 'AccessDenied') {
          errorMessage = 'Tài khoản đã bị khóa hoặc chưa được xác thực';
        } else {
          errorMessage = 'Đăng nhập không thành công, vui lòng thử lại';
        }
        
        console.log('📢 Showing error message:', errorMessage);
        setErrorMessage(errorMessage);
        message.error(errorMessage);
        
      } else if (result?.ok) {
        console.log('✅ Login successful');
        message.success('Đăng nhập thành công!');
        onClose();
        
        // Force update the session to trigger header re-render
        setTimeout(async () => {
          await update();
          router.refresh(); // Refresh the current route to update server components
          
          // Trigger balance refresh after successful login
          requestBalanceRefresh();
        }, 100);
      } else {
        console.log('❓ Unexpected login result:', result);
        const error = 'Đăng nhập không thành công, vui lòng thử lại';
        setErrorMessage(error);
        message.error(error);
      }
    } catch (error: unknown) {
      console.error('❌ Login exception:', error);
      const errorMsg = 'Đã có lỗi xảy ra, vui lòng thử lại';
      setErrorMessage(errorMsg);
      message.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };



  const handleOpenForgotPassword = () => {
    if (onOpenForgotPassword) {
      onOpenForgotPassword();
    }
    onClose(); // Close the login modal
  };

  const handleOpenRegister = () => {
    if (onSwitchToRegister) {
      onSwitchToRegister();
    }
    onClose(); // Close the login modal
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={900}
      className="login-modal"
      centered
    >
      <div className="flex w-[900px] bg-white rounded-xl overflow-hidden">
        {/* Left Panel - Branding and Graphics */}
        <div className="w-1/2 relative overflow-hidden bg-[#00478E]">
          {/* Background Pattern */}
          <Image src="/images/Bg_login@2x.png" alt="Login background" fill className="object-cover z-0" />
          {/* Logo and Branding */}
          <div className="absolute top-10 left-10">
            <Image src="/svgs/logo_login.svg" alt="PROSAI Logo" width={160} height={40} className="w-40" />
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="w-1/2 bg-white p-8 flex flex-col">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Chào bạn!
            </h2>
            <h1 className="text-3xl font-bold text-gray-900">
              Đăng nhập tài khoản
            </h1>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
            {/* Error Message Display */}
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <div className="text-red-800 text-sm font-medium">
                  {errorMessage}
                </div>
              </div>
            )}
            
            <div className="space-y-4 mb-6">
              <div>
                <Input
                  placeholder="Email hoặc số điện thoại"
                  prefix={<Image src="/svgs/icon_user.svg" alt="email" width={20} height={20} className="w-5" />}
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  size="large"
                  className="h-12"
                />
              </div>
              
              <div>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mật khẩu"
                  prefix={<Image src="/svgs/icon_pw.svg" alt="password" width={20} height={20} className="w-5" />}
                  suffix={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                    </button>
                  }
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  size="large"
                  className="h-12"
                />
              </div>
            </div>

            {/* Login Button */}
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isLoading}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-font-medium mb-6 custom-button"
            >
              ĐĂNG NHẬP
            </Button>

            {/* Remember Account and Forgot Password */}
            <div className="flex items-center justify-between mb-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-sm text-gray-700">Nhớ tài khoản</span>
              </label>
                <button
                  type="button"
                  onClick={handleOpenForgotPassword}
                  className="text-sm text-red-500 hover:text-red-600 font-medium"
                >
                  Quên mật khẩu?
                </button>
            </div>

            {/* Social Login */}
            <div className="mb-6">
              <Divider style={{ borderColor: '#C3C3C3'}}>Hoặc</Divider>
              <div className="space-y-3">
                <SocialLoginButton provider="google" mode="login" />
                <SocialLoginButton provider="facebook" mode="login" />
                <SocialLoginButton provider="zalo" mode="login" />
              </div>
            </div>

            {/* Register Link */}
            <div className="mt-auto text-center">
              <p className="text-gray-600">
                Chưa có tài khoản?{' '}
                <button
                  type="button"
                  onClick={handleOpenRegister}
                  className="text-red-500 hover:text-red-600 font-medium"
                >
                  Đăng ký tại đây
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal; 