import { api } from './api';
import { API_ENDPOINTS } from '@/constants';

export interface Ward {
  id: string;
  name: string;
  code: string;
  type: string;
  slug: string;
  city_name: string;
  city_code: string;
  search_count: string | number;
}

export class WardsService {
  /**
   * Fetch wards for a specific city
   * @param cityName - The name of the city (URL encoded internally)
   * @returns Promise<Ward[]>
   */
  async getWardsByCity(cityName: string): Promise<Ward[]> {
    try {
      const encodedCityName = encodeURIComponent(cityName);
      const response = await api.get<Ward[]>(`${API_ENDPOINTS.WARDS.BY_CITY}/${encodedCityName}`);
      return Array.isArray(response) ? response : response.data || [];
    } catch (error) {
      console.error('Error fetching wards:', error);
      throw new Error('Không thể tải danh sách phường/xã');
    }
  }
}

export const wardsService = new WardsService();


