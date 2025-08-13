'use client';

import React from 'react';
import { AccountSidebar, MembershipCard, StatsOverview } from '@/components/features/account';
import { Breadcrumb } from '@/components/ui/navigation';
import { ProtectedRoute } from '@/components/shared';
import Link from 'next/link';

const AccountOverviewPage: React.FC = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white">
        <div className="bg-gray-50 p-3">
            <div className="responsive-container mx-auto px-4">
                {/* Breadcrumb */}
                <Breadcrumb
                    separator=">"
                    className="text-sm"
                    items={[
                        {
                            title: <Link href="/" className="text-gray-600 hover:text-blue-600">Trang chủ</Link>,
                        },
                        {
                            title: <span className="text-gray-900">Hồ sơ tài khoản</span>,
                        },
                    ]}
                />
            </div>
        </div>
        <div className="responsive-container mx-auto px-4 py-6">
            <div className="grid grid-cols-12 gap-6">
                {/* Sidebar */}
                <div className="col-span-12 lg:col-span-3">
                <AccountSidebar activeKey="overview" />
                </div>

                {/* Main Content */}
                <div className="col-span-12 lg:col-span-9">
                <div className="space-y-6">
                    {/* Page Title */}
                    <div>
                    <h1 className="text-2xl font-medium">Hồ sơ Tài khoản</h1>
                    </div>

                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12 lg:col-span-6">
                            {/* Membership Card */}
                            <MembershipCard 
                            membershipType="gold"
                            expiryDate="31/12/2024"
                            />
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                            {/* Stats Overview */}
                            <StatsOverview 
                            activeListings={10}
                            expiredListings={12}
                            totalViews={3647}
                            totalInquiries={86}
                            />
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AccountOverviewPage;