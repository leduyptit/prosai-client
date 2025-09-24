import { api } from './api';
import { API_ENDPOINTS } from '@/constants';

export interface CreateTopUpRequest {
  amount: number;
  payment_method: 'BANK_TRANSFER' | 'MOMO';
}

export interface PaymentInvoiceResponse {
  id: string;
  user_id: string;
  amount: string;
  payment_method: 'BANK_TRANSFER' | 'MOMO';
  status: string;
  transaction_id: string | null;
  created_at: number;
  updated_at: number | null;
  note: string | null;
}

class PaymentsService {
  // Returns raw invoice object (201) or object containing payment_url depending on backend
  async createTopUp(payload: CreateTopUpRequest): Promise<any> {
    const res = await api.post<any>(API_ENDPOINTS.PAYMENTS.CREATE, payload);
    return res;
  }

  async getPayments(params: { page?: number; limit?: number } = {}): Promise<any> {
    const res = await api.get<any>(API_ENDPOINTS.PAYMENTS.LIST, { params });
    return res;
  }

  async getPaymentById(id: string): Promise<any> {
    const res = await api.get<any>(`${API_ENDPOINTS.PAYMENTS.DETAIL}/${id}`);
    return res;
  }
}

export const paymentsService = new PaymentsService();


