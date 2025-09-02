'use client';

import React, { useState, useEffect } from 'react';
import { AccountSidebar, MembershipPlanCard } from '@/components/features/account';
import { UpgradeMembershipModal, SuccessScreen } from '@/components/shared/upgrade';
import { Breadcrumb } from '@/components/ui/navigation';
import { ProtectedRoute } from '@/components/shared';
import Link from 'next/link';
import { APP_CONFIG } from '@/utils/env';
import { membershipService, MembershipPlan } from '@/services';
import { useUserPackage, useUserBalance } from '@/hooks';
import { requestBalanceRefresh } from '@/hooks/useUserBalance';
import { App } from 'antd';

const MembershipPage: React.FC = () => {
  const [membershipPlans, setMembershipPlans] = useState<MembershipPlan[]>([]);
  const [plansLoading, setPlansLoading] = useState(true);
  const [plansError, setPlansError] = useState<string | null>(null);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<MembershipPlan | null>(null);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [purchasedPackage, setPurchasedPackage] = useState<{
    name: string;
    expiryDate?: string;
    countMonth?: number;
  } | null>(null);
  const { message } = App.useApp();
  const { packageInfo, refreshPackageInfo } = useUserPackage();
  const { refresh: refreshBalance } = useUserBalance();

  // No need for static data since API now provides images and features

  useEffect(() => {
    const fetchMembershipPlans = async () => {
      try {
        setPlansLoading(true);
        const response = await membershipService.getMembershipPlans();
        
        if (response.success) {
          setMembershipPlans(response.data);
        } else {
          setPlansError(response.message || 'Có lỗi xảy ra khi tải gói hội viên');
          message.error(response.message || 'Có lỗi xảy ra khi tải gói hội viên');
        }
      } catch (error) {
        console.error('Error fetching membership plans:', error);
        setPlansError('Có lỗi xảy ra khi tải gói hội viên');
        message.error('Có lỗi xảy ra khi tải gói hội viên');
      } finally {
        setPlansLoading(false);
      }
    };

    fetchMembershipPlans();
  }, [message]);

  const handleUpgrade = (plan: MembershipPlan) => {
    setSelectedPlan(plan);
    setIsUpgradeModalOpen(true);
  };

  const handleBackToAccount = () => {
    setShowSuccessScreen(false);
    setPurchasedPackage(null);
  };

  const handleConfirmUpgrade = async (packageId: string, duration: string) => {
    try {
      // Gọi API purchase với package_id và count_month
      const response = await membershipService.purchasePackage(packageId, duration);
      
      if (response.success) {
        message.success(response.message || 'Mua gói hội viên thành công');
        // Refresh package info to get updated data
        await refreshPackageInfo();
        // Close modal
        setIsUpgradeModalOpen(false);
        setSelectedPlan(null);
        
        // Hiển thị màn hình thành công
        if (selectedPlan) {
          const months = parseInt(duration);
          const expiryDate = new Date();
          expiryDate.setMonth(expiryDate.getMonth() + months);
          
          setPurchasedPackage({
            name: selectedPlan.name,
            expiryDate: expiryDate.toLocaleDateString('vi-VN'),
            countMonth: months
          });
          setShowSuccessScreen(true);
        }

        // Refresh balance globally
        requestBalanceRefresh();
        // Also call local hook refresh (in case this page shows balance somewhere in future)
        refreshBalance();
      } else {
        message.error(response.message || 'Có lỗi xảy ra khi mua gói hội viên');
      }
    } catch (error) {
      console.error('Error purchasing package:', error);
      message.error('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  // Hiển thị màn hình thành công nếu mua gói thành công
  if (showSuccessScreen && purchasedPackage) {
    return (
      <ProtectedRoute>
        <SuccessScreen
          packageName={purchasedPackage.name}
          expiryDate={purchasedPackage.expiryDate}
          countMonth={purchasedPackage.countMonth}
          onBackToAccount={handleBackToAccount}
        />
      </ProtectedRoute>
    );
  }

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
              <div className="text-left mb-6">
                <h1 className="text-2xl font-medium mb-2">
                  Chọn gói hội viên phù hợp với bạn
                </h1>
              </div>

              {/* Membership Plans Grid */}
              {plansLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Đang tải gói hội viên...</p>
                </div>
              ) : plansError ? (
                <div className="text-center py-8">
                  <p className="text-red-600">{plansError}</p>
                  <button 
                    onClick={() => window.location.reload()} 
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Thử lại
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {membershipPlans.map((plan) => {
                    const priceText = parseFloat(plan.price) === 0 ? 'Miễn Phí' : `${parseFloat(plan.price).toLocaleString()}đ / tháng`;
                    
                    // Map API slug to component planType
                    const mapPlanType = (apiSlug: string): 'basic' | 'silver' | 'gold' => {
                      switch (apiSlug.toLowerCase()) {
                        case 'basic':
                          return 'basic';
                        case 'sliver':
                          return 'silver';
                        case 'gold':
                          return 'gold';
                        default:
                          return 'basic';
                      }
                    };
                    
                      // Check if this is the user's current package
                      const isCurrentPackage = Boolean(packageInfo && packageInfo.slug === plan.slug);

                      // Disable upgrading to basic if current is sliver/silver or gold
                      const isBasicPlan = plan.slug.toLowerCase() === 'basic';
                      const hasHigherPlan = packageInfo && (packageInfo.slug === 'sliver' || packageInfo.slug === 'gold');
                      
                      return (
                        <MembershipPlanCard
                           key={plan.id}
                           planType={mapPlanType(plan.slug)}
                           price={priceText}
                           features={plan.features}
                           isActive={isCurrentPackage}
                           image={plan.image}
                           onUpgrade={() => handleUpgrade(plan)}
                           disabled={Boolean(isBasicPlan && hasHigherPlan)}
                         />
                      );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
              </div>
      </div>

             {/* Upgrade Membership Modal */}
       <UpgradeMembershipModal
         isOpen={isUpgradeModalOpen}
         onClose={() => {
           setIsUpgradeModalOpen(false);
           setSelectedPlan(null);
         }}
         onConfirmUpgrade={handleConfirmUpgrade}
         packageType={selectedPlan ? (selectedPlan.slug === 'gold' ? 'gold' : 'silver') : 'silver'}
         selectedPlan={selectedPlan}
       />
    </ProtectedRoute>
  );
};

export default MembershipPage;
