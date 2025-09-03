import { apiClient } from './api';

export interface BookmarkRequest {
  name: string;
  description: string;
  city?: string;
  district?: string;
  ward?: string;
  from_price?: number;
  to_price?: number;
  from_area?: number;
  to_area?: number;
  num_bedrooms?: number;
  property_type?: number;
  listing_type?: number;
  legal_status?: number;
  keyword?: string;
}

export interface BookmarkResponse {
  success: boolean;
  data?: {
    id: string;
    name: string;
    description: string;
    created_at: string;
  };
  message?: string;
  statusCode?: number;
}

class BookmarkService {
  private baseUrl = '/bookmarks';

  async createBookmark(bookmarkData: BookmarkRequest): Promise<BookmarkResponse> {
    try {
      const response = await apiClient.post<BookmarkResponse>(this.baseUrl, bookmarkData);
      
      // Handle successful creation (201 Created)
      if (response.status === 201) {
        return {
          success: true,
          data: response.data.data,
          message: 'Bộ lọc đã được lưu thành công',
          statusCode: 201
        };
      }
      
      // Handle other success responses
      return {
        success: true,
        data: response.data.data,
        message: response.data.message || 'Bộ lọc đã được lưu thành công',
        statusCode: response.status
      };
    } catch (error: any) {
      // Handle 409 Conflict (already exists)
      if (error.response?.status === 409) {
        return {
          success: false,
          message: 'Bộ lọc này đã tồn tại',
          statusCode: 409
        };
      }
      
      // Handle other errors
      console.error('Create bookmark failed:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Có lỗi xảy ra khi lưu bộ lọc',
        statusCode: error.response?.status || 500
      };
    }
  }

  async getBookmarks(): Promise<BookmarkResponse> {
    try {
      const response = await apiClient.get<BookmarkResponse>(this.baseUrl);
      return response.data;
    } catch (error) {
      console.error('Get bookmarks failed:', error);
      throw error;
    }
  }

  async deleteBookmark(id: string): Promise<BookmarkResponse> {
    try {
      const response = await apiClient.delete<BookmarkResponse>(`${this.baseUrl}/${id}`);
      
      // Handle successful deletion
      if (response.status === 200 || response.status === 204) {
        return {
          success: true,
          message: 'Đã xóa bộ lọc tìm kiếm'
        };
      }
      
      // Handle other success responses
      return {
        success: true,
        message: response.data?.message || 'Đã xóa bộ lọc tìm kiếm'
      };
    } catch (error: any) {
      console.error('Delete bookmark failed:', error);
      
      // Handle specific error cases
      if (error.response?.status === 404) {
        return {
          success: false,
          message: 'Không tìm thấy bộ lọc này'
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
        message: error.response?.data?.message || 'Có lỗi xảy ra khi xóa bộ lọc tìm kiếm'
      };
    }
  }
}

export const bookmarkService = new BookmarkService();
