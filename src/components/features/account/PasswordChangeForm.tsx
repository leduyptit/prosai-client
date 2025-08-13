'use client';

import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

interface PasswordChangeFormProps {
  onUpdate?: (data: any) => void;
  className?: string;
}

const PasswordChangeForm: React.FC<PasswordChangeFormProps> = ({
  onUpdate,
  className = ''
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onUpdate?.(values);
      console.log('Password updated successfully');
      form.resetFields();
    } catch (error) {
      console.error('Password update failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`bg-white overflow-hidden px-4 ${className}`}>
      <div className="overflow-hidden">
        <h3 className="text-2xl font-font-mediumium mb-4">
          Đổi mật khẩu
        </h3>
      </div>
      
      <div>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="space-y-4"
        >
          <Form.Item
            label="Mật khẩu hiện tại"
            name="currentPassword"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại' }]}
          >
            <Input.Password 
              size="middle"
              placeholder="Nhập mật khẩu hiện tại"
              className="rounded-md"
              iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>

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

          <Form.Item className="mb-0 text-right">
            <Button
              type="primary"
              htmlType="submit"
              size="middle"
              loading={loading}
              className="bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 px-8 rounded-md font-medium"
            >
              CẬP NHẬT MẬT KHẨU
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default PasswordChangeForm;