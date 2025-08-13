'use client';

import React from 'react';
// Removed unused CheckOutlined import
import { Button } from 'antd';

interface MembershipPlanCardProps {
  planType: 'basic' | 'silver' | 'gold';
  price: string;
  features: string[];
  isActive?: boolean;
  onUpgrade?: () => void;
  className?: string;
  image: string;
}

const MembershipPlanCard: React.FC<MembershipPlanCardProps> = ({
  planType,
  price,
  features,
  isActive = false,
  onUpgrade,
  className = '',
  image
}) => {
  const getPlanInfo = () => {
    switch (planType) {
      case 'basic':
        return {
          title: 'Basic',
          bgColor: 'bg-gradient-to-br from-red-800 to-red-900',
          color: 'text-[#8D8DA1]'
        };
      case 'silver':
        return {
          title: 'Silver',
          bgColor: 'bg-gradient-to-br from-blue-800 to-blue-900',
          color: 'text-[#00BE49]'
        };
      case 'gold':
        return {
          title: 'Gold',
          bgColor: 'bg-gradient-to-br from-yellow-600 to-yellow-700',
          color: 'text-[#00BE49]'
        };
      default:
        return {
          title: 'Basic',
          bgColor: 'bg-gradient-to-br from-red-800 to-red-900',
          color: 'text-[#8D8DA1]'
        };
    }
  };

  const planInfo = getPlanInfo();

  return (
    <div className={`rounded-lg shadow-md border border-gray-200 overflow-hidden bg-[#F7F7F7] ${className}`}>
      {/* Header with icon and title */}
      <div className={`text-center relative max-h-[80px] overflow-hidden`}>
        <img src={image} alt={planInfo.title} className="w-full h-auto" />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Price */}
        <div className="mb-4">
          <div className={`text-xl font-font-medium ${planInfo.color}`}>{price}</div>
        </div>

        {/* Features */}
        <div className="mb-6 border-t-1 border-dashed border-gray-200 pt-4">
          <div className="text-sm font-medium text-gray-700 mb-3">Quyền lợi:</div>
          <ul className="space-y-2 ">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Button */}
        <div className="text-center">
          {isActive ? (
            <Button 
              disabled 
              className="w-full bg-gray-300 text-gray-600 border-gray-300"
            >
              Đang sử dụng
            </Button>
          ) : (
            <Button 
              type="primary" 
              className="w-full bg-green-500 hover:bg-green-600 border-green-500 hover:border-green-600"
              onClick={onUpgrade}
            >
              Nâng cấp
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MembershipPlanCard;