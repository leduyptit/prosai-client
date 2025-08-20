import { api, apiClient, PaginatedResponse } from './api';
import { Property, PropertySearchParams, PropertyRankingItem } from '@/types/api';

class PropertyService {
  // Get properties with filters and pagination
  async getProperties(params: PropertySearchParams = {}): Promise<PaginatedResponse<Property>> {
    const response = await api.get<PaginatedResponse<Property>>('/properties', { params });
    return response.data;
  }

  // Get single property by ID
  async getProperty(id: string): Promise<Property> {
    const response = await api.get<Property>(`/properties/${id}`);
    return response.data;
  }

  // Create new property listing
  async createProperty(data: Partial<Property>): Promise<Property> {
    const response = await api.post<Property>('/properties', data);
    return response.data;
  }

  // Update property
  async updateProperty(id: string, data: Partial<Property>): Promise<Property> {
    const response = await api.put<Property>(`/properties/${id}`, data);
    return response.data;
  }

  // Delete property
  async deleteProperty(id: string): Promise<void> {
    await api.delete(`/properties/${id}`);
  }

  // Search properties
  async searchProperties(query: string, filters: PropertySearchParams = {}): Promise<PaginatedResponse<Property>> {
    const params = { query, ...filters };
    const response = await api.get<PaginatedResponse<Property>>('/properties/search', { params });
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
    const response = await apiClient.get<PaginatedResponse<Property>>('/search-property', { params });
    return response.data;
  }

  // Get featured properties
  async getFeaturedProperties(limit: number = 10): Promise<Property[]> {
    const response = await api.get<Property[]>(`/properties/featured?limit=${limit}`);
    return response.data;
  }

  // Get related properties
  async getRelatedProperties(propertyId: string, limit: number = 6): Promise<Property[]> {
    const response = await api.get<Property[]>(`/properties/${propertyId}/related?limit=${limit}`);
    return response.data;
  }

  // Upload property images
  async uploadImages(propertyId: string, files: File[]): Promise<{ images: string[] }> {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`images[${index}]`, file);
    });

    const response = await api.post<{ images: string[] }>(`/properties/${propertyId}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  // Delete property image
  async deleteImage(propertyId: string, imageId: string): Promise<void> {
    await api.delete(`/properties/${propertyId}/images/${imageId}`);
  }

  // Get user's properties
  async getUserProperties(params: { page?: number; limit?: number; status?: string } = {}): Promise<PaginatedResponse<Property>> {
    const response = await api.get<PaginatedResponse<Property>>('/user/properties', { params });
    return response.data;
  }

  // Get user's property statistics
  async getUserStats(): Promise<any> {
    const response = await api.get<any>('/user/properties/stats');
    return response.data;
  }

  // Toggle property status (activate/deactivate)
  async togglePropertyStatus(id: string): Promise<Property> {
    const response = await api.patch<Property>(`/properties/${id}/toggle-status`);
    return response.data;
  }

  // Extend property listing
  async extendListing(id: string, days: number): Promise<Property> {
    const response = await api.post<Property>(`/properties/${id}/extend`, { days });
    return response.data;
  }

  // Report property
  async reportProperty(id: string, reason: string, description?: string): Promise<{ message: string }> {
    const response = await api.post<{ message: string }>(`/properties/${id}/report`, {
      reason,
      description,
    });
    return response.data;
  }

  // Save/unsave property (favorites)
  async toggleSaveProperty(id: string): Promise<{ saved: boolean }> {
    const response = await api.post<{ saved: boolean }>(`/properties/${id}/save`);
    return response.data;
  }

  // Get saved properties
  async getSavedProperties(params: { page?: number; limit?: number } = {}): Promise<PaginatedResponse<Property>> {
    const response = await api.get<PaginatedResponse<Property>>('/user/saved-properties', { params });
    return response.data;
  }

  // Contact property owner
  async contactOwner(propertyId: string, message: string, contactInfo: { name: string; phone: string; email?: string }): Promise<{ message: string }> {
    const response = await api.post<{ message: string }>(`/properties/${propertyId}/contact`, {
      message,
      contactInfo,
    });
    return response.data;
  }

  // Get property ranking data from ProSai API
  async getPropertyRanking(type: 'latest_sale' | 'latest_rent', limit: number = 8): Promise<PropertyRankingItem[]> {
    try {
      const response = await apiClient.get(`/property-ranking/realestate-for-you`, {
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
      const response = await apiClient.get(`/property-ranking/realestate-top`, {
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
      const response = await apiClient.get(`/property-ranking/realestate-highrated`, {
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
      const response = await apiClient.get(`/property-ranking/realestate-ai-suggest`, {
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
}

export const propertyService = new PropertyService();

// Fetch property details by ID
export const getPropertyById = async (id: string): Promise<any> => {
  try {
    const response = await fetch(`https://api-v1.prosai.vn/search-property/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching property details:', error);
    throw error;
  }
};
