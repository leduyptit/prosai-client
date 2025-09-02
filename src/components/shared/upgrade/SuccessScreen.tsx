'use client';

import React from 'react';
import { Button } from 'antd';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/navigation';
import { APP_CONFIG } from '@/utils/env';

interface SuccessScreenProps {
  packageName: string;
  expiryDate?: string;
  countMonth?: number;
  onBackToAccount?: () => void;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({
  packageName,
  expiryDate,
  countMonth,
  onBackToAccount
}) => {
  const handleBackToAccount = () => {
    if (onBackToAccount) {
      onBackToAccount();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 p-3">
        <div className="responsive-container mx-auto px-4">
          <Breadcrumb
            separator=">"
            className="text-sm"
            items={[
              {
                title: (
                  <Link href={APP_CONFIG.homeUrl} className="text-gray-600 hover:text-blue-600">
                    Trang chủ
                  </Link>
                ),
              },
              {
                title: (
                  <Link href="/account-overview" className="text-gray-600 hover:text-blue-600">
                    Tổng quan tài khoản
                  </Link>
                ),
              },
              {
                title: <span className="text-gray-900">Gói hội viên</span>,
              },
            ]}
          />
        </div>
      </div>

      {/* Success Content */}
      <div className="responsive-container mx-auto px-4 py-30">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="icon-success">
            <img src="/svgs/Icon_check.svg" alt="Success" className="w-30 h-30 mx-auto" />
          </div>

          {/* Success Message */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">
              Thanh toán thành công!
            </h2>
            <p className="text-base mb-2">
              Cảm ơn bạn đã nâng cấp gói hội viên{countMonth ? ` ${countMonth} tháng` : ''}.
            </p>
            {expiryDate && (
              <p className="text-base">
                Gói {packageName} đã được kích hoạt và có hiệu lực đến {expiryDate}.
              </p>
            )}
          </div>

          {/* Action Button */}
          <div className="mb-8">
            <Button
              type="primary"
              size="large"
              className="h-14 px-8 text-lg font-medium bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700"
              onClick={handleBackToAccount}
            >
              QUAY VỀ TRANG TÀI KHOẢN
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessScreen;
