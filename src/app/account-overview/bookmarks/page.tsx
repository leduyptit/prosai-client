'use client';

import React, { useState, Suspense } from 'react';
import { AccountSidebar } from '@/components/features/account';
import { Breadcrumb } from '@/components/ui/navigation';
import { ProtectedRoute } from '@/components/shared';
import { Loading } from '@/components/ui/feedback';
import { EmptyState } from '@/components/shared/empty-states';
import { useBookmarksList } from '@/hooks';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { APP_CONFIG } from '@/utils/env';
import { createSearchUrlFromBookmark } from '@/utils/searchUrl';
import { bookmarkService } from '@/services/bookmarks';
import { Button, App } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

// Component that uses useSearchParams - must be wrapped in Suspense
const BookmarksContent: React.FC = () => {
  const { message } = App.useApp();
  const searchParams = useSearchParams();
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 50;
  
  const { data: bookmarksData, loading, error, refetch } = useBookmarksList(limit);
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

  // Helper function to format time
  const formatTime = (timestamp: string) => {
    const date = new Date(parseInt(timestamp) * 1000);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Vừa lưu xong';
    if (diffInHours < 24) return `Lưu ${diffInHours} giờ trước`;
    if (diffInHours < 48) return 'Lưu 1 ngày trước';
    return `Lưu ${Math.floor(diffInHours / 24)} ngày trước`;
  };

  // Helper function to format bookmark details
  const formatBookmarkDetails = (bookmark: any) => {
    const details = [];
    
    if (bookmark.city) details.push(bookmark.city);
    if (bookmark.district) details.push(bookmark.district);
    if (bookmark.from_price || bookmark.to_price) {
      const priceRange = [];
      if (bookmark.from_price) priceRange.push(`${bookmark.from_price} triệu`);
      if (bookmark.to_price) priceRange.push(`${bookmark.to_price} triệu`);
      details.push(priceRange.join(' - '));
    }
    if (bookmark.from_area || bookmark.to_area) {
      const areaRange = [];
      if (bookmark.from_area) areaRange.push(`${bookmark.from_area}m²`);
      if (bookmark.to_area) areaRange.push(`${bookmark.to_area}m²`);
      details.push(areaRange.join(' - '));
    }
    if (bookmark.num_bedrooms) details.push(`${bookmark.num_bedrooms} phòng ngủ`);
    
    return details.join(' • ');
  };

  // Handle delete bookmark
  const handleDeleteBookmark = async (bookmarkId: string) => {
    setDeletingIds(prev => new Set(prev).add(bookmarkId));
    
    try {
      const result = await bookmarkService.deleteBookmark(bookmarkId);
      
      if (result.success) {
        message.success(result.message);
        // Refresh the list
        refetch();
      } else {
        message.error(result.message);
      }
    } catch {
      message.error('Có lỗi xảy ra khi xóa bộ lọc tìm kiếm');
    } finally {
      setDeletingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(bookmarkId);
        return newSet;
      });
    }
  };

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
                  title: <Link href="/account-overview" className="text-gray-600 hover:text-blue-600">Hồ sơ tài khoản</Link>,
                },
                {
                  title: <span className="text-gray-900">Bộ lọc tìm kiếm đã lưu</span>,
                },
              ]}
            />
          </div>
        </div>
        
        <div className="responsive-container mx-auto px-4 py-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Sidebar */}
            <div className="col-span-12 lg:col-span-3">
              <AccountSidebar activeKey="bookmarks" />
            </div>

            {/* Main Content */}
            <div className="col-span-12 lg:col-span-9">
              <div className="space-y-6">
                {/* Page Title */}
                <div>
                  <h1 className="text-2xl font-medium">Bộ lọc tìm kiếm đã lưu</h1>
                  <p className="text-gray-600 mt-1">
                    {limit ? `Hiển thị tối đa ${limit} bộ lọc đã lưu` : 'Danh sách tất cả bộ lọc tìm kiếm đã lưu của bạn'}
                  </p>
                </div>

                {/* Content */}
                <div className="bg-white">
                  {loading ? (
                    <div className="flex justify-center items-center">
                      <Loading className="bg-white" size="large" text="Đang tải..." />
                    </div>
                  ) : error ? (
                    <div className="text-center py-12">
                      <p className="text-red-500 mb-4">{error}</p>
                      <button 
                        onClick={() => refetch()} 
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Thử lại
                      </button>
                    </div>
                  ) : bookmarksData && bookmarksData.length > 0 ? (
                    <div className="p-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {bookmarksData.map((bookmark) => (
                          <div key={bookmark.id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                            <div className="flex-shrink-0">
                              <div className="w-16 h-16 bg-blue-100 rounded flex items-center justify-center">
                                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                                </svg>
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="text-base font-medium text-gray-900 flex-1">
                                  <Link 
                                    href={createSearchUrlFromBookmark(bookmark)} 
                                    className="text-blue-600 hover:text-blue-700"
                                  >
                                    {bookmark.name}
                                  </Link>
                                </h3>
                                <Button
                                  type="text"
                                  danger
                                  size="small"
                                  icon={<DeleteOutlined />}
                                  loading={deletingIds.has(bookmark.id)}
                                  onClick={() => handleDeleteBookmark(bookmark.id)}
                                  className="ml-2 flex-shrink-0"
                                />
                              </div>
                              <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-2">
                                <span>{formatBookmarkDetails(bookmark)}</span>
                              </div>
                              <p className="text-xs text-gray-400">
                                {formatTime(bookmark.created_at)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="py-8">
                      <EmptyState 
                        type="favorite"
                        title="Chưa có bộ lọc tìm kiếm nào được lưu"
                        description="Lưu các bộ lọc tìm kiếm bạn thường xuyên sử dụng"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

const BookmarksPage: React.FC = () => {
  return (
    <Suspense fallback={
      <ProtectedRoute>
        <div className="min-h-screen bg-white flex items-center justify-center">
          <Loading className="bg-white" size="large" text="Đang tải..." />
        </div>
      </ProtectedRoute>
    }>
      <BookmarksContent />
    </Suspense>
  );
};

export default BookmarksPage;
