'use client';

import React from 'react';
import { AccountSidebar, MembershipPlanCard } from '@/components/features/account';
import { Breadcrumb } from '@/components/ui/navigation';
import { ProtectedRoute } from '@/components/shared';
import Link from 'next/link';
import { APP_CONFIG } from '@/utils/env';

const MembershipPage: React.FC = () => {
  const membershipPlans = [
    {
      planType: 'basic' as const,
      price: 'Miễn Phí',
      features: [
        'Đăng tối đa 5 tin/tháng',
        'Xem tin của người khác',
        'Không có hỗ trợ'
      ],
      image: '/images/img_basic@2x.png',
      isActive: true
    },
    {
      planType: 'silver' as const,
      price: '99.000đ / tháng',
      features: [
        'Đăng 30 tin/tháng',
        'Hỗ trợ AI gợi ý nội dung',
        'Ưu tiên SEO hiển thị'
      ],
      image: '/images/img_silver@2x.png',
      isActive: false
    },
    {
      planType: 'gold' as const,
      price: '199.000đ / tháng',
      features: [
        'Không giới hạn tin',
        'AI nâng cao và phân tích hệu quả',
        'Hiển thị đầu kết quả tìm kiếm',
        'Hỗ trợ cá nhân từ chuyên gia'
      ],
      image: '/images/img_gold@2x.png',
      isActive: false
    }
  ];

  const handleUpgrade = (planType: string) => {
    console.log(`Upgrading to ${planType}`);
    // Handle upgrade logic here
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 p-3">
        <div className="responsive-container mx-auto px-4">
          <Breadcrumb
            separator=">"
            className="text-sm"
            items={[
              {
                title: <Link href={APP_CONFIG.homeUrl} className="text-gray-600 hover:text-blue-600">Trang chủ</Link>,
              },
              {
                title: <Link href="/account-overview" className="text-gray-600 hover:text-blue-600">Tổng quan tài khoản</Link>,
              },
              {
                title: <span className="text-gray-900">Gói hội viên</span>,
              },
            ]}
          />
        </div>
      </div>

      <div className="responsive-container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <AccountSidebar activeKey="membership" />
          </div>

          {/* Main Content */}
          <div className="col-span-12 lg:col-span-9">
            <div className="space-y-6">
              {/* Page Title */}
              <div className="text-center">
                <h1 className="text-2xl font-medium mb-2">
                  Chọn gói hội viên phù hợp với bạn
                </h1>
              </div>

              {/* Membership Plans Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {membershipPlans.map((plan) => (
                  <MembershipPlanCard
                    key={plan.planType}
                    planType={plan.planType}
                    price={plan.price}
                    features={plan.features}
                    isActive={plan.isActive}
                    image={plan.image}
                    onUpgrade={() => handleUpgrade(plan.planType)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
              </div>
      </div>
    </ProtectedRoute>
  );
};

export default MembershipPage;
