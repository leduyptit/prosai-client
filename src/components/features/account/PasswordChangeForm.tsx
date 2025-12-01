'use client';

import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { authService } from '@/services/auth';
import Alert from '@/components/ui/feedback/Alert';

interface PasswordChangeFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface PasswordChangeFormProps {
  onUpdate?: (data: PasswordChangeFormData) => void;
  className?: string;
}

const PasswordChangeForm: React.FC<PasswordChangeFormProps> = ({
  onUpdate,
  className = ''
}) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    // Auto-hide success notification after 5 seconds
    if (type === 'success') {
      setTimeout(() => {
        setNotification({ type: null, message: '' });
      }, 5000);
    }
  };

  const handleSubmit = async (values: PasswordChangeFormData) => {
    console.log('Form submitted with values:', values);
    
    setLoading(true);
    setNotification({ type: null, message: '' });
    
    try {
      console.log('Calling API...');
      
      // Debug: Check if we have session
      const { getSession } = await import('next-auth/react');
      const session = await getSession();
      console.log('Current session:', session);
      
      // Call API to change password using authService
      const response = await authService.changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword
      });
      
      console.log('API response:', response);
      
      // Show success notification
      showNotification('success', 'Mật khẩu đã được thay đổi thành công!');
      
      // Call callback
      onUpdate?.(values);
      
      // Reset form
      form.resetFields();
      
      console.log('Password updated successfully:', response);
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string; error?: string }>;
      console.error('Password update failed:', axiosError);
      
      // Show error notification
      const errorMessage = axiosError.response?.data?.message || 
                          axiosError.response?.data?.error || 
                          'Có lỗi xảy ra khi thay đổi mật khẩu. Vui lòng thử lại.';
      showNotification('error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`bg-white overflow-hidden py-6 px-4 border-t-1 border-gray-200 ${className}`}>
      <div className="overflow-hidden">
        <h3 className="text-2xl font-medium mb-4">
          Đổi mật khẩu
        </h3>
      </div>
      
      {/* Notification Alert */}
      {notification.type && (
        <div className="mb-4">
          <Alert
            variant={notification.type}
            message={notification.message}
            closable
            onClose={() => setNotification({ type: null, message: '' })}
          />
        </div>
      )}
      
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
        className="space-y-4"
      >
        {/* Current Password */}
        <Form.Item
          label="Mật khẩu hiện tại"
          name="currentPassword"
          rules={[
            { required: true, message: 'Vui lòng nhập mật khẩu hiện tại' }
          ]}
        >
          <Input.Password 
            size="middle"
            placeholder="Nhập mật khẩu hiện tại"
            className="rounded-md"
            iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>

        {/* New Password */}
        <Form.Item
          label="Mật khẩu mới"
          name="newPassword"
          rules={[
            { required: true, message: 'Vui lòng nhập mật khẩu mới' },
            { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' }
          ]}
        >
          <Input.Password 
            size="middle"
            placeholder="Nhập mật khẩu mới"
            className="rounded-md"
            iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>

        {/* Confirm Password */}
        <Form.Item
          label="Xác nhận mật khẩu mới"
          name="confirmPassword"
          dependencies={['newPassword']}
          rules={[
            { required: true, message: 'Vui lòng xác nhận mật khẩu mới' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Mật khẩu xác nhận không khớp'));
              },
            }),
          ]}
        >
          <Input.Password 
            size="middle"
            placeholder="Nhập lại mật khẩu mới"
            className="rounded-md"
            iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item className="text-right mb-0">
          <Button
            type="primary"
            size="middle"
            loading={loading}
            htmlType="submit"
            className="bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 px-8 rounded-md font-medium"
          >
            CẬP NHẬT MẬT KHẨU
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PasswordChangeForm;