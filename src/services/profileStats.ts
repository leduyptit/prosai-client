import { apiClient } from './api';

export interface ProfileStatsResponse {
  favorite_count: number;
  bookmark_count: number;
}

export const fetchProfileStats = async (): Promise<ProfileStatsResponse> => {
  try {
    const response = await apiClient.get<ProfileStatsResponse>('/profile/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching profile stats:', error);
    // Return fallback data if API fails
    return {
      favorite_count: 0,
      bookmark_count: 0
    };
  }
};
