import { apiClient } from './api';
import type { MyPropertyItem } from './myProperties';

export interface PropertyPostRequest {
  title: string;
  description: string;
  property_type: number;
  listing_type: number;
  price: number;
  area: number;
  address: string;
  ward: string;
  district: string;
  city: string;
  num_bedrooms: number;
  num_bathrooms: number;
  legal_status: number;
  direction?: string;
  balcony_direction?: string;
  images: string[];
  project_name?: string;
  floor?: number;
  total_floors?: number;
  year_built?: number;
  has_elevator?: boolean;
  has_parking?: boolean;
  expired_at?: string;
  user_name_social?: string;
  phone_user?: string;
  contact_email?: string;
}

export interface PropertyPostResponse {
  success: boolean;
  data?: {
    id: string;
    title: string;
    description: string;
    property_type: number;
    listing_type: number;
    price: number;
    area: number;
    address: string;
    ward: string;
    district: string;
    city: string;
    num_bedrooms: number;
    num_bathrooms: number;
    legal_status: number;
    direction?: string;
    balcony_direction?: string;
    images: string[];
    project_name?: string;
    floor?: number;
    total_floors?: number;
    year_built?: number;
    has_elevator?: boolean;
    has_parking?: boolean;
    expired_at?: string;
    created_at: string;
    updated_at: string;
  };
  message?: string;
}

export interface PropertyUpdateRequest extends Partial<PropertyPostRequest> {
  status?: number;
}

class PropertiesService {
  private baseUrl = '/properties';

  async postProperty(propertyData: PropertyPostRequest): Promise<PropertyPostResponse> {
    try {
      const response = await apiClient.post<PropertyPostResponse>(this.baseUrl, propertyData);
      
      return {
        success: true,
        data: response.data.data,
        message: response.data.message || 'Đăng tin thành công'
      };
    } catch (error: any) {
      console.error('Post property failed:', error);
      
      if (error.response?.status === 401) {
        return {
          success: false,
          message: 'Vui lòng đăng nhập để đăng tin'
        };
      }
      
      if (error.response?.status === 400) {
        return {
          success: false,
          message: error.response?.data?.message || 'Dữ liệu không hợp lệ'
        };
      }
      
      if (error.response?.status === 422) {
        return {
          success: false,
          message: error.response?.data?.message || 'Dữ liệu không hợp lệ'
        };
      }
      
      return {
        success: false,
        message: error.response?.data?.message || 'Có lỗi xảy ra khi đăng tin'
      };
    }
  }

  async getPropertyById(id: string): Promise<{ success: boolean; data?: MyPropertyItem; message?: string }> {
    try {
      const response = await apiClient.get<{ success: boolean; data: MyPropertyItem; message?: string }>(`${this.baseUrl}/${id}`);
      return {
        success: true,
        data: (response.data as any).data || (response as any).data?.data || (response as any).data,
        message: (response.data as any).message
      };
    } catch (error: any) {
      console.error('Get property failed:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Không thể tải thông tin tin đăng'
      };
    }
  }

  async updateProperty(id: string, updateData: PropertyUpdateRequest): Promise<{ success: boolean; data?: MyPropertyItem; message?: string }> {
    try {
      const response = await apiClient.put<{ success: boolean; data: MyPropertyItem; message?: string }>(`${this.baseUrl}/${id}`, updateData);
      return {
        success: true,
        data: (response.data as any).data || (response as any).data?.data || (response as any).data,
        message: (response.data as any).message || 'Cập nhật tin đăng thành công'
      };
    } catch (error: any) {
      console.error('Update property failed:', error);
      if (error.response?.status === 401) {
        return {
          success: false,
          message: 'Vui lòng đăng nhập để cập nhật tin'
        };
      }
      if (error.response?.status === 400 || error.response?.status === 422) {
        return {
          success: false,
          message: error.response?.data?.message || 'Dữ liệu không hợp lệ'
        };
      }
      return {
        success: false,
        message: error.response?.data?.message || 'Có lỗi xảy ra khi cập nhật tin đăng'
      };
    }
  }

  async deleteProperty(id: string): Promise<{ success: boolean; message?: string }> {
    try {
      await apiClient.delete(`${this.baseUrl}/${id}`);
      return {
        success: true,
        message: 'Xóa tin đăng thành công'
      };
    } catch (error: any) {
      console.error('Delete property failed:', error);
      
      if (error.response?.status === 401) {
        return {
          success: false,
          message: 'Vui lòng đăng nhập để xóa tin'
        };
      }
      
      if (error.response?.status === 403) {
        return {
          success: false,
          message: 'Bạn không có quyền xóa tin đăng này'
        };
      }
      
      if (error.response?.status === 404) {
        return {
          success: false,
          message: 'Tin đăng không tồn tại'
        };
      }
      
      return {
        success: false,
        message: error.response?.data?.message || 'Có lỗi xảy ra khi xóa tin đăng'
      };
    }
  }
}

export const propertiesService = new PropertiesService();
