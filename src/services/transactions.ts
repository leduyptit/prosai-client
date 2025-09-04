import { apiClient } from './api';
import { API_ENDPOINTS } from '@/constants';

export interface TransactionItem {
  id: string;
  type?: string;
  amount?: string | number;
  description?: string;
  status?: string;
  created_at: string | number; // API returns int-like timestamp (seconds)
}

export interface TransactionsResponse {
  success: boolean;
  data: TransactionItem[];
  message?: string;
}

class TransactionsService {
  async getUserTransactions(): Promise<TransactionsResponse> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.TRANSACTIONS.USER);
      // API may return array directly
      const list: TransactionItem[] = Array.isArray(response.data)
        ? response.data
        : (response.data?.data || []);

      return {
        success: true,
        data: list,
        message: 'Lấy danh sách giao dịch thành công'
      };
    } catch (error: any) {
      if (error?.response?.status === 401) {
        return {
          success: false,
          data: [],
          message: 'Vui lòng đăng nhập để xem giao dịch'
        };
      }

      return {
        success: false,
        data: [],
        message: error?.response?.data?.msg || 'Có lỗi xảy ra khi tải giao dịch'
      };
    }
  }
}

export const transactionsService = new TransactionsService();


