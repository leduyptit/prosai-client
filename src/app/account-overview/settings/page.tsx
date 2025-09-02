'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { AccountSidebar, ProfileForm, PasswordChangeForm, PasswordChangeNotice } from '@/components/features/account';
import { Breadcrumb } from '@/components/ui/navigation';
import { ProtectedRoute } from '@/components/shared';
import { Modal } from '@/components/ui/overlay';
import { useLogout } from '@/hooks/useLogout';
import Link from 'next/link';
import { APP_CONFIG } from '@/utils/env';

const SettingsPage: React.FC = () => {
  const { data: session } = useSession();
  const { logout } = useLogout();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAccount = () => {
    setShowDeleteModal(true);
  };

  const confirmDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      // TODO: Call delete account API
      console.log('Deleting account...');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // TODO: Handle successful deletion
      console.log('Account deleted successfully');
      
      // Close modal and logout
      setShowDeleteModal(false);
      
      // Logout and redirect to home page
      await logout(APP_CONFIG.homeUrl);
      
    } catch (error) {
      console.error('Failed to delete account:', error);
      // TODO: Show error message
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
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

              {/* Delete Account Section */}
              <div className="flex justify-center">
                <button
                  onClick={handleDeleteAccount}
                  className="w-1/2 px-4 py-3 bg-white border-2 border-red-500 text-red-500 font-medium rounded-lg hover:bg-red-50 transition-colors duration-200"
                >
                  XÓA TÀI KHOẢN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Account Confirmation Modal */}
      <Modal
        open={showDeleteModal}
        onCancel={cancelDelete}
        footer={null}
        centered
        className="custom-modal-delete"
        width={500}
      >
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Bạn có chắc chắn muốn xóa tài khoản?
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Hành động này <strong>KHÔNG THỂ HOÀN TÁC</strong>. Tất cả dữ liệu của bạn sẽ bị xóa vĩnh viễn:
            </p>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <ul className="text-sm text-red-800 space-y-2">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Thông tin cá nhân và hồ sơ người dùng
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Tất cả tin đăng bất động sản
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Lịch sử giao dịch và thanh toán
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Dữ liệu yêu thích và đánh giá
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Cài đặt tài khoản và quyền hội viên
              </li>
            </ul>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={cancelDelete}
              className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              Hủy bỏ
            </button>
            <button
              onClick={confirmDeleteAccount}
              disabled={isDeleting}
              className="flex-1 px-4 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isDeleting ? 'Đang xóa...' : 'Xóa tài khoản'}
            </button>
          </div>
        </div>
      </Modal>
      </div>
    </ProtectedRoute>
  );
};

export default SettingsPage;
