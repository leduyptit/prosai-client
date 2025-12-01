import { apiClient } from './api';
import { API_ENDPOINTS } from '@/constants';

export interface TopTopicItem {
  topic: string;
  slug: string;
  url: string;
  count: number;
}

interface SearchResponse {
  data?: TopTopicItem[];
}

export class SearchService {
  async getTopTopics(): Promise<TopTopicItem[]> {
    const response = await apiClient.get<TopTopicItem[] | SearchResponse>(API_ENDPOINTS.SEARCH.TOP_TOPICS);
    const payload = response.data;
    if (Array.isArray(payload)) {
      return payload;
    }
    return (payload as SearchResponse)?.data || [];
  }
}

export const searchService = new SearchService();


