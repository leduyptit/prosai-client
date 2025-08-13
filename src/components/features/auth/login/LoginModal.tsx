'use client';

import React, { useState } from 'react';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Modal from '@/components/ui/overlay/Modal';
import Input from '@/components/ui/forms/Input';
import Button from '@/components/ui/buttons/Button';
import SocialLoginButton from '../shared/SocialLoginButton';
import { Divider, message } from 'antd';

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
        }, 100);
      } else {
        console.log('❓ Unexpected login result:', result);
        const error = 'Đăng nhập không thành công, vui lòng thử lại';
        setErrorMessage(error);
        message.error(error);
      }
    } catch (error: any) {
      console.error('❌ Login exception:', error);
      const errorMsg = 'Đã có lỗi xảy ra, vui lòng thử lại';
      setErrorMessage(errorMsg);
      message.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true);
    try {
      const result = await signIn(provider, {
        callbackUrl: '/account-overview',
        redirect: false,
      });
      
      if (result?.error) {
        console.error('❌ Social login failed:', result.error);
        
        let errorMessage = 'Đăng nhập không thành công';
        let description = '';
        
        switch (result.error) {
          case 'OAuthSignin':
            errorMessage = 'Lỗi đăng nhập mạng xã hội';
            description = `Không thể khởi tạo đăng nhập với ${provider}. Vui lòng thử lại.`;
            break;
          case 'OAuthCallback':
            errorMessage = 'Lỗi xử lý đăng nhập';
            description = `Có lỗi khi xử lý đăng nhập với ${provider}. Vui lòng thử lại.`;
            break;
          case 'OAuthCreateAccount':
            errorMessage = 'Không thể tạo tài khoản';
            description = 'Email có thể đã được sử dụng với phương thức đăng nhập khác.';
            break;
          case 'OAuthAccountNotLinked':
            errorMessage = 'Tài khoản chưa được liên kết';
            description = 'Email này đã được đăng ký với phương thức khác. Vui lòng đăng nhập bằng email/mật khẩu.';
            break;
          default:
            errorMessage = 'Đăng nhập không thành công';
            description = `Đã có lỗi xảy ra khi đăng nhập với ${provider}. Vui lòng thử lại sau.`;
        }
        
        message.error({
          content: (
            <div>
              <div className="font-medium">{errorMessage}</div>
              <div className="text-sm text-gray-600 mt-1">{description}</div>
            </div>
          ),
          duration: 6,
        });
      } else if (result?.url) {
        // Redirect will happen automatically
        message.success({
          content: `Đăng nhập với ${provider} thành công!`,
          duration: 2,
        });
      }
    } catch (error: any) {
      console.error('❌ Social login exception:', error);
      
      message.error({
        content: (
          <div>
            <div className="font-medium">Đăng nhập không thành công</div>
            <div className="text-sm text-gray-600 mt-1">
              Không thể đăng nhập với {provider}. Vui lòng kiểm tra kết nối mạng và thử lại.
            </div>
          </div>
        ),
        duration: 5,
      });
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
          <img src="/images/Bg_login@2x.png" alt="bg" className="w-full h-full z-0" />
          {/* Logo and Branding */}
          <div className="absolute top-10 left-10">
            <img src="/svgs/logo_login.svg" alt="logo" className="w-40" />
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
                  prefix={<img src="/svgs/icon_user.svg" alt="email" className="w-5" />}
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
                  prefix={<img src="/svgs/icon_pw.svg" alt="email" className="w-5" />}
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
                <SocialLoginButton
                  provider="google"
                  onClick={() => handleSocialLogin('google')}
                />
                <SocialLoginButton
                  provider="facebook"
                  onClick={() => handleSocialLogin('facebook')}
                />
                <SocialLoginButton
                  provider="zalo"
                  onClick={() => handleSocialLogin('zalo')}
                />
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