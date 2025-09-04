import { apiClient } from './api';
import { API_ENDPOINTS } from '@/constants';

export interface MembershipPlan {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  features: string[];
  price: string;
  duration: number;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
}

export interface MembershipResponse {
  success: boolean;
  data: MembershipPlan[];
  message?: string;
}

class MembershipService {
  private baseUrl = '/packages';

  async getMembershipPlans(): Promise<MembershipResponse> {
    try {
      const response = await apiClient.get<MembershipPlan[]>(this.baseUrl);
      return {
        success: true,
        data: response.data || [],
        message: 'Lấy danh sách gói hội viên thành công'
      };
    } catch (error: any) {
      
      if (error.response?.status === 401) {
        return {
          success: false,
          data: [],
          message: 'Vui lòng đăng nhập để xem gói hội viên'
        };
      }
      
      return {
        success: false,
        data: [],
        message: error.response?.data?.message || 'Có lỗi xảy ra khi tải gói hội viên'
      };
    }
  }

  async purchasePackage(packageId: string, countMonth: string | number): Promise<{ success: boolean; message?: string }> {
    try {
      const response = await apiClient.post('/packages/purchase', {
        package_id: packageId,
        count_month: typeof countMonth === 'string' ? parseInt(countMonth) : countMonth
      });
      
      return {
        success: true,
        message: response.data.message || 'Mua gói hội viên thành công'
      };
    } catch (error: any) {
      
      if (error.response?.status === 401) {
        return {
          success: false,
          message: 'Vui lòng đăng nhập để mua gói hội viên'
        };
      }
      
      if (error.response?.status === 400) {
        return {
          success: false,
          message: error.response?.data?.msg ? "Không đủ số dư trong tài khoản" : 'Dữ liệu không hợp lệ'
        };
      }
      
      return {
        success: false,
        message: error.response?.data?.msg || 'Có lỗi xảy ra khi mua gói hội viên'
      };
    }
  }

  async upgradeMembership(planId: string): Promise<{ success: boolean; message?: string }> {
    try {
      const response = await apiClient.post<{ success: boolean; message?: string }>(`${this.baseUrl}/upgrade`, {
        plan_id: planId
      });
      
      return {
        success: true,
        message: response.data.message || 'Nâng cấp gói hội viên thành công'
      };
    } catch (error: any) {
      
      if (error.response?.status === 401) {
        return {
          success: false,
          message: error.response?.data?.msg || 'Có lỗi xảy ra khi nâng cấp gói hội viên'
        };
      }
      
      return {
        success: false,
        message: error.response?.data?.msg || 'Có lỗi xảy ra khi nâng cấp gói hội viên'
      };
    }
  }

  // Get user profile with package info
  async getUserProfile(): Promise<{ success: boolean; data?: any; message?: string }> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.AUTH.PROFILE);
      return {
        success: true,
        data: response.data.data,
        message: response.data.message
      };
    } catch (error: any) {
      
      if (error.response?.status === 401) {
        return {
          success: false,
          message: 'Vui lòng đăng nhập để xem thông tin hồ sơ'
        };
      }
      
      return {
        success: false,
        message: error.response?.data?.msg || 'Có lỗi xảy ra khi tải thông tin hồ sơ'
      };
    }
  }
}

export const membershipService = new MembershipService();
