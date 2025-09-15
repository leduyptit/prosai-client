import { apiClient } from './api';
import { API_ENDPOINTS } from '@/constants';

export interface SuggestionItem {
  id: string;
  title: string;
  location: string;
  type: string;
}

export const fetchSuggestions = async (keyword: string, limit: number = 10): Promise<SuggestionItem[]> => {
  try {
    const response = await apiClient.get<SuggestionItem[]>(API_ENDPOINTS.SUGGESTIONS.ADDRESS, {
      params: { keyword, limit }
    });
    const data = response.data as unknown as SuggestionItem[];
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    return [];
  }
};
