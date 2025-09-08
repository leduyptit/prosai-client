import { api } from './api';
import { District, DistrictResponse } from '@/types';

export class DistrictsService {
  /**
   * Fetch districts for a specific city
   * @param cityName - The name of the city (URL encoded)
   * @returns Promise<District[]>
   */
  async getDistrictsByCity(cityName: string): Promise<District[]> {
    try {
      // URL encode the city name to handle special characters
      const encodedCityName = encodeURIComponent(cityName);
      const response = await api.get<District[]>(`/districts/city/${encodedCityName}`);
      
      // The API returns the data directly as an array, not wrapped in a response object
      return Array.isArray(response) ? response : response.data || [];
    } catch (error) {
      console.error('Error fetching districts:', error);
      throw new Error('Không thể tải danh sách quận/huyện');
    }
  }
}

export const districtsService = new DistrictsService();
