'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { AccountSidebar, ProfileForm, PasswordChangeForm, PasswordChangeNotice } from '@/components/features/account';
import { Breadcrumb } from '@/components/ui/navigation';
import { ProtectedRoute } from '@/components/shared';
import Link from 'next/link';
import { APP_CONFIG } from '@/utils/env';

const SettingsPage: React.FC = () => {
  const { data: session } = useSession();

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
                initialData={{
                  fullName: session?.user?.name || '',
                  email: session?.user?.email || '',
                  phone: session?.user?.phone || ''
                }}
              />

              {/* Password Change Form */}
              {session?.user?.provider === 'credentials' ? (
                <PasswordChangeForm />
              ) : (
                <PasswordChangeNotice 
                  provider={session?.user?.provider}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
    </ProtectedRoute>
  );
};

export default SettingsPage;
