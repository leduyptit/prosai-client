'use client';

import React from 'react';
import { Button, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import PhoneButton from '@/components/ui/buttons/PhoneButton';

interface ContactInfoData {
  name: string;
  avatar?: string;
  phone: string;
  isAgent?: boolean;
}

interface ContactSidebarProps {
  contactInfo?: ContactInfoData;
  propertyId?: string;
  className?: string;
}

const ContactSidebar: React.FC<ContactSidebarProps> = ({
  contactInfo = {
    name: 'Nguyễn Văn A',
    phone: '0901234567',
    isAgent: true
  },
  propertyId = '1',
  className = ''
}) => {
  const handleCall = () => {
    console.log('Calling:', contactInfo.phone);
    window.open(`tel:${contactInfo.phone}`, '_self');
  };

  const handleMessage = () => {
    console.log('Messaging:', contactInfo.name);
    // Open messaging interface
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-50 shadow-md ${className}`}>
      {/* Contact Info */}
      <div className="flex items-center gap-3 mb-6 p-6 border-b border-gray-50">
        {contactInfo.avatar ? (<Avatar 
          size={48} 
          src={contactInfo.avatar} 
          icon={<UserOutlined />}
          className="border-2 border-blue-100"
          style={{ backgroundColor: '#3b82f6' }}
        />) : (<Avatar 
            size={48} 
            icon={<UserOutlined />}
            className="border-2 border-gray-200"
            style={{ backgroundColor: '#f3f4f6' }}
          />
        )}
        <div className="flex-1">
          <h3 className="text-base font-font-medium text-gray-900 mb-1">
            {contactInfo.name}
          </h3>
          {contactInfo.isAgent && (
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              </span>
              <span className="text-sm text-[#B76B6B]">
                Prosai Basic
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="px-6 pb-6">
        {/* Action Buttons */}
        <div className="space-y-3">
          <PhoneButton
              phoneNumber={contactInfo.phone || ''}
              className="w-full h-12"
          />

          <Button
            size="large"
            icon={<img src="/svgs/icon_zalo.svg" alt="Zalo" className="w-6 h-6" />}
            onClick={handleMessage}
            className="w-full h-12 text-base font-font-medium border-blue-500 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg"
          >
            Chat qua Zalo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactSidebar;