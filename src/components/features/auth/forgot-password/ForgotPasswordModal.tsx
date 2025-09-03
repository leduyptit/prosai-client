'use client';

import React, { useState } from 'react';
import Modal from '@/components/ui/overlay/Modal';
import Input from '@/components/ui/forms/Input';
import Button from '@/components/ui/buttons/Button';
import { App } from 'antd';
import { authService } from '@/services/auth';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToLogin?: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose,
  onBackToLogin
}) => {
  const { message } = App.useApp();
  const [formData, setFormData] = useState({
    email: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Reset form state when modal opens/closes
  React.useEffect(() => {
    if (!isOpen) {
      setFormData({ email: '' });
      setErrorMessage(null);
      setIsSuccess(false);
      setIsLoading(false);
    }
  }, [isOpen]);

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
    setErrorMessage(null);
    
    // Validation
    if (!formData.email) {
      const error = 'Vui lòng nhập email để khôi phục mật khẩu';
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

    setIsLoading(true);
    try {
      const result = await authService.forgotPassword({ email: formData.email });
      
      // Check for success (201 Created or success: true)
      if (result && (result.success || result.statusCode === 201)) {
        setIsSuccess(true);
        message.success('Gửi thành công! Vui lòng kiểm tra email để lấy lại mật khẩu.');
      } else {
        const error = 'Không thể gửi email khôi phục mật khẩu, vui lòng thử lại';
        setErrorMessage(error);
        message.error(error);
      }
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string }; status?: number }; message?: string };
      let errorMessage = 'Không thể gửi email khôi phục mật khẩu, vui lòng thử lại';
      
      if (axiosError.response?.data?.message) {
        errorMessage = axiosError.response.data.message;
      } else if (axiosError.response?.status === 404) {
        errorMessage = 'Email không tồn tại trong hệ thống';
      } else if (axiosError.response?.status === 400) {
        errorMessage = 'Email không hợp lệ';
      } else if (axiosError.message) {
        errorMessage = axiosError.message;
      }
      
      setErrorMessage(errorMessage);
      message.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={900}
      className="forgot-password-modal"
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

        {/* Right Panel - Forgot Password Form */}
         <div className="w-1/2 bg-white p-8 flex flex-col">
           {/* Header with Navigation */}
           <div className="flex items-center justify-between mb-16 mt-[-10px]">
             <button
               type="button"
               onClick={onBackToLogin}
               className="w-8 h-8 flex items-center justify-center hover:bg-red-50 transition-colors"
             >
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
             </button>
           </div>

           {/* Title */}
           <div className="mb-8 text-left">
             <h1 className="text-2xl font-bold text-gray-900">
               Khôi phục lại mật khẩu
             </h1>
           </div>

          {/* Forgot Password Form */}
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
            {isSuccess ? (
              /* Success State */
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Email đã được gửi!
                </h3>
                <p className="text-gray-600 mb-6">
                  Chúng tôi đã gửi link khôi phục mật khẩu đến email <strong>{formData.email}</strong>. 
                  Vui lòng kiểm tra hộp thư và làm theo hướng dẫn.
                </p>
                <Button
                  type="primary"
                  onClick={onBackToLogin}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                >
                  Quay lại đăng nhập
                </Button>
              </div>
            ) : (
              /* Form State */
              <>
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
                      placeholder="Nhập email của bạn"
                      prefix={<img src="/svgs/icon_email.svg" alt="email" className="w-5" />}
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      size="large"
                      className="h-12"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  loading={isLoading}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium mb-6 custom-button"
                >
                  {isLoading ? 'Đang gửi...' : 'Gửi'}
                </Button>
              </>
            )}

            {/* Back to Login - Only show when not in success state */}
            {!isSuccess && (
              <div className="mt-auto text-center">
                <p className="text-gray-600">
                  Nhớ mật khẩu?{' '}
                  <button
                    type="button"
                    onClick={onBackToLogin}
                    className="text-red-500 hover:text-red-600 font-medium"
                  >
                    Đăng nhập tại đây
                  </button>
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default ForgotPasswordModal;
