import { api, PaginatedResponse } from './api';
import { User, MembershipPlanDetails, UserMembership } from '@/types/auth';
import { Notification, DashboardStats } from '@/types/api';

class UserService {
  // Get user dashboard statistics
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await api.get<DashboardStats>('/user/dashboard');
    return response.data;
  }

  // Get user notifications
  async getNotifications(params: {
    page?: number;
    limit?: number;
    unread?: boolean;
  } = {}): Promise<PaginatedResponse<Notification>> {
    const response = await api.get<PaginatedResponse<Notification>>('/user/notifications', { params });
    return response.data;
  }

  // Mark notification as read
  async markNotificationRead(id: string): Promise<void> {
    await api.patch(`/user/notifications/${id}/read`);
  }

  // Mark all notifications as read
  async markAllNotificationsRead(): Promise<void> {
    await api.patch('/user/notifications/read-all');
  }

  // Delete notification
  async deleteNotification(id: string): Promise<void> {
    await api.delete(`/user/notifications/${id}`);
  }

  // Get unread notifications count
  async getUnreadCount(): Promise<{ count: number }> {
    const response = await api.get<{ count: number }>('/user/notifications/unread-count');
    return response.data;
  }

  // Get membership plans
  async getMembershipPlans(): Promise<MembershipPlanDetails[]> {
    const response = await api.get<MembershipPlanDetails[]>('/membership/plans');
    return response.data;
  }

  // Get user membership info
  async getUserMembership(): Promise<UserMembership> {
    const response = await api.get<UserMembership>('/user/membership');
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
    }>('/user/membership/upgrade', {
      planType,
      paymentMethod,
    });
    return response.data;
  }

  // Cancel membership
  async cancelMembership(): Promise<{ message: string }> {
    const response = await api.post<{ message: string }>('/user/membership/cancel');
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
    const response = await api.get('/user/payments', { params });
    return response.data;
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
    const response = await api.put<{ message: string }>('/user/settings', settings);
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
    const response = await api.get('/user/settings');
    return response.data;
  }

  // Upload user avatar
  async uploadAvatar(file: File): Promise<{ avatarUrl: string }> {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await api.post<{ avatarUrl: string }>('/user/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  // Delete user account
  async deleteAccount(password: string): Promise<{ message: string }> {
    const response = await api.post<{ message: string }>('/user/delete-account', { password });
    return response.data;
  }
}

export const userService = new UserService();
