import { apiClient } from './api';

export interface FavoriteItem {
  id: string;
  property_id: string;
  id_social: string;
  title: string;
  description: string;
  images: string[];
  price: string;
  area: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  user_id: string;
  created_at: string;
  updated_at: string | null;
}

export type FavoritesListResponse = FavoriteItem[];

export const fetchFavoritesList = async (limit?: number): Promise<FavoritesListResponse> => {
  try {
    const params = limit ? { limit } : {};
    const response = await apiClient.get<FavoritesListResponse>('/favorites', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching favorites list:', error);
    // Return fallback data if API fails
    return [];
  }
};
