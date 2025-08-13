'use client';

import React from 'react';
import { CrownOutlined } from '@ant-design/icons';

interface MembershipCardProps {
  membershipType?: 'basic' | 'gold' | 'premium';
  expiryDate?: string;
  className?: string;
}

const MembershipCard: React.FC<MembershipCardProps> = ({ 
  membershipType = 'gold',
  expiryDate = '31/12/2024',
  className = '' 
}) => {
  const getMembershipInfo = () => {
    switch (membershipType) {
      case 'gold':
        return {
          title: 'PROSAI GOLD',
          color: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
          badge: 'gold',
          icon: <CrownOutlined className="text-white text-lg" />
        };
      case 'premium':
        return {
          title: 'PROSAI PREMIUM',
          color: 'bg-gradient-to-r from-purple-500 to-purple-600',
          badge: 'premium',
          icon: <CrownOutlined className="text-white text-lg" />
        };
      default:
        return {
          title: 'PROSAI BASIC',
          color: 'bg-gradient-to-r from-gray-500 to-gray-600',
          badge: 'basic',
          icon: <CrownOutlined className="text-white text-lg" />
        };
    }
  };

  const membershipInfo = getMembershipInfo();
  
  const benefits = [
    'Không giới hạn lượt tin',
    'Xe nâng cao tin đăng lên đầu quãng',
    'Hiển thị điện thoại khi tìm kiếm',
    'Hỗ trợ ưu đãi khi chuyên gia'
  ];

  return (
    <div className={`${className} bg-[#F7F7F7] rounded-lg border border-gray-200 overflow-hidden`}>
      <div className="overflow-hidden">
        <h3 className="text-lg text-center font-font-medium bg-[#8D8DA1] py-4 text-white">Gói hội viên hiện tại</h3>
      </div>
      <div className="space-y-4">
        {/* Membership Badge */}
        <div className="flex justify-center">
          <img src="/images/img_prosai_gold@2x.png" alt="Membership Badge" className="w-full h-auto" />
        </div>

        {/* Expiry Date */}
        <div className="px-4">
          <span className="text-sm font-font-medium">Hạn sử dụng</span>
          <div className="font-font-medium text-gray-900 pl-4">{expiryDate}</div>
        </div>

        {/* Benefits */}
        <div className="border-t-1 border-dashed border-gray-300 pt-4 m-4">
          <div className="text-sm font-medium text-gray-700 mb-2">Quyền lợi</div>
          <ul className="space-y-2">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MembershipCard;