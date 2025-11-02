'use client';

import React, { useEffect, useState } from 'react';
import { AccountSidebar, MembershipCard, StatsOverview } from '@/components/features/account';
import { Breadcrumb } from '@/components/ui/navigation';
import { ProtectedRoute } from '@/components/shared';
import Link from 'next/link';
import { APP_CONFIG } from '@/utils/env';
import { useUserPackage } from '@/hooks';
import { fetchPropertyStats } from '@/services';

 const AccountOverviewPage: React.FC = () => {
   const { packageInfo, loading: packageLoading } = useUserPackage();
   const [statsLoading, setStatsLoading] = useState(false);
   const [statsError, setStatsError] = useState<string | null>(null);
   const [stats, setStats] = useState<{ active_properties: number; expired_properties: number; total_views: number; total_contacts: number } | null>(null);

   useEffect(() => {
     let mounted = true;
     const load = async () => {
       try {
         setStatsLoading(true);
         setStatsError(null);
         const res = await fetchPropertyStats();
         if (!mounted) return;
        // Service returns fallback on error, ensure shape
        const data = (res as any)?.data || res;
        setStats({
          active_properties: data?.active_properties || 0,
          expired_properties: data?.expired_properties || 0,
          total_views: data?.total_views || 0,
          total_contacts: data?.total_contacts || 0,
        });
       } catch (e) {
         if (!mounted) return;
         setStatsError('Không thể tải dữ liệu thống kê');
       } finally {
         if (!mounted) return;
         setStatsLoading(false);
       }
     };
     load();
     return () => { mounted = false; };
   }, []);

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
                            title: <Link href={APP_CONFIG.homeUrl} className="text-gray-600 hover:text-blue-600">Trang chủ</Link>,
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
                              membershipType={(() => {
                                if (!packageInfo) return 'basic';
                                switch (packageInfo.slug) {
                                  case 'gold':
                                    return 'gold';
                                  case 'sliver':
                                    return 'silver';
                                  default:
                                    return 'basic';
                                }
                              })()}
                              expiryDate={packageInfo?.premium_end_date ? new Date(packageInfo.premium_end_date).toLocaleDateString('vi-VN') : "Không có hạn sử dụng"}
                              loading={packageLoading}
                            />
                        </div>
                         <div className="col-span-12 lg:col-span-6">
                             {/* Stats Overview */}
                             <StatsOverview 
                               activeListings={stats?.active_properties || 0}
                               expiredListings={stats?.expired_properties || 0}
                               totalViews={stats?.total_views || 0}
                               totalInquiries={stats?.total_contacts || 0}
                               loading={statsLoading}
                               error={statsError}
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