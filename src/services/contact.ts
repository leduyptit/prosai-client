import { apiClient } from './api';
import { API_ENDPOINTS } from '@/constants';

export interface ContactResponse {
  user_id: string;
  phone_user: string | null;
  phone_message: string[];
  user_name: string;
}

export async function fetchContactById(contactId: string): Promise<ContactResponse> {
  const url = `${API_ENDPOINTS.CONTACT.BASE}/${encodeURIComponent(contactId)}`;
  const response = await apiClient.get<ContactResponse>(url);
  return response.data as unknown as ContactResponse;
}


