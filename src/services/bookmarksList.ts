import { apiClient } from './api';
import { API_ENDPOINTS } from '@/constants';

export interface BookmarkItem {
  id: string;
  name: string;
  description: string;
  city: string;
  district: string;
  ward: string;
  from_price: string;
  to_price: string;
  from_area: string;
  to_area: string;
  num_bedrooms: number;
  property_type: number;
  listing_type: number;
  legal_status: number;
  keyword: string;
  created_at: string;
  updated_at: string | null;
}

export type BookmarksListResponse = BookmarkItem[];

export const fetchBookmarksList = async (limit?: number): Promise<BookmarksListResponse> => {
  try {
    const params = limit ? { limit } : {};
    const response = await apiClient.get<BookmarksListResponse>(API_ENDPOINTS.BOOKMARKS.BASE, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching bookmarks list:', error);
    // Return fallback data if API fails
    return [];
  }
};
