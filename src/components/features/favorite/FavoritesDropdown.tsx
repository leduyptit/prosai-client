'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useFavoritesList, useBookmarksList } from '@/hooks';
import { Loading } from '@/components/ui/feedback';

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

  // Helper function to format price
  const formatPrice = (price: string) => {
    const numPrice = parseFloat(price);
    if (numPrice === 0) return 'Thỏa thuận';
    if (numPrice >= 1000000000) {
      return `${(numPrice / 1000000000).toFixed(1)} tỷ`;
    }
    return `${(numPrice / 1000000).toFixed(0)} triệu`;
  };

  // Helper function to format area
  const formatArea = (area: string) => {
    const numArea = parseFloat(area);
    if (numArea === 0) return '';
    return `${numArea}m²`;
  };

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

  // Helper function to format property type
  const formatPropertyType = (type: number) => {
    switch (type) {
      case 1: return 'Căn hộ';
      case 2: return 'Nhà riêng';
      case 3: return 'Đất nền';
      case 4: return 'Văn phòng';
      default: return 'Khác';
    }
  };

  // Helper function to format listing type
  const formatListingType = (type: number) => {
    switch (type) {
      case 1: return 'Bán';
      case 2: return 'Cho thuê';
      default: return 'Khác';
    }
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
                <Loading />
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
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
                        {item.price !== '0.00' && (
                          <span className="font-medium text-green-600">
                            {formatPrice(item.price)}
                          </span>
                        )}
                        {item.area !== '0.00' && (
                          <span>{formatArea(item.area)}</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1 truncate">
                        {item.address}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatTime(item.created_at)}
                      </p>
                    </div>
                  </div>
                ))}
                
                {/* View All Link */}
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <button className="flex items-center justify-center w-full text-sm text-red-500 hover:text-red-600 font-medium">
                    Xem tất cả
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p className="text-sm">Chưa có tin yêu thích nào</p>
              </div>
            )}
          </div>
        ) : (
          // Saved Filters Tab
          <div className="p-4">
            {bookmarksLoading ? (
              <div className="flex justify-center items-center py-8">
                <Loading />
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
                      <div className="w-20 h-20 bg-blue-100 rounded flex items-center justify-center">
                        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900">
                        {bookmark.name}
                      </h4>
                      <p className="text-xs text-gray-600 mt-1">
                        {bookmark.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {bookmark.city && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {bookmark.city}
                          </span>
                        )}
                        {bookmark.district && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {bookmark.district}
                          </span>
                        )}
                        {bookmark.num_bedrooms > 0 && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            {bookmark.num_bedrooms} PN
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                        {bookmark.from_price !== '0.00' && bookmark.to_price !== '0.00' && (
                          <span className="font-medium text-green-600">
                            {formatPrice(bookmark.from_price)} - {formatPrice(bookmark.to_price)}
                          </span>
                        )}
                        {bookmark.from_area !== '0.00' && bookmark.to_area !== '0.00' && (
                          <span>
                            {formatArea(bookmark.from_area)} - {formatArea(bookmark.to_area)}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatTime(bookmark.created_at)}
                      </p>
                    </div>
                  </div>
                ))}
                
                {/* View All Link */}
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <button className="flex items-center justify-center w-full text-sm text-red-500 hover:text-red-600 font-medium">
                    Xem tất cả
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p className="text-sm">Chưa có bộ lọc tìm kiếm nào được lưu</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesDropdown;
