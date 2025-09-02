'use client';

import React, { useState } from 'react';
import { Modal, Button, App } from 'antd';

interface UpgradeMembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmUpgrade?: (packageId: string, duration: string) => void;
  packageType?: 'silver' | 'gold';
  selectedPlan?: {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: string;
    duration: number;
    features: string[];
    image: string;
  } | null;
}

const UpgradeMembershipModal: React.FC<UpgradeMembershipModalProps> = ({
  isOpen,
  onClose,
  onConfirmUpgrade,
  packageType = 'silver',
  selectedPlan
}) => {
  const [selectedDuration, setSelectedDuration] = useState<'1' | '3' | '6'>('1');
  const { message } = App.useApp();

  const handleConfirmUpgrade = () => {
    if (!selectedPlan?.id) {
      message.error('Không có thông tin gói hội viên');
      return;
    }
    onConfirmUpgrade?.(selectedPlan.id, selectedDuration);
    onClose();
  };

  const getPackageInfo = (duration: string) => {
    if (!selectedPlan) {
      return {
        name: packageType === 'gold' ? 'Gold' : 'Silver',
        price: '0₫',
        image: packageType === 'gold' ? '/images/img_gold@2x.png' : '/images/img_nangcap_silver@2x.png'
      };
    }

    // Tính giá theo thời hạn (giá gốc * số tháng)
    const basePrice = parseFloat(selectedPlan.price);
    const months = parseInt(duration);
    const totalPrice = basePrice * months;
    
    return {
      name: selectedPlan.name,
      price: `${totalPrice.toLocaleString()}₫`,
      image: selectedPlan.image
    };
  };

  const getBenefits = () => {
    if (!selectedPlan) {
      return [
        'Không có thông tin quyền lợi'
      ];
    }
    
    return selectedPlan.features;
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={500}
      className="upgrade-membership-modal"
      centered
    >
      <div className="bg-white rounded-xl p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Nâng cấp hội viên
          </h2>
        </div>

        {/* Membership Tier Display */}
        <div className="flex items-center justify-between mb-6 p-4 rounded-lg">
          <div className="flex items-center space-x-3 w-[50%] rounded-lg overflow-hidden max-h-[87px]">
            <img src={getPackageInfo(selectedDuration).image} alt={getPackageInfo(selectedDuration).name} className="w-full h-full object-cover" />
          </div>
          <div className="text-green-500 font-bold text-2xl w-[50%] pl-8">
            {getPackageInfo(selectedDuration).price}
          </div>
        </div>

        {/* Duration Selection */}
        <div className="mb-6">
          <h3 className="text-gray-700 font-medium mb-3">
            Chọn thời hạn sử dụng
          </h3>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => setSelectedDuration('1')}
              className={`flex-1 py-2 px-4 rounded-lg border-2 transition-colors ${
                selectedDuration === '1'
                  ? 'border-green-500 text-green-500 bg-green-50'
                  : 'border-gray-300 text-gray-600 bg-gray-100 hover:bg-gray-200'
              }`}
            >
              1 Tháng
            </button>
            <button
              type="button"
              onClick={() => setSelectedDuration('3')}
              className={`flex-1 py-2 px-4 rounded-lg border-2 transition-colors ${
                selectedDuration === '3'
                  ? 'border-green-500 text-green-500 bg-green-50'
                  : 'border-gray-300 text-gray-600 bg-gray-100 hover:bg-gray-200'
              }`}
            >
              3 Tháng
            </button>
            <button
              type="button"
              onClick={() => setSelectedDuration('6')}
              className={`flex-1 py-2 px-4 rounded-lg border-2 transition-colors ${
                selectedDuration === '6'
                  ? 'border-green-500 text-green-500 bg-green-50'
                  : 'border-gray-300 text-gray-600 bg-gray-100 hover:bg-gray-200'
              }`}
            >
              6 Tháng
            </button>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-6">
          <div className="border-t border-dashed border-gray-300 pt-4">
            <h3 className="text-gray-700 font-medium mb-3">
              Quyền lợi gói hội viên {getPackageInfo(selectedDuration).name}:
            </h3>
            <ul className="space-y-2">
              {getBenefits().map((benefit, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Button */}
        <Button
          type="primary"
          onClick={handleConfirmUpgrade}
          size="large"
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-font-medium rounded-lg"
        >
          XÁC NHẬN NÂNG CẤP
        </Button>
      </div>
    </Modal>
  );
};

export default UpgradeMembershipModal; 