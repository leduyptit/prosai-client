'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useFavoritesList, useBookmarksList } from '@/hooks';
import { Loading } from '@/components/ui/feedback';
import { EmptyState } from '@/components/shared/empty-states';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createSearchUrlFromBookmark } from '@/utils/searchUrl';

export interface FavoritesDropdownProps {
  visible: boolean;
  onClose: () => void;
  favoritesCount?: number;
  bookmarkCount?: number;
}

const FavoritesDropdown: React.FC<FavoritesDropdownProps> = ({ 
  visible, 
  onClose, 
  favoritesCount = 0, 
  bookmarkCount = 0 
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const { data: favoritesData, loading: favoritesLoading, error: favoritesError, refetch: refetchFavorites } = useFavoritesList();
  const { data: bookmarksData, loading: bookmarksLoading, error: bookmarksError, refetch: refetchBookmarks } = useBookmarksList();
  const hasLoadedFavoritesRef = useRef(false);
  const hasLoadedBookmarksRef = useRef(false);

  // Only fetch favorites data once when dropdown becomes visible and tab favorites is selected
  useEffect(() => {
    if (visible && activeTab === 0 && !hasLoadedFavoritesRef.current) {
      hasLoadedFavoritesRef.current = true;
      refetchFavorites();
    }
  }, [visible, activeTab, refetchFavorites]);

  // Only fetch bookmarks data once when dropdown becomes visible and tab bookmarks is selected
  useEffect(() => {
    if (visible && activeTab === 1 && !hasLoadedBookmarksRef.current) {
      hasLoadedBookmarksRef.current = true;
      refetchBookmarks();
    }
  }, [visible, activeTab, refetchBookmarks]);

  // Reset flags when dropdown closes
  useEffect(() => {
    if (!visible) {
      hasLoadedFavoritesRef.current = false;
      hasLoadedBookmarksRef.current = false;
    }
  }, [visible]);

  if (!visible) return null;

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

  // Handle view all favorites
  const handleViewAllFavorites = () => {
    onClose();
    // Navigate to favorites page with limit=50
    router.push('/account-overview/favorites?limit=50');
  };

  // Handle view all bookmarks
  const handleViewAllBookmarks = () => {
    onClose();
    // Navigate to bookmarks page with limit=50
    router.push('/account-overview/bookmarks?limit=50');
  };

  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-120">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab(0)}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            activeTab === 0 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Tin yêu thích ({favoritesCount})
        </button>
        <button
          onClick={() => setActiveTab(1)}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            activeTab === 1 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Bộ lọc tìm kiếm đã lưu ({bookmarkCount})
        </button>
      </div>

      {/* Content */}
      <div className="max-h-96 overflow-y-auto">
        {activeTab === 0 ? (
          // Favorite Items Tab
          <div className="p-4">
            {favoritesLoading ? (
              <div className="flex justify-center items-center py-8">
                <Loading className="bg-white" />
              </div>
            ) : favoritesError ? (
              <div className="text-center py-8 text-gray-500">
                <p className="text-sm">{favoritesError}</p>
                <button 
                  onClick={() => refetchFavorites()} 
                  className="mt-2 text-blue-600 hover:text-blue-700 text-sm"
                >
                  Thử lại
                </button>
              </div>
            ) : favoritesData && favoritesData.length > 0 ? (
              <>
                {favoritesData.map((item) => (
                  <div key={item.id} className="flex items-start space-x-3 py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex-shrink-0">
                      <img 
                        src={item.images && item.images.length > 0 ? item.images[0] : '/images/imgdemo_new@2x.png'} 
                        alt="property" 
                        width={80} 
                        height={80}
                        className="rounded object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        <Link href={`/property/${item.property_id}`} className="text-blue-600 hover:text-blue-700">{item.title}</Link>
                        </h4>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatTime(item.created_at)}
                      </p>
                    </div>
                  </div>
                ))}
                
                {/* View All Link */}
                <div className="mt-4">
                  <button 
                    onClick={handleViewAllFavorites}
                    className="flex items-center justify-center w-full text-sm text-red-500 hover:text-red-600 font-medium"
                  >
                    Xem tất cả
                  </button>
                </div>
              </>
            ) : (
              <EmptyState 
                type="favorite"
                title="Chưa có tin yêu thích nào"
                description="Lưu các tin đăng bạn quan tâm để xem sau"
                className="py-8 bg-white"
              />
            )}
          </div>
        ) : (
          // Saved Filters Tab
          <div className="p-4">
            {bookmarksLoading ? (
              <div className="flex justify-center items-center py-8">
                <Loading className="bg-white" />
              </div>
            ) : bookmarksError ? (
              <div className="text-center py-8 text-gray-500">
                <p className="text-sm">{bookmarksError}</p>
                <button 
                  onClick={() => refetchBookmarks()} 
                  className="mt-2 text-blue-600 hover:text-blue-700 text-sm"
                >
                  Thử lại
                </button>
              </div>
            ) : bookmarksData && bookmarksData.length > 0 ? (
              <>
                {bookmarksData.map((bookmark) => (
                  <div key={bookmark.id} className="flex items-start space-x-3 py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex-shrink-0">
                      <div className="w-15 h-15 bg-blue-100 rounded flex items-center justify-center">
                        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900">
                        <Link 
                          href={createSearchUrlFromBookmark(bookmark)} 
                          className="text-blue-600 hover:text-blue-700"
                          onClick={onClose}
                        >
                          {bookmark.name}
                        </Link>
                      </h4>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatTime(bookmark.created_at)}
                      </p>
                    </div>
                  </div>
                ))}
                
                {/* View All Link */}
                <div className="mt-4">
                  <button 
                    onClick={handleViewAllBookmarks}
                    className="flex items-center justify-center w-full text-sm text-red-500 hover:text-red-600 font-medium"
                  >
                    Xem tất cả
                  </button>
                </div>
              </>
            ) : (
              <EmptyState 
                type="default"
                title="Chưa có bộ lọc tìm kiếm nào được lưu"
                description="Lưu các bộ lọc tìm kiếm bạn thường xuyên sử dụng"
                className="py-8 bg-white"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesDropdown;
