'use client';

import React, { useState } from 'react';
import Modal from '@/components/ui/overlay/Modal';
import Input from '@/components/ui/forms/Input';
import Button from '@/components/ui/buttons/Button';

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
  const [formData, setFormData] = useState({
    email: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle forgot password logic here
    console.log('Forgot password attempt:', formData);
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
            <div className="space-y-4 mb-6">
              <div>
                <Input
                  placeholder="Nhập email hoặc số điện thoại"
                  prefix={<img src="/svgs/icon_user.svg" alt="email" className="w-5" />}
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  size="large"
                  className="h-12"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-font-mediumium mb-6 custom-button"
            >
              Gửi
            </Button>

            {/* Back to Login */}
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
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default ForgotPasswordModal;
