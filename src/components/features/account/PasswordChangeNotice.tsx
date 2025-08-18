import React from 'react';
import { Card, Alert } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

interface PasswordChangeNoticeProps {
  provider?: string;
  className?: string;
}

const PasswordChangeNotice: React.FC<PasswordChangeNoticeProps> = ({ 
  provider, 
  className = '' 
}) => {
  const getProviderName = (provider?: string) => {
    switch (provider) {
      case 'google':
        return 'Google';
      case 'facebook':
        return 'Facebook';
      case 'zalo':
        return 'Zalo';
      default:
        return 'mạng xã hội';
    }
  };

  return (
    <div className={`bg-white overflow-hidden py-6 px-4 border-t-1 border-gray-200 ${className}`}>
      <div className="overflow-hidden">
        <h3 className="text-2xl font-medium mb-4">
          Đổi mật khẩu
        </h3>
      </div>
      
      <Card className="border-l-4 border-l-blue-500">
        <Alert
          message="Không thể đổi mật khẩu"
          description={
            <div className="mt-2">
              <p>
                Tài khoản của bạn được đăng nhập qua {getProviderName(provider)}. 
                Để thay đổi mật khẩu, vui lòng:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Đăng xuất khỏi tài khoản hiện tại</li>
                <li>Đăng ký tài khoản mới bằng email và mật khẩu</li>
                <li>Hoặc liên hệ hỗ trợ để được hướng dẫn</li>
              </ul>
            </div>
          }
          type="info"
          showIcon
          icon={<InfoCircleOutlined />}
          className="bg-blue-50 border-blue-200"
        />
      </Card>
    </div>
  );
};

export default PasswordChangeNotice;
