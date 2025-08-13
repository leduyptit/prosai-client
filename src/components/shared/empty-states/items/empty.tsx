'use client';

import React from 'react';
import { Button } from 'antd';
import { FileAddOutlined, SearchOutlined, InboxOutlined } from '@ant-design/icons';

interface EmptyDataProps {
  type?: 'default' | 'search' | 'listing' | 'favorite' | 'notification';
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  image?: string;
  className?: string;
}

const EmptyData: React.FC<EmptyDataProps> = ({
  type = 'default',
  title,
  description,
  actionText,
  onAction,
  image,
  className = ''
}) => {
  const getEmptyConfig = () => {
    switch (type) {
      case 'search':
        return {
          icon: <SearchOutlined className="text-4xl text-gray-400" />,
          defaultTitle: 'Không tìm thấy kết quả',
          defaultDescription: 'Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc',
          defaultImage: '/svgs/img_nolist.svg'
        };
      case 'listing':
        return {
          icon: <FileAddOutlined className="text-4xl text-gray-400" />,
          defaultTitle: 'Chưa có tin đăng nào',
          defaultDescription: 'Hãy đăng tin đầu tiên của bạn để bắt đầu',
          defaultActionText: 'Đăng tin ngay',
          defaultImage: '/svgs/img_nolist.svg'
        };
      case 'favorite':
        return {
          icon: <InboxOutlined className="text-4xl text-gray-400" />,
          defaultTitle: 'Chưa có tin yêu thích',
          defaultDescription: 'Lưu các tin đăng bạn quan tâm để xem sau',
          defaultImage: '/svgs/img_nolist.svg'
        };
      case 'notification':
        return {
          icon: <InboxOutlined className="text-4xl text-gray-400" />,
          defaultTitle: 'Chưa có thông báo',
          defaultDescription: 'Bạn sẽ nhận được thông báo khi có hoạt động mới',
          defaultImage: '/svgs/img_nolist.svg'
        };
      default:
        return {
          icon: <InboxOutlined className="text-4xl text-gray-400" />,
          defaultTitle: 'Không có dữ liệu',
          defaultDescription: 'Hiện tại chưa có dữ liệu để hiển thị',
          defaultImage: '/svgs/img_nolist.svg'
        };
    }
  };

  const config = getEmptyConfig();
  const displayTitle = title || config.defaultTitle;
  const displayDescription = description || config.defaultDescription;
  const displayActionText = actionText || config.defaultActionText;
  const displayImage = image || config.defaultImage;

  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      {/* Image or Icon */}
      <div className="mb-6">
        {displayImage ? (
          <img 
            src={displayImage} 
            alt="Empty state" 
            className="w-32 h-32 object-contain opacity-60"
          />
        ) : (
          <div className="w-32 h-32 flex items-center justify-center">
            {config.icon}
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className="text-xl font-font-medium text-gray-700 mb-2">
        {displayTitle}
      </h3>

      {/* Description */}
      <p className="text-gray-500 mb-6 max-w-md">
        {displayDescription}
      </p>

      {/* Action Button */}
      {displayActionText && onAction && (
        <Button
          type="primary"
          size="large"
          onClick={onAction}
          className="bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 px-6"
        >
          {displayActionText}
        </Button>
      )}
    </div>
  );
};

export default EmptyData;