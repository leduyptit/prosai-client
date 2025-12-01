'use client';

import React, { useState } from 'react';
import { Button, Card, Typography } from 'antd';
import { UpgradeMembershipModal } from '@/components/shared/upgrade';

const { Title, Text } = Typography;

const UpgradeDemoPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<'silver' | 'gold'>('silver');

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmUpgrade = () => {
    console.log(`Upgrading to ${selectedPackage} package`);
    // Handle upgrade logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Title level={1} className="text-center mb-8">
          Upgrade Membership Modal Demo
        </Title>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Silver Package Card */}
          <Card 
            title="Silver Package" 
            className="text-center"
            extra={
              <Button 
                type="primary" 
                onClick={() => {
                  setSelectedPackage('silver');
                  handleOpenModal();
                }}
              >
                Test Silver
              </Button>
            }
          >
            <div className="space-y-3">
              <div className="text-2xl font-medium text-gray-600">99.000₫</div>
              <div className="text-sm text-gray-500">1 tháng</div>
              <ul className="text-left text-sm space-y-1">
                <li>• Đăng 30 tin/tháng</li>
                <li>• Hỗ trợ AI gợi ý nội dung</li>
                <li>• Ưu tiên SEO hiển thị</li>
              </ul>
            </div>
          </Card>

          {/* Gold Package Card */}
          <Card 
            title="Gold Package" 
            className="text-center"
            extra={
              <Button 
                type="primary" 
                onClick={() => {
                  setSelectedPackage('gold');
                  handleOpenModal();
                }}
              >
                Test Gold
              </Button>
            }
          >
            <div className="space-y-3">
              <div className="text-2xl font-medium text-yellow-600">199.000₫</div>
              <div className="text-sm text-gray-500">1 tháng</div>
              <ul className="text-left text-sm space-y-1">
                <li>• Đăng 50 tin/tháng</li>
                <li>• Hỗ trợ AI gợi ý nội dung</li>
                <li>• Ưu tiên SEO hiển thị</li>
                <li>• Hỗ trợ tư vấn 24/7</li>
                <li>• Tính năng đánh giá sao</li>
                <li>• Thống kê chi tiết</li>
              </ul>
            </div>
          </Card>
        </div>

        <Card className="mb-6">
          <Title level={3}>Instructions:</Title>
          <div className="space-y-2">
            <Text>1. Click on either &quot;Test Silver&quot; or &quot;Test Gold&quot; button to open the modal</Text>
            <br />
            <Text>2. The modal will display different images and prices based on the selected package</Text>
            <br />
            <Text>3. Try changing the duration (1, 3, or 6 months) to see dynamic pricing</Text>
            <br />
            <Text>4. Benefits list will change based on the package type</Text>
          </div>
        </Card>

        <Card>
          <Title level={3}>Package Details:</Title>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Title level={4}>Silver Package</Title>
              <ul className="space-y-1">
                <li>• 1 tháng: 99.000₫</li>
                <li>• 3 tháng: 279.000₫</li>
                <li>• 6 tháng: 539.000₫</li>
                <li>• Image: img_nangcap_silver@2x.png</li>
              </ul>
            </div>
            <div>
              <Title level={4}>Gold Package</Title>
              <ul className="space-y-1">
                <li>• 1 tháng: 199.000₫</li>
                <li>• 3 tháng: 559.000₫</li>
                <li>• 6 tháng: 1.079.000₫</li>
                <li>• Image: img_nangcap_gold@2x.png</li>
              </ul>
            </div>
          </div>
        </Card>

        <UpgradeMembershipModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirmUpgrade={handleConfirmUpgrade}
          packageType={selectedPackage}
        />
      </div>
    </div>
  );
};

export default UpgradeDemoPage; 