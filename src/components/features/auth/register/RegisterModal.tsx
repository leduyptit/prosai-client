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
  const { message } = App.useApp();
  const [formData, setFormData] = useState({
    fullName: '',
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
    if (!formData.fullName || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      const error = 'Vui lòng điền đầy đủ thông tin để đăng ký';
      setErrorMessage(error);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      const error = 'Mật khẩu xác nhận không khớp';
      setErrorMessage(error);
      return;
    }

    if (formData.password.length < 6) {
      const error = 'Mật khẩu phải có ít nhất 6 ký tự';
      setErrorMessage(error);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      const error = 'Vui lòng nhập email hợp lệ';
      setErrorMessage(error);
      return;
    }

    // Phone validation (Vietnamese phone format)
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(formData.phone)) {
      const error = 'Vui lòng nhập số điện thoại hợp lệ (10-11 chữ số)';
      setErrorMessage(error); 
      return;
    }

    setIsLoading(true);
    try {
      const registerData = {
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      } as const;

      const result = await authService.register(registerData);
      
      if (result && result.access_token && result.user) {        
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
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string }; status?: number }; message?: string };
      let errorMessage = 'Đăng ký không thành công, vui lòng thử lại';
      
      if (axiosError.response?.data?.message) {
        errorMessage = axiosError.response.data.message;
      } else if (axiosError.response?.status === 400) {
        errorMessage = 'Thông tin đăng ký không hợp lệ';
      } else if (axiosError.response?.status === 409) {
        errorMessage = 'Email này đã được đăng ký, vui lòng sử dụng email khác';
      } else if (axiosError.message) {
        errorMessage = axiosError.message;
      }
      
      setErrorMessage(errorMessage);
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
          <Image src="/images/Bg_login@2x.png" alt="Register background" fill className="object-cover z-0" />
          {/* Logo and Branding */}
          <div className="absolute top-10 left-10">
            <Image src="/svgs/logo_login.svg" alt="PROSAI Logo" width={160} height={40} className="w-40" />
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
              {/* Full Name */}
              <div>
                <Input
                  placeholder="Họ và tên"
                  prefix={<Image src="/svgs/icon_user.svg" alt="user" width={20} height={20} className="w-5" />}
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  size="large"
                  className="h-12"
                />
              </div>

              {/* Email */}
              <div>
                <Input
                  placeholder="Email"
                  prefix={<Image src="/svgs/icon_email.svg" alt="email" width={15} height={15} className="w-5" />}
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
                  prefix={<Image src="/svgs/phone-call.svg" alt="phone" width={15} height={15} className="w-5" style={{ width: '15px' }} />}
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

              {/* Confirm Password */}
              <div>
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Nhập lại mật khẩu"
                  prefix={<Image src="/svgs/icon_pw.svg" alt="confirm-password" width={20} height={20} className="w-5" />}
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
              <div className="space-y-3">
                <SocialLoginButton provider="google" mode="register" />
                <SocialLoginButton provider="facebook" mode="register" />
                <SocialLoginButton provider="zalo" mode="register" />
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
