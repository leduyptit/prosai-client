import { apiClient } from './api';
import { API_ENDPOINTS } from '@/constants';

export interface TopTopicItem {
  topic: string;
  slug: string;
  url: string;
  count: number;
}

export class SearchService {
  async getTopTopics(): Promise<TopTopicItem[]> {
    const response = await apiClient.get(API_ENDPOINTS.SEARCH.TOP_TOPICS);
    const payload: any = response.data;
    if (Array.isArray(payload)) {
      return payload as TopTopicItem[];
    }
    return (payload?.data as TopTopicItem[]) || [];
  }
}

export const searchService = new SearchService();


