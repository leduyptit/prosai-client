import { api, apiClient, PaginatedResponse } from './api';
import { Property, PropertySearchParams, PropertyRankingItem } from '@/types/api';
import { API_ENDPOINTS } from '@/constants';

class PropertyService {
  // Get properties with filters and pagination
  async getProperties(params: PropertySearchParams = {}): Promise<PaginatedResponse<Property>> {
    const response = await api.get<PaginatedResponse<Property>>(API_ENDPOINTS.PROPERTIES.BASE, { params });
    return response.data;
  }

  // Get single property by ID
  async getProperty(id: string): Promise<Property> {
    const response = await api.get<Property>(`${API_ENDPOINTS.PROPERTIES.DETAIL}/${id}`);
    return response.data;
  }

  // Create new property listing
  async createProperty(data: Partial<Property>): Promise<Property> {
    const response = await api.post<Property>(API_ENDPOINTS.PROPERTIES.BASE, data);
    return response.data;
  }

  // Update property
  async updateProperty(id: string, data: Partial<Property>): Promise<Property> {
    const response = await api.put<Property>(`${API_ENDPOINTS.PROPERTIES.DETAIL}/${id}`, data);
    return response.data;
  }

  // Delete property
  async deleteProperty(id: string): Promise<void> {
    await api.delete(`${API_ENDPOINTS.PROPERTIES.DETAIL}/${id}`);
  }

  // Search properties
  async searchProperties(query: string, filters: PropertySearchParams = {}): Promise<PaginatedResponse<Property>> {
    const params = { query, ...filters };
    const response = await api.get<PaginatedResponse<Property>>(API_ENDPOINTS.PROPERTIES.SEARCH, { params });
    return response.data;
  }

  // Search properties with ProSai API format
  async searchPropertyProSai(params: {
    page?: number;
    limit?: number;
    city?: string;
    property_type?: number;
    listing_type?: number;
    legal_status?: number;
    keyword?: string;
    min_price?: number;
    max_price?: number;
    min_area?: number;
    max_area?: number;
    bedrooms?: number;
    bathrooms?: number;
  } = {}): Promise<PaginatedResponse<Property>> {
    // Use direct axios call to avoid API service wrapper issues
    const response = await apiClient.get<PaginatedResponse<Property>>(API_ENDPOINTS.PROPERTIES.SEARCH_PUBLIC, { params });
    return response.data;
  }

  // Search properties for map view (dedicated endpoint)
  async searchPropertyMap(params: {
    page?: number;
    limit?: number;
    city?: string;
    tpl?: 'map';
  } = {}): Promise<{ data: Property[]; total: number; page: number; pageCount: number; count: number }> {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.PROPERTIES.SEARCH_PUBLIC}/map`, {
        params
      });
      return {
        data: response.data.data || [],
        total: response.data.total || 0,
        page: response.data.page || (params.page ?? 1),
        pageCount: response.data.pageCount || 0,
        count: response.data.count || 0,
      };
    } catch (error) {
      console.error('Error fetching map properties:', error);
      throw error;
    }
  }

  // Get featured properties
  async getFeaturedProperties(limit: number = 10): Promise<Property[]> {
    const response = await api.get<Property[]>(`${API_ENDPOINTS.PROPERTIES.FEATURED}?limit=${limit}`);
    return response.data;
  }

  // Get related properties
  async getRelatedProperties(propertyId: string, limit: number = 6): Promise<Property[]> {
    const response = await api.get<Property[]>(`${API_ENDPOINTS.PROPERTIES.DETAIL}/${propertyId}/related?limit=${limit}`);
    return response.data;
  }

  // Upload property images
  async uploadImages(propertyId: string, files: File[]): Promise<{ images: string[] }> {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`images[${index}]`, file);
    });

    const response = await api.post<{ images: string[] }>(`${API_ENDPOINTS.PROPERTIES.DETAIL}/${propertyId}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  // Delete property image
  async deleteImage(propertyId: string, imageId: string): Promise<void> {
    await api.delete(`${API_ENDPOINTS.PROPERTIES.DETAIL}/${propertyId}/images/${imageId}`);
  }

  // Get user's properties
  async getUserProperties(params: { page?: number; limit?: number; status?: string } = {}): Promise<PaginatedResponse<Property>> {
    const response = await api.get<PaginatedResponse<Property>>(API_ENDPOINTS.USERS.USER_PROPERTIES, { params });
    return response.data;
  }

  // Get user's property statistics
  async getUserStats(): Promise<any> {
    const response = await api.get<any>(API_ENDPOINTS.USERS.USER_PROPERTIES_STATS);
    return response.data;
  }

  // Toggle property status (activate/deactivate)
  async togglePropertyStatus(id: string): Promise<Property> {
    const response = await api.patch<Property>(`${API_ENDPOINTS.PROPERTIES.DETAIL}/${id}/toggle-status`);
    return response.data;
  }

