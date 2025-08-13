'use client';

import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';

interface ProfileFormProps {
  initialData?: {
    fullName?: string;
    email?: string;
    phone?: string;
  };
  onUpdate?: (data: { fullName?: string; email?: string; phone?: string }) => void;
  className?: string;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  initialData = {
    fullName: 'user4499682',
    email: 'nguyenvana@gmail.com',
    phone: '0901234567'
  },
  onUpdate,
  className = ''
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: { fullName?: string; email?: string; phone?: string }) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onUpdate?.(values);
      console.log('Profile updated:', values);
    } catch (error) {
      console.error('Update failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`bg-white overflow-hidden px-4 border-b-1 border-gray-200 ${className}`}>
      <div className="overflow-hidden">
        <h3 className="text-2xl font-font-medium mb-4">
          Thông tin cá nhân
        </h3>
      </div>
      
      <div>
        <Form
          form={form}
          layout="vertical"
          initialValues={initialData}
          onFinish={handleSubmit}
          className="space-y-4"
        >
          <Form.Item
            label="Họ và tên"
            name="fullName"
            rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
          >
            <Input 
              size="middle"
              placeholder="Nhập họ và tên"
              className="rounded-md"
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email' },
              { type: 'email', message: 'Email không hợp lệ' }
            ]}
          >
            <Input 
              size="middle"
              placeholder="Nhập email"
              className="rounded-md"
            />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại' },
              { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ' }
            ]}
          >
            <Input 
              size="middle"
              placeholder="Nhập số điện thoại"
              className="rounded-md"
            />
          </Form.Item>

          <Form.Item className="mb-0 text-right">
            <Button
              type="primary"
              htmlType="submit"
              size="middle"
              loading={loading}
              className="bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 px-8 rounded-md font-medium"
            >
              CẬP NHẬT THÔNG TIN
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ProfileForm;