'use client';

import React from 'react';
import { AccountSidebar, ProfileForm, PasswordChangeForm } from '@/components/features/account';
import { Breadcrumb } from '@/components/ui/navigation';
import { ProtectedRoute } from '@/components/shared';
import Link from 'next/link';

const SettingsPage: React.FC = () => {
  const handleProfileUpdate = (data: { fullName?: string; email?: string; phone?: string }) => {
    console.log('Profile data updated:', data);
    // Handle profile update logic here
  };

  const handlePasswordUpdate = (data: { currentPassword: string; newPassword: string; confirmPassword: string }) => {
    console.log('Password updated successfully');
    // Handle password update logic here
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
                title: <Link href="/" className="text-gray-600 hover:text-blue-600">Trang chủ</Link>,
              },
              {
                title: <Link href="/account-overview" className="text-gray-600 hover:text-blue-600">Tổng quan tài khoản</Link>,
              },
              {
                title: <span className="text-gray-900">Cài đặt tài khoản</span>,
              },
            ]}
          />
        </div>
      </div>

      <div className="responsive-container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <AccountSidebar activeKey="settings" />
          </div>

          {/* Main Content */}
          <div className="col-span-12 lg:col-span-9">
            <div className="space-y-6">
              {/* Profile Form */}
              <ProfileForm 
                onUpdate={handleProfileUpdate}
                initialData={{
                  fullName: 'user4499682',
                  email: 'nguyenvana@gmail.com',
                  phone: '0901234567'
                }}
              />

              {/* Password Change Form */}
              <PasswordChangeForm 
                onUpdate={handlePasswordUpdate}
              />
            </div>
          </div>
        </div>
      </div>
      </div>
    </ProtectedRoute>
  );
};

export default SettingsPage;