  // Extend property listing
  async extendListing(id: string, days: number): Promise<Property> {
    const response = await api.post<Property>(`${API_ENDPOINTS.PROPERTIES.DETAIL}/${id}/extend`, { days });
    return response.data;
  }

  // Report property
  async reportProperty(id: string, reason: string, description?: string): Promise<{ message: string }> {
    const response = await api.post<{ message: string }>(`${API_ENDPOINTS.PROPERTIES.DETAIL}/${id}/report`, {
      reason,
      description,
    });
    return response.data;
  }

  // Save/unsave property (favorites)
  async toggleSaveProperty(id: string): Promise<{ saved: boolean }> {
    const response = await api.post<{ saved: boolean }>(`${API_ENDPOINTS.PROPERTIES.DETAIL}/${id}/save`);
    return response.data;
  }

  // Get saved properties
  async getSavedProperties(params: { page?: number; limit?: number } = {}): Promise<PaginatedResponse<Property>> {
    const response = await api.get<PaginatedResponse<Property>>(API_ENDPOINTS.USERS.SAVED_PROPERTIES, { params });
    return response.data;
  }

  // Contact property owner
  async contactOwner(propertyId: string, message: string, contactInfo: { name: string; phone: string; email?: string }): Promise<{ message: string }> {
    const response = await api.post<{ message: string }>(`${API_ENDPOINTS.PROPERTIES.DETAIL}/${propertyId}/contact`, {
      message,
      contactInfo,
    });
    return response.data;
  }

  // Get property ranking data from ProSai API
  async getPropertyRanking(type: 'latest_sale' | 'latest_rent', limit: number = 8): Promise<PropertyRankingItem[]> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.PROPERTIES.RANKING_FOR_YOU, {
        params: { type, limit }
      });
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching property ranking:', error);
      throw error;
    }
  }

  // Get top properties ranking with pagination
  async getTopProperties(page: number = 1, limit: number = 8): Promise<{ data: PropertyRankingItem[]; total: number; page: number; pageCount: number }> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.PROPERTIES.RANKING_TOP, {
        params: { page, limit }
      });
      return {
        data: response.data.data || [],
        total: response.data.total || 0,
        page: response.data.page || page,
        pageCount: response.data.pageCount || 0
      };
    } catch (error) {
      console.error('Error fetching top properties:', error);
      throw error;
    }
  }

  // Get high-rated properties ranking with pagination
  async getHighRatedProperties(page: number = 1, limit: number = 8): Promise<{ data: PropertyRankingItem[]; total: number; page: number; pageCount: number }> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.PROPERTIES.RANKING_HIGH_RATED, {
        params: { page, limit }
      });
      return {
        data: response.data.data || [],
        total: response.data.total || 0,
        page: response.data.page || page,
        pageCount: response.data.pageCount || 0
      };
    } catch (error) {
      console.error('Error fetching high-rated properties:', error);
      throw error;
    }
  }

  // Get AI suggested properties ranking with pagination
  async getAISuggestedProperties(page: number = 1, limit: number = 8): Promise<{ data: PropertyRankingItem[]; total: number; page: number; pageCount: number }> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.PROPERTIES.RANKING_AI_SUGGEST, {
        params: { page, limit }
      });
      return {
        data: response.data.data || [],
        total: response.data.total || 0,
        page: response.data.page || page,
        pageCount: response.data.pageCount || 0
      };
    } catch (error) {
      console.error('Error fetching AI suggested properties:', error);
      throw error;
    }
  }

  // Get related properties by owner
  async getRelatedPropertiesByOwner(userId?: string, userIdSocial?: string, limit: number = 10): Promise<PropertyRankingItem[]> {
    try {
      const params: any = { limit };
      
      if (userId) {
        params.user_id = userId;
      }
      
      if (userIdSocial) {
        params.user_id_social = userIdSocial;
      }

      const response = await apiClient.get(API_ENDPOINTS.PROPERTIES.RELATED_BY_OWNER, {
        params
      });
      
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching related properties by owner:', error);
      throw error;
    }
  }

  // Get recommended properties based on property characteristics
  async getRecommendedProperties(params: {
    num_bedrooms?: number;
    property_type?: number;
    listing_type?: number;
    legal_status?: number;
    city?: string;
    limit?: number;
  } = {}): Promise<PropertyRankingItem[]> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.PROPERTIES.RELATED_RECOMMEND, {
        params
      });
      
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching recommended properties:', error);
      throw error;
    }
  }
}

export const propertyService = new PropertyService();

// Fetch property details by ID
export const getPropertyById = async (id: string): Promise<any> => {
  try {
    const response = await apiClient.get(`${API_ENDPOINTS.PROPERTIES.SEARCH_PUBLIC}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching property details:', error);
    throw error;
  }
};
