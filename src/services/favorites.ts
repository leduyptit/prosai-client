import { apiClient } from './api';
import { API_ENDPOINTS } from '@/constants';

export interface FavoriteRequest {
  property_id: string;
}

export interface FavoriteResponse {
  success: boolean;
  data?: {
    id: string;
    property_id: string;
    title: string;
    description: string;
    images: string[];
    address: string;
    price_all: number[];
    area: number[];
    bedrooms: number;
    bathrooms: number;
    ranking_score: number;
    created_at: string;
  };
  message?: string;
  statusCode?: number;
}

export interface FavoriteDeleteResponse {
  success: boolean;
  message: string;
}

export interface FavoriteCheckResponse {
  isFavorite: boolean;
}

class FavoriteService {
  async createFavorite(favoriteData: FavoriteRequest): Promise<FavoriteResponse> {
    try {
      const response = await apiClient.post<FavoriteResponse>(API_ENDPOINTS.FAVORITES.BASE, favoriteData);
      
      // Handle successful creation (201 Created)
      if (response.status === 201) {
        return {
          success: true,
          data: response.data.data,
          message: 'Đã thêm vào danh sách yêu thích',
          statusCode: 201
        };
      }
      
      // Handle other success responses
      return {
        success: true,
        data: response.data.data,
        message: response.data.message || 'Đã thêm vào danh sách yêu thích',
        statusCode: response.status
      };
    } catch (error: any) {
      // Handle 409 Conflict (already exists)
      if (error.response?.status === 409) {
        return {
          success: false,
          message: 'Bất động sản này đã có trong danh sách yêu thích',
          statusCode: 409
        };
      }
      
      // Handle other errors
      console.error('Create favorite failed:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Có lỗi xảy ra khi thêm vào danh sách yêu thích',
        statusCode: error.response?.status || 500
      };
    }
  }

  async deleteFavorite(propertyId: string): Promise<FavoriteDeleteResponse> {
    try {
      const response = await apiClient.delete<FavoriteDeleteResponse>(`${API_ENDPOINTS.FAVORITES.BASE}/${propertyId}`);
      
      // Handle successful deletion
      if (response.status === 200 || response.status === 204) {
        return {
          success: true,
          message: 'Đã xóa khỏi danh sách yêu thích'
        };
      }
      
      // Handle other success responses
      return {
        success: true,
        message: response.data?.message || 'Đã xóa khỏi danh sách yêu thích'
      };
    } catch (error: any) {
      console.error('Delete favorite failed:', error);
      
      // Handle specific error cases
      if (error.response?.status === 404) {
        return {
          success: false,
          message: 'Không tìm thấy tin yêu thích này'
        };
      }
      
      if (error.response?.status === 401) {
        return {
          success: false,
          message: 'Vui lòng đăng nhập để thực hiện thao tác này'
        };
      }
      
      return {
        success: false,
        message: error.response?.data?.message || 'Có lỗi xảy ra khi xóa khỏi danh sách yêu thích'
      };
    }
  }

  async getFavorites(): Promise<FavoriteResponse> {
    try {
      const response = await apiClient.get<FavoriteResponse>(API_ENDPOINTS.FAVORITES.BASE);
      return response.data;
    } catch (error) {
      console.error('Get favorites failed:', error);
      throw error;
    }
  }

  async checkFavorite(propertyId: string): Promise<boolean> {
    try {
      const response = await apiClient.get<FavoriteCheckResponse>(`${API_ENDPOINTS.FAVORITES.CHECK}/${propertyId}`);
      return response.data.isFavorite;
    } catch (error) {
      console.error('Check favorite failed:', error);
      return false;
    }
  }
}

export const favoriteService = new FavoriteService();
