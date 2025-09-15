import { apiClient } from './api';
import { API_ENDPOINTS } from '@/constants';

export interface MyPropertyItem {
  id: string;
  title: string;
  description: string;
  property_type: number;
  listing_type: number;
  status: number;
  price: number;
  area: number;
  address: string;
  ward: string;
  district: string;
  city: string;
  num_bedrooms: number;
  num_bathrooms: number;
  legal_status: number;
  direction?: string;
  balcony_direction?: string;
  images: string[];
  project_name?: string;
  floor?: number;
  total_floors?: number;
  year_built?: number;
  has_elevator: boolean;
  has_parking: boolean;
  user_id: string;
  user_name: string;
  views_count: number;
  favorite_count: number;
  ranking_score: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  expired_at: string;
  user_name_social?: string;
  phone_user?: string;
  contact_email?: string;
}

export interface MyPropertiesResponse {
  data: MyPropertyItem[];
  count: number;
  total: number;
  page: number;
  pageCount: number;
}

export interface MyPropertiesFilters {
  page?: number;
  limit?: number;
  status?: number | string;
  from_date?: string;
  to_date?: string;
}

export const fetchMyProperties = async (filters: MyPropertiesFilters = {}): Promise<MyPropertiesResponse> => {
  try {
    const params = new URLSearchParams();
    
    // Default values
    params.append('page', (filters.page || 1).toString());
    params.append('limit', (filters.limit || 20).toString());
    
    // Status filter
    if (filters.status && filters.status !== 'all') {
      params.append('status', filters.status.toString());
    }
    
    // Date filters
    if (filters.from_date) {
      params.append('from_date', filters.from_date);
    }
    if (filters.to_date) {
      params.append('to_date', filters.to_date);
    }
    
    const response = await apiClient.get<MyPropertiesResponse>(`${API_ENDPOINTS.PROPERTIES.MY}?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching my properties:', error);
    // Return empty response on error
    return {
      data: [],
      count: 0,
      total: 0,
      page: 1,
      pageCount: 0
    };
  }
};
