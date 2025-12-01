import { api, PaginatedResponse } from './api';
import { MembershipPlanDetails, UserMembership } from '@/types/auth';
import { Notification } from '@/types/api';
import { API_ENDPOINTS } from '@/constants';

class UserService {
  // Get user dashboard statistics
  async getDashboardStats(): Promise<any> {
    const response = await api.get<any>(API_ENDPOINTS.USERS.DASHBOARD);
    return response.data;
  }

  // Get user notifications
  async getNotifications(params: {
    page?: number;
    limit?: number;
    unread?: boolean;
  } = {}): Promise<PaginatedResponse<Notification>> {
    const response = await api.get<PaginatedResponse<Notification>>(API_ENDPOINTS.USERS.NOTIFICATIONS, { params });
    return response.data;
  }

  // Mark notification as read
  async markNotificationRead(id: string): Promise<void> {
    await api.patch(`${API_ENDPOINTS.USERS.NOTIFICATIONS}/${id}/read`);
  }

  // Mark all notifications as read
  async markAllNotificationsRead(): Promise<void> {
    await api.patch(`${API_ENDPOINTS.USERS.NOTIFICATIONS}/read-all`);
  }

  // Delete notification
  async deleteNotification(id: string): Promise<void> {
    await api.delete(`${API_ENDPOINTS.USERS.NOTIFICATIONS}/${id}`);
  }

  // Get unread notifications count
  async getUnreadCount(): Promise<{ count: number }> {
    const response = await api.get<{ count: number }>(`${API_ENDPOINTS.USERS.NOTIFICATIONS}/unread-count`);
    return response.data;
  }

  // Get membership plans
  async getMembershipPlans(): Promise<MembershipPlanDetails[]> {
    const response = await api.get<MembershipPlanDetails[]>(API_ENDPOINTS.MEMBERSHIP.PLANS);
    return response.data;
  }

  // Get user membership info
  async getUserMembership(): Promise<UserMembership> {
    const response = await api.get<UserMembership>(API_ENDPOINTS.USERS.MEMBERSHIP);
    return response.data;
  }

  // Upgrade membership
  async upgradeMembership(planType: string, paymentMethod: string): Promise<{
    paymentUrl?: string;
    message: string;
  }> {
    const response = await api.post<{
      paymentUrl?: string;
      message: string;
    }>(API_ENDPOINTS.USERS.MEMBERSHIP_UPGRADE, {
      planType,
      paymentMethod,
    });
    return response.data;
  }

  // Cancel membership
  async cancelMembership(): Promise<{ message: string }> {
    const response = await api.post<{ message: string }>(API_ENDPOINTS.USERS.MEMBERSHIP_CANCEL);
    return response.data;
  }

  // Get payment history
  async getPaymentHistory(params: {
    page?: number;
    limit?: number;
  } = {}): Promise<PaginatedResponse<{
    id: string;
    amount: number;
    currency: string;
    status: string;
    planType: string;
    createdAt: string;
  }>> {
    const response = await api.get(API_ENDPOINTS.USERS.PAYMENTS, { params });
    return response.data as PaginatedResponse<{
      id: string;
      amount: number;
      currency: string;
      status: string;
      planType: string;
      createdAt: string;
    }>;
  }

  // Update user settings
  async updateSettings(settings: {
    notifications?: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
    privacy?: {
      showPhone: boolean;
      showEmail: boolean;
    };
    preferences?: {
      language: string;
      currency: string;
      timezone: string;
    };
  }): Promise<{ message: string }> {
    const response = await api.put<{ message: string }>(API_ENDPOINTS.USERS.SETTINGS, settings);
    return response.data;
  }

  // Get user settings
  async getSettings(): Promise<{
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
    privacy: {
      showPhone: boolean;
      showEmail: boolean;
    };
    preferences: {
      language: string;
      currency: string;
      timezone: string;
    };
  }> {
    const response = await api.get(API_ENDPOINTS.USERS.SETTINGS);
    return response.data as {
      notifications: {
        email: boolean;
        sms: boolean;
        push: boolean;
      };
      privacy: {
        showPhone: boolean;
        showEmail: boolean;
      };
      preferences: {
        language: string;
        currency: string;
        timezone: string;
      };
    };
  }

  // Upload user avatar
  async uploadAvatar(file: File): Promise<{ avatarUrl: string }> {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await api.post<{ avatarUrl: string }>(API_ENDPOINTS.USERS.AVATAR, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  // Delete user account
  async deleteAccount(password: string): Promise<{ message: string }> {
    const response = await api.post<{ message: string }>(API_ENDPOINTS.USERS.DELETE_ACCOUNT, { password });
    return response.data;
  }
}

export const userService = new UserService();
