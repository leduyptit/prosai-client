'use client';

import React from 'react';
import { MailOutlined, GlobalOutlined } from '@ant-design/icons';
import PhoneButton from '@/components/ui/buttons/PhoneButton';

interface ContactInfoProps {
  contactInfo?: {
    name: string;
    phone: string;
    email?: string;
    website?: string;
  };
  propertyId?: string;
  className?: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({
  contactInfo = {
    name: 'Nguyễn Văn A',
    phone: '0962 560 xxx',
    email: 'info@prosai.vn',
    website: 'prosai.vn',
  },
  className = ''
}) => {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 ${className}`}>
      <h3 className="text-lg font-font-medium text-gray-900 mb-4">Thông tin liên hệ</h3>
      
      {/* Contact Person */}
      <div className="mb-5 flex items-center gap-2">
        <div className="text-sm text-gray-500">Họ tên:</div>
        <div className="font-medium text-gray-900">{contactInfo.name}</div>
      </div>

      {/* Phone Number with Call Button */}
      <div className="mb-5 flex items-center gap-2">
        <div className="text-sm text-gray-500">Số điện thoại:</div>
        <div className="flex items-center gap-2">
          <PhoneButton
            phoneNumber={contactInfo.phone || ''}
            className="w-full"
          />
        </div>
      </div>

      {/* Email */}
      {contactInfo.email && (
        <div className="mb-5 flex items-center gap-2">
          <div className="text-sm text-gray-500">Email:</div>
          <a 
            href={`mailto:${contactInfo.email}`}
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
          >
            <MailOutlined className="text-xs" />
            {contactInfo.email}
          </a>
        </div>
      )}

      {/* Website */}
      {contactInfo.website && (
        <div className="mb-5 flex items-center gap-2">
          <div className="text-sm text-gray-500">Website:</div>
          <a 
            href={`https://${contactInfo.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
          >
            <GlobalOutlined className="text-xs" />
            {contactInfo.website}
          </a>
        </div>
      )}

      {/* Warning Notice */}
      <div className="bg-orange-50 border border-orange-200 rounded-md p-3">
        <div className="text-orange-800 font-medium text-sm mb-1">Lưu ý</div>
        <div className="text-orange-700 text-xs leading-relaxed">
          Thông tin đăng tải sẽ chỉ được tồn tại phạm vi cung cấp. Vui lòng kiểm tra pháp lý và thông tin thực tế trước khi giao dịch.
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;