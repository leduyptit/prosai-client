import { apiClient } from './api';
import { API_ENDPOINTS } from '@/constants';

export interface PropertyStatsResponse {
  success: boolean;
  data: {
    active_listings: number;
    expired_listings: number;
    total_views: number;
    total_inquiries: number;
  };
  message?: string;
}

export const fetchPropertyStats = async (): Promise<PropertyStatsResponse> => {
  try {
    const response = await apiClient.get<PropertyStatsResponse>(API_ENDPOINTS.PROFILE.PROPERTY_STATS);
    return response.data;
  } catch (error) {
    console.error('Error fetching property stats:', error);
    // Return fallback data if API fails
    return {
      success: false,
      data: {
        active_listings: 0,
        expired_listings: 0,
        total_views: 0,
        total_inquiries: 0
      },
      message: 'Không thể tải dữ liệu thống kê'
    };
  }
};
