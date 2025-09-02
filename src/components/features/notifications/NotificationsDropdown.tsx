'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Loading } from '@/components/ui/feedback';
import { EmptyState } from '@/components/shared/empty-states';
import { transactionsService } from '@/services';
import { formatCurrency } from '@/utils/format';

export interface NotificationsDropdownProps {
  visible: boolean;
  onClose: () => void;
  notificationsCount?: number;
}

// Mock data structure - replace with actual API data later
interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
  icon?: string;
}

const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({ 
  visible, 
  onClose, 
  notificationsCount = 0 
}) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasLoadedRef = useRef(false);

  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await transactionsService.getUserTransactions();
      if (!res.success) {
        setError(res.message || 'Không thể tải thông báo');
        setNotifications([]);
        return;
      }

      const items: NotificationItem[] = (res.data || []).map((tx) => ({
        id: tx.id,
        title: 'Giao dịch tài khoản',
        message: `Giao dịch nâng cấp gói: ${formatCurrency(parseFloat(tx.amount?.toString() ?? '0'))}`,
        type: tx.status === 'success' ? 'success' : tx.status === 'failed' ? 'error' : 'info',
        isRead: false,
        createdAt: String(tx.created_at),
        icon: '/svgs/icon_naptien.svg'
      }));

      setNotifications(items);
    } catch (err) {
      setError('Không thể tải thông báo');
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  // Only fetch data once when dropdown becomes visible
  useEffect(() => {
    if (visible && !hasLoadedRef.current) {
      hasLoadedRef.current = true;
      fetchNotifications();
    }
  }, [visible]);

  // Reset flag when dropdown closes
  useEffect(() => {
    if (!visible) {
      hasLoadedRef.current = false;
    }
  }, [visible]);

  if (!visible) return null;

  // Helper function to format time
  const formatTime = (timestamp: string | number) => {
    // API gives unix seconds as int. Normalize to ms.
    const ts = typeof timestamp === 'number' || /^(\d+)$/.test(String(timestamp))
      ? Number(timestamp) * 1000
      : Date.parse(String(timestamp));
    const date = new Date(ts);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Vừa xong';
    if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} giờ trước`;
    return `${Math.floor(diffInMinutes / 1440)} ngày trước`;
  };

  // Helper function to get notification icon
  const getNotificationIcon = (type: string, customIcon?: string) => {
    if (customIcon) {
      return <img src={customIcon} alt="notification" width={16} height={16} />;
    }
    
    switch (type) {
      case 'success':
        return <div className="w-4 h-4 bg-green-500 rounded-full" />;
      case 'warning':
        return <div className="w-4 h-4 bg-yellow-500 rounded-full" />;
      case 'error':
        return <div className="w-4 h-4 bg-red-500 rounded-full" />;
      default:
        return <div className="w-4 h-4 bg-blue-500 rounded-full" />;
    }
  };

  // Helper function to get notification type color
  const getNotificationTypeColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-l-green-500';
      case 'warning':
        return 'border-l-yellow-500';
      case 'error':
        return 'border-l-red-500';
      default:
        return 'border-l-blue-500';
    }
  };

  return (
    <div className="absolute top-full right-0 mt-3 bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-96">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <p className="font-medium text-sm text-blue-600">
          Thông báo ({notificationsCount})
        </p>
      </div>

      {/* Content */}
      <div className="max-h-96 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loading />
          </div>
        ) : error ? (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">{error}</p>
            <button 
              onClick={() => fetchNotifications()} 
              className="mt-2 text-blue-600 hover:text-blue-700 text-sm"
            >
              Thử lại
            </button>
          </div>
        ) : notifications && notifications.length > 0 ? (
          <>
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-4 border-l-4 ${getNotificationTypeColor(notification.type)} hover:bg-gray-50 transition-colors ${
                  !notification.isRead ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type, notification.icon)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-sm font-medium ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                        {notification.title}
                      </h4>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      {formatTime(notification.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* View All Link */}
            <div className="p-4 border-t border-gray-200">
              <button className="flex items-center justify-center w-full text-sm text-blue-600 hover:text-blue-700 font-medium">
                Xem tất cả thông báo
              </button>
            </div>
          </>
        ) : (
          <EmptyState 
            type="notification"
            title="Chưa có thông báo nào"
            description="Bạn sẽ nhận được thông báo khi có hoạt động mới"
            className="py-8"
          />
        )}
      </div>
    </div>
  );
};

export default NotificationsDropdown;
