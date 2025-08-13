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
import { authService } from '@/services/auth';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin?: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onClose,
  onSwitchToLogin
}) => {
  const { update } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    
    // Validation
      if (!formData.fullname || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      const error = 'Vui lòng điền đầy đủ thông tin để đăng ký';
      setErrorMessage(error);
      message.error(error);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      const error = 'Mật khẩu xác nhận không khớp';
      setErrorMessage(error);
      message.error(error);
      return;
    }

    if (formData.password.length < 6) {
      const error = 'Mật khẩu phải có ít nhất 6 ký tự';
      setErrorMessage(error);
      message.error(error);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      const error = 'Vui lòng nhập email hợp lệ';
      setErrorMessage(error);
      message.error(error);
      return;
    }

    // Phone validation (Vietnamese phone format)
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(formData.phone)) {
      const error = 'Vui lòng nhập số điện thoại hợp lệ (10-11 chữ số)';
      setErrorMessage(error);
      message.error(error);
      return;
    }

    setIsLoading(true);
    try {
      const registerData = {
        fullname: formData.fullname,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      };

      const result = await authService.register(registerData);
      
      if (result.success) {
        message.success('Đăng ký thành công! Đang đăng nhập...');
        
        // Auto login after successful registration
        const loginResult = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (loginResult?.ok) {
          message.success('Đăng nhập thành công!');
          onClose();
          
          // Force update the session to trigger header re-render
          setTimeout(async () => {
            await update();
            router.refresh(); // Refresh the current route to update server components
          }, 100);
        } else {
          message.info('Đăng ký thành công! Vui lòng đăng nhập để tiếp tục.');
          onClose();
          if (onSwitchToLogin) {
            onSwitchToLogin();
          }
        }
      }
    } catch (error: any) {
      console.error('❌ Registration failed:', error);
      
      let errorMessage = 'Đăng ký không thành công, vui lòng thử lại';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.status === 400) {
        errorMessage = 'Thông tin đăng ký không hợp lệ';
      } else if (error.response?.status === 409) {
        errorMessage = 'Email này đã được đăng ký, vui lòng sử dụng email khác';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setErrorMessage(errorMessage);
      message.error(errorMessage);
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
        
        let errorMessage = 'Đăng ký không thành công';
        let description = '';
        
        switch (result.error) {
          case 'OAuthSignin':
            errorMessage = 'Lỗi đăng ký mạng xã hội';
            description = `Không thể khởi tạo đăng ký với ${provider}. Vui lòng thử lại.`;
            break;
          case 'OAuthCallback':
            errorMessage = 'Lỗi xử lý đăng ký';
            description = `Có lỗi khi xử lý đăng ký với ${provider}. Vui lòng thử lại.`;
            break;
          case 'OAuthCreateAccount':
            errorMessage = 'Không thể tạo tài khoản';
            description = 'Email có thể đã được sử dụng với phương thức đăng ký khác.';
            break;
          case 'OAuthAccountNotLinked':
            errorMessage = 'Tài khoản chưa được liên kết';
            description = 'Email này đã được đăng ký với phương thức khác. Vui lòng đăng nhập bằng email/mật khẩu.';
            break;
          default:
            errorMessage = 'Đăng ký không thành công';
            description = `Đã có lỗi xảy ra khi đăng ký với ${provider}. Vui lòng thử lại sau.`;
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
          content: `Đăng ký với ${provider} thành công!`,
          duration: 2,
        });
      }
    } catch (error: any) {
      console.error('❌ Social login exception:', error);
      
      message.error({
        content: (
          <div>
            <div className="font-medium">Đăng ký không thành công</div>
            <div className="text-sm text-gray-600 mt-1">
              Không thể đăng ký với {provider}. Vui lòng kiểm tra kết nối mạng và thử lại.
            </div>
          </div>
        ),
        duration: 5,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwitchToLogin = () => {
    if (onSwitchToLogin) {
      onSwitchToLogin();
    }
    onClose(); // Close the register modal
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={900}
      className="register-modal"
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

        {/* Right Panel - Registration Form */}
        <div className="w-1/2 bg-white p-8 flex flex-col">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Chào bạn!
            </h2>
            <h1 className="text-3xl font-bold text-gray-900">
              Đăng ký tài khoản mới
            </h1>
          </div>

          {/* Registration Form */}
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
              {/* First Name */}
              <div>
                <Input
                  placeholder="Họ và tên"
                  prefix={<img src="/svgs/icon_user.svg" alt="user" className="w-5" />}
                  value={formData.fullname}
                  onChange={(e) => handleInputChange('fullname', e.target.value)}
                  size="large"
                  className="h-12"
                />
              </div>

              {/* Email */}
              <div>
                <Input
                  placeholder="Email"
                  prefix={<img src="/svgs/icon_email.svg" alt="email" className="w-5" />}
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  size="large"
                  className="h-12"
                />
              </div>

              {/* Phone */}
              <div>
                <Input
                  placeholder="Số điện thoại"
                  prefix={<img src="/svgs/icon_email.svg" alt="phone" className="w-5" />}
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  size="large"
                  className="h-12"
                />
              </div>
              
              {/* Password */}
              <div>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mật khẩu"
                  prefix={<img src="/svgs/icon_pw.svg" alt="password" className="w-5" />}
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

              {/* Confirm Password */}
              <div>
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Nhập lại mật khẩu"
                  prefix={<img src="/svgs/icon_pw.svg" alt="confirm-password" className="w-5" />}
                  suffix={
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                    </button>
                  }
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  size="large"
                  className="h-12"
                />
              </div>
            </div>

            {/* Register Button */}
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isLoading}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-font-medium mb-6 custom-button"
            >
              ĐĂNG KÝ
            </Button>

            {/* Social Registration */}
            <div className="mb-6">
              <Divider style={{ borderColor: '#C3C3C3'}}>Hoặc đăng ký bằng</Divider>
              <div className="flex space-x-3">
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

            {/* Login Link */}
            <div className="mt-auto text-center">
              <p className="text-gray-600">
                Đã có tài khoản?{' '}
                <button
                  type="button"
                  onClick={handleSwitchToLogin}
                  className="text-red-500 hover:text-red-600 font-medium"
                >
                  Đăng nhập tại đây
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default RegisterModal;
