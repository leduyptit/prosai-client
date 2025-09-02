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
  disabled?: boolean;
}

const MembershipPlanCard: React.FC<MembershipPlanCardProps> = ({
  planType,
  price,
  features,
  isActive = false,
  onUpgrade,
  className = '',
  image,
  disabled = false
}) => {
  const getPlanInfo = () => {
    switch (planType) {
      case 'basic':
        return {
          title: 'Basic',
          color: 'text-[#8D8DA1]'
        };
      case 'silver':
        return {
          title: 'Silver',
          color: 'text-[#00BE49]'
        };
      case 'gold':
        return {
          title: 'Gold',
          color: 'text-[#00BE49]'
        };
      default:
        return {
          title: 'Basic',
          color: 'text-[#8D8DA1]'
        };
    }
  };

  const planInfo = getPlanInfo();

  return (
    <div className={`rounded-lg shadow-md border border-gray-200 overflow-hidden bg-[#F7F7F7] flex flex-col h-full ${className}`}>
      {/* Header with icon and title */}
      <div className={`text-center relative max-h-[100px] overflow-hidden`}>
        <img src={image} alt={planInfo.title} className="w-full h-auto" />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Price */}
        <div className="mb-4">
          <div className={`text-xl font-font-medium ${planInfo.color}`}>{price}</div>
        </div>

        {/* Features */}
        <div className="mb-6 border-t-1 border-dashed border-gray-200 pt-4 flex-grow">
          <div className="text-sm font-medium text-gray-700 mb-3">Quyền lợi:</div>
          <ul className={`space-y-2 ${(planInfo.title === 'Basic') ? 'basic-hidden' : ''}`}>
            {features.map((feature, index) => (
              <li key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Button */}
        <div className="text-center mt-auto">
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
              disabled={disabled}
            >
              {disabled ? 'Đang sử dụng gói cao hơn' : 'Nâng cấp'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MembershipPlanCard;