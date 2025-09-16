'use client';

import React, { useState } from 'react';
import { AccountSidebar, PostFilters, PostsTable } from '@/components/features/account';
import { Breadcrumb } from '@/components/ui/navigation';
import { ProtectedRoute } from '@/components/shared';
import { useMyProperties } from '@/hooks';
import Link from 'next/link';
import { APP_CONFIG } from '@/utils/env';
import { useRouter } from 'next/navigation';
import { App } from 'antd';
import { propertiesService } from '@/services';

interface PostData {
  id: string;
  title: string;
  postDate: string;
  expiredDate: string;
  status: 'active' | 'expired' | 'deleted';
  views: number;
  interactions: number;
}

const PostManagerPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const router = useRouter();
  const { modal, message } = App.useApp();
  
  // Helper function to convert API status to UI status
  const getStatusFromAPI = (apiStatus: number): string => {
    switch (apiStatus) {
      case 1:
        return 'active';
      case 2:
        return 'expired';
      default:
        return 'deleted';
    }
  };

  // Helper function to convert UI status filter to API status
  const getAPIStatusFromUI = (uiStatus: string): string | number => {
    switch (uiStatus) {
      case 'active':
        return 1;
      case 'expired':
        return 2;
      case 'deleted':
        return 0;
      case 'all':
      default:
        return 'all';
    }
  };

  // Helper function to convert date filter to date range
  const getDateRangeFromFilter = (filter: string): { fromDate: string; toDate: string } => {
    const now = new Date();
    const toDate = now.toISOString();
    
    let fromDate: Date;
    
    switch (filter) {
      case '7days':
        fromDate = new Date(now);
        fromDate.setDate(fromDate.getDate() - 7);
        break;
      case '30days':
        fromDate = new Date(now);
        fromDate.setDate(fromDate.getDate() - 30);
        break;
      case '90days':
        fromDate = new Date(now);
        fromDate.setDate(fromDate.getDate() - 90);
        break;
      default:
        fromDate = new Date(now);
        fromDate.setDate(fromDate.getDate() - 7);
    }
    
    return {
      fromDate: fromDate.toISOString(),
      toDate
    };
  };

  // Helper function to convert API status back to UI status
  const getUIStatusFromAPI = (apiStatus: string | number | undefined): string => {
    if (apiStatus === 'all' || apiStatus === undefined) return 'all';
    
    switch (Number(apiStatus)) {
      case 1:
        return 'active';
      case 0:
        return 'deleted';
      case 2:
        return 'expired';
      default:
        return 'all';
    }
  };

  // Helper function to get UI date filter from date range
  const getUIDateFilterFromRange = (fromDate?: string, toDate?: string): string => {
    // When both are undefined, interpret as 'all'
    if (!fromDate && !toDate) return 'all';
    if (!fromDate || !toDate) return '7days';
    
    const from = new Date(fromDate);
    const to = new Date(toDate);
    const diffDays = Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 7) return '7days';
    if (diffDays <= 30) return '30days';
    if (diffDays <= 90) return '90days';
    return '7days';
  };
  
  // Use API hook with default 7-day filter
  const {
    data: propertiesData,
    loading,
    error,
    changePage,
    updateStatusFilter,
    updateDateFilter,
    filters,
    refetch
  } = useMyProperties();

  // Transform API data to match PostsTable expected format
  const transformedPosts: PostData[] = (propertiesData?.data || []).map(item => ({
    id: item.id,
    title: item.title,
    postDate: new Date(item.created_at).toLocaleDateString('vi-VN'),
    expiredDate: new Date(item.expired_at).toLocaleDateString('vi-VN'),
    status: getStatusFromAPI(item.status) as 'active' | 'expired' | 'deleted',
    views: item.views_count,
    interactions: item.favorite_count,
  }));

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    changePage(page);
  };

  const handleStatusFilterChange = (value: string) => {
    // Convert UI status filter to API status
    const apiStatus = getAPIStatusFromUI(value);
    updateStatusFilter(apiStatus);
  };

  const handleDateFilterChange = (value: string) => {
    if (value === 'all') {
      // Clear time filter completely
      updateDateFilter(undefined as any, undefined as any);
      return;
    }
    // Convert date filter to actual date range
    const { fromDate, toDate } = getDateRangeFromFilter(value);
    updateDateFilter(fromDate, toDate);
  };

  const handleExportCSV = () => {
    console.log('Exporting CSV...');
    // Implement CSV export logic
  };

  const handleView = (id: string) => {
    console.log('View post:', id);
    // Navigate to post detail
  };

  const handleEdit = (id: string) => {
    router.push(`/post-property?id=${id}`);
  };

  const handleDelete = (id: string) => {
    // Find the property title for the confirmation message
    const property = transformedPosts.find(post => post.id === id);
    const propertyTitle = property?.title || 'tin đăng này';

    modal.confirm({
      title: 'Xác nhận xóa tin đăng',
      content: `Bạn có chắc chắn muốn xóa "${propertyTitle}"? Hành động này không thể hoàn tác.`,
      okText: 'Xóa',
      cancelText: 'Hủy',
      okType: 'danger',
      className: 'custom-modal-delete',
      onOk: async () => {
        try {
          setDeleteLoading(true);
          const response = await propertiesService.deleteProperty(id);
          
          if (response.success) {
            message.success(response.message || 'Xóa tin đăng thành công');
            // Refresh the list after successful deletion
            refetch();
          } else {
            message.error(response.message || 'Có lỗi xảy ra khi xóa tin đăng');
          }
        } catch (error) {
          console.error('Error deleting property:', error);
          message.error('Có lỗi xảy ra, vui lòng thử lại');
        } finally {
          setDeleteLoading(false);
        }
      }
    });
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
                title: <span className="text-gray-900">Quản lý tin đăng</span>,
              },
            ]}
          />
        </div>
      </div>

      <div className="responsive-container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <AccountSidebar activeKey="posts" />
          </div>

          {/* Main Content */}
          <div className="col-span-12 lg:col-span-9">
            <div className="space-y-6">
              {/* Page Title */}
              <div>
                <h1 className="text-2xl font-font-medium text-gray-900">
                  Danh sách tin đăng
                </h1>
              </div>

              {/* Filters */}
              <PostFilters
                statusFilter={getUIStatusFromAPI(filters.status)}
                dateFilter={getUIDateFilterFromRange(filters.from_date, filters.to_date)}
                onStatusChange={handleStatusFilterChange}
                onDateChange={handleDateFilterChange}
                onExportCSV={handleExportCSV}
              />

              {/* Posts Table */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <p className="text-red-600">{error}</p>
                </div>
              )}
              
              <PostsTable
                data={transformedPosts}
                currentPage={currentPage}
                totalPages={propertiesData?.pageCount || 1}
                onPageChange={handlePageChange}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>
      </div>
    </ProtectedRoute>
  );
};

export default PostManagerPage;