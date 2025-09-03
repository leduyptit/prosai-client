'use client';

import React, { useState, useEffect } from 'react';
import { App, Button } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { useSession } from 'next-auth/react';
import { favoriteService, FavoriteRequest } from '@/services/favorites';

export interface FavoriteButtonProps {
  propertyId: string;
  title: string;
  description: string;
  images: string[];
  address: string;
  className?: string;
  size?: 'small' | 'middle' | 'large';
  showText?: boolean;
  onFavoriteChange?: (isFavorite: boolean) => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  propertyId,
  title,
  description,
  images,
  address,
  className = '',
  size = 'middle',
  showText = false,
  onFavoriteChange
}) => {
  const { data: session } = useSession();
  const { message } = App.useApp();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Check if property is already favorited on component mount
  useEffect(() => {
    if (session?.user?.id && propertyId) {
      checkFavoriteStatus();
    }
  }, [session?.user?.id, propertyId]);

  const checkFavoriteStatus = async () => {
    try {
      const isFavorited = await favoriteService.checkFavorite(propertyId);
      setIsFavorite(isFavorited);
      onFavoriteChange?.(isFavorited);
    } catch (error) {
      console.error('Error checking favorite status:', error);
    }
  };

  const handleFavoriteClick = async () => {
    if (!session?.user?.id) {
      message.error('Vui lòng đăng nhập để thêm vào danh sách yêu thích.');
      return;
    }

    if (isLoading) return;

    try {
      setIsLoading(true);

      if (isFavorite) {
        // Remove from favorites
        const deleteResponse = await favoriteService.deleteFavorite(propertyId);
        
        if (deleteResponse.success) {
          setIsFavorite(false);
          onFavoriteChange?.(false);
          message.success(deleteResponse.message);
        } else {
          message.error(deleteResponse.message);
        }
      } else {
        // Add to favorites
        const favoriteData: FavoriteRequest = {
          property_id: propertyId,
          title,
          description,
          images,
          address
        };

        const response = await favoriteService.createFavorite(favoriteData);
        
        if (response.success) {
          if (response.statusCode === 201) {
            setIsFavorite(true);
            onFavoriteChange?.(true);
            message.success('Đã thêm vào danh sách yêu thích!');
          } else {
            // Other success cases
            setIsFavorite(true);
            onFavoriteChange?.(true);
            message.success(response.message || 'Đã thêm vào danh sách yêu thích!');
          }
        } else {
          if (response.statusCode === 409) {
            // Already exists, treat as favorited
            setIsFavorite(true);
            onFavoriteChange?.(true);
            message.warning('Bất động sản này đã có trong danh sách yêu thích!');
          } else {
            message.error(response.message || 'Có lỗi xảy ra khi thêm vào danh sách yêu thích');
          }
        }
      }
    } catch (error) {
      console.error('Error handling favorite:', error);
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
