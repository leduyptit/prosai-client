'use client';

import React, { useState, useEffect } from 'react';
import { App, Button } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { useSession } from 'next-auth/react';
import { favoriteService, FavoriteRequest } from '@/services/favorites';

export interface FavoriteButtonProps {
  propertyId: string;
  isFavorite: boolean;
  className?: string;
  size?: 'small' | 'middle' | 'large';
  showText?: boolean;
  onFavoriteChange?: (isFavorite: boolean) => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  propertyId,
  className = '',
  size = 'middle',
  showText = false,
  onFavoriteChange,
  isFavorite: initialIsFavorite
}) => {
  const { data: session } = useSession();
  const { message } = App.useApp();
  const [isFavorite, setIsFavorite] = useState<boolean>(initialIsFavorite);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Initialize favorite status from localStorage (no API call)
  useEffect(() => {
    if (session?.user?.id && propertyId) {
      const favoriteKey = `favorite_${session.user.id}_${propertyId}`;
      const savedFavorite = localStorage.getItem(favoriteKey);
      if (savedFavorite !== null) {
        const isFavorited = JSON.parse(savedFavorite);
        setIsFavorite(isFavorited);
        onFavoriteChange?.(isFavorited);
      }
    }
  }, [session?.user?.id, propertyId, onFavoriteChange]);

  // Helper function to save favorite status to localStorage
  const saveFavoriteToLocalStorage = (favorited: boolean) => {
    if (session?.user?.id && propertyId) {
      const favoriteKey = `favorite_${session.user.id}_${propertyId}`;
      localStorage.setItem(favoriteKey, JSON.stringify(favorited));
    }
  };

  const handleFavoriteClick = async () => {
    if (!session?.user?.id) {
      message.error('Vui lòng đăng nhập để thêm vào danh sách yêu thích.');
      return;
    }

    if (isLoading) return;

    // Optimistic update - update UI immediately
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);
    onFavoriteChange?.(newFavoriteStatus);
    saveFavoriteToLocalStorage(newFavoriteStatus);

    try {
      setIsLoading(true);

      if (isFavorite) {
        // Remove from favorites
        const deleteResponse = await favoriteService.deleteFavorite(propertyId);
        
        if (deleteResponse.success) {
          message.success(deleteResponse.message);
        } else {
          // Revert optimistic update on failure
          setIsFavorite(true);
          onFavoriteChange?.(true);
          saveFavoriteToLocalStorage(true);
          message.error(deleteResponse.message);
        }
      } else {
        // Add to favorites
        const favoriteData: FavoriteRequest = {
          property_id: propertyId
        };

        const response = await favoriteService.createFavorite(favoriteData);
        
        if (response.success) {
          message.success(response.message || 'Đã thêm vào danh sách yêu thích!');
        } else {
          if (response.statusCode === 409) {
            // Already exists, treat as favorited
            message.warning('Bất động sản này đã có trong danh sách yêu thích!');
          } else {
            // Revert optimistic update on failure
            setIsFavorite(false);
            onFavoriteChange?.(false);
            saveFavoriteToLocalStorage(false);
            message.error(response.message || 'Có lỗi xảy ra khi thêm vào danh sách yêu thích');
          }
        }
      }
    } catch (error) {
      console.error('Error handling favorite:', error);
      // Revert optimistic update on error
      setIsFavorite(!newFavoriteStatus);
      onFavoriteChange?.(!newFavoriteStatus);
      saveFavoriteToLocalStorage(!newFavoriteStatus);
      message.error('Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonContent = () => {
    if (isLoading) {
      return showText ? 'Đang xử lý...' : null;
    }

    if (isFavorite) {
      return (
        <>
          <HeartFilled className="text-red-500" />
          {showText && <span className="ml-2">Đã lưu</span>}
        </>
      );
    }

    return (
      <>
        <HeartOutlined />
        {showText && <span className="ml-2">Lưu tin</span>}
      </>
    );
  };

  const getButtonClassName = () => {
    let baseClass = 'favorite-button transition-all duration-200';
    
    if (isFavorite) {
      baseClass += ' border-red-300 bg-red-50 text-red-600 hover:bg-red-100';
    } else {
      baseClass += ' border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50';
    }

    return `${baseClass} ${className}`.trim();
  };

  return (
    <Button
      className={getButtonClassName()}
      style={{ padding: '0 10px' }}
      size={size}
      onClick={handleFavoriteClick}
      loading={isLoading}
      disabled={!session?.user?.id}
      title={!session?.user?.id ? 'Vui lòng đăng nhập để yêu thích' : undefined}
    >
      {getButtonContent()}
    </Button>
  );
};

export default FavoriteButton;
