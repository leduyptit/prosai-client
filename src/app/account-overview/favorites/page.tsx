'use client';

import React, { useState, useEffect } from 'react';
import { AccountSidebar } from '@/components/features/account';
import { Breadcrumb } from '@/components/ui/navigation';
import { ProtectedRoute } from '@/components/shared';
import { Loading } from '@/components/ui/feedback';
import { EmptyState } from '@/components/shared/empty-states';
import { useFavoritesList } from '@/hooks';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { APP_CONFIG } from '@/utils/env';
import { favoriteService } from '@/services/favorites';
import { Button, App } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import Image from 'next/image';

const FavoritesPage: React.FC = () => {
  const { message } = App.useApp();
  const searchParams = useSearchParams();
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 50;
  
  const { data: favoritesData, loading, error, refetch } = useFavoritesList(limit);
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

  // Helper function to format area
  const formatArea = (area: string) => {
    const numArea = parseFloat(area);
    if (numArea === 0) return '';
    return `${numArea}m²`;
  };

  // Handle delete favorite
  const handleDeleteFavorite = async (propertyId: string) => {
    setDeletingIds(prev => new Set(prev).add(propertyId));
    
    try {
      const result = await favoriteService.deleteFavorite(propertyId);
      
      if (result.success) {
        message.success(result.message);
        // Refresh the list
        refetch();
      } else {
        message.error(result.message);
      }
    } catch (error) {
      message.error('Có lỗi xảy ra khi xóa tin yêu thích');
    } finally {
      setDeletingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(propertyId);
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
                  title: <span className="text-gray-900">Tin yêu thích</span>,
                },
              ]}
            />
          </div>
        </div>
        
        <div className="responsive-container mx-auto px-4 py-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Sidebar */}
            <div className="col-span-12 lg:col-span-3">
              <AccountSidebar activeKey="favorites" />
            </div>

            {/* Main Content */}
            <div className="col-span-12 lg:col-span-9">
              <div className="space-y-6">
                {/* Page Title */}
                <div>
                  <h1 className="text-2xl font-medium">Tin yêu thích</h1>
                  <p className="text-gray-600 mt-1">
                    {limit ? `Hiển thị tối đa ${limit} tin yêu thích` : 'Danh sách tất cả tin yêu thích của bạn'}
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
                  ) : favoritesData && favoritesData.length > 0 ? (
                    <div className="p-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {favoritesData.map((item) => (
                          <div key={item.id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                            <div className="flex-shrink-0">
                              <img 
                                src={item.images && item.images.length > 0 ? item.images[0] : '/images/imgdemo_new@2x.png'} 
                                alt="property" 
                                width={120} 
                                height={120}
                                className="rounded object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="text-base font-medium text-gray-900 flex-1">
                                  <Link 
                                    href={`/property/${item.property_id}`} 
                                    className="text-blue-600 hover:text-blue-700"
                                  >
                                    {item.title}
                                  </Link>
                                </h3>
                                <Button
                                  type="text"
                                  danger
                                  size="small"
                                  icon={<DeleteOutlined />}
                                  loading={deletingIds.has(item.property_id)}
                                  onClick={() => handleDeleteFavorite(item.property_id)}
                                  className="ml-2 flex-shrink-0"
                                />
                              </div>
                              <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-2">
                                {item.price && (
                                  <span className="font-medium text-red-600">{item.price}</span>
                                )}
                                {item.area && (
                                  <span>{formatArea(item.area)}</span>
                                )}
                                {item.address && (
                                  <span className="text-xs flex items-center gap-1"><Image src="/svgs/address.svg" alt="location" width={8} height={8} /> {item.address}</span>
                                )}
                              </div>
                              <p className="text-xs text-gray-400">
                                {formatTime(item.created_at)}
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
                        title="Chưa có tin yêu thích nào"
                        description="Lưu các tin đăng bạn quan tâm để xem sau"
                        className="bg-white"
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

export default FavoritesPage;
