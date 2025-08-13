'use client';

import React, { useState } from 'react';
import { AccountSidebar, PostFilters, PostsTable } from '@/components/features/account';
import { Breadcrumb } from '@/components/ui/navigation';
import { ProtectedRoute } from '@/components/shared';
import Link from 'next/link';

interface PostData {
  id: string;
  title: string;
  postDate: string;
  expiredDate: string;
  status: 'active' | 'expired' | 'pending';
  views: number;
  interactions: number;
}

const PostManagerPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('7days');

  // Mock data - replace with real API data
  const mockPosts: PostData[] = [
    {
      id: '1',
      title: 'Căn hộ 3PN tại The Nelson Ba Đình',
      postDate: '26/05/2025',
      expiredDate: '26/06/2025',
      status: 'active',
      views: 125,
      interactions: 7,
    },
    {
      id: '2', 
      title: 'Căn căn hộ bài tâng đẹp - Gia đình yêu - Chất khỏi cần tìm The Nelson Private Residences',
      postDate: '15/04/2025',
      expiredDate: '15/05/2025',
      status: 'expired',
      views: 305,
      interactions: 3,
    },
    {
      id: '3',
      title: 'Nhà phố Nguyễn Văn Cừ, Long Biên',
      postDate: '26/05/2025',
      expiredDate: '26/06/2025',
      status: 'active',
      views: 125,
      interactions: 10,
    },
  ];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log('Page changed:', page);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    console.log('Status filter changed:', value);
  };

  const handleDateFilterChange = (value: string) => {
    setDateFilter(value);
    console.log('Date filter changed:', value);
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
    console.log('Edit post:', id);
    // Navigate to edit post
  };

  const handleDelete = (id: string) => {
    console.log('Delete post:', id);
    // Show delete confirmation
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
                statusFilter={statusFilter}
                dateFilter={dateFilter}
                onStatusChange={handleStatusFilterChange}
                onDateChange={handleDateFilterChange}
                onExportCSV={handleExportCSV}
              />

              {/* Posts Table */}
              <PostsTable
                data={mockPosts}
                currentPage={currentPage}
                totalPages={4}
                onPageChange={handlePageChange}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
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