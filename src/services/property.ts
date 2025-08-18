import { api, PaginatedResponse } from './api';
import { Property, PropertyFilters, SearchParams, UserPost, PostStats } from '@/types/api';

class PropertyService {
  // Get properties with filters and pagination
  async getProperties(params: SearchParams = {}): Promise<PaginatedResponse<Property>> {
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
  async searchProperties(query: string, filters: PropertyFilters = {}): Promise<PaginatedResponse<Property>> {
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
    const response = await api.get<PaginatedResponse<Property>>('/search-property', { params });
    return response;
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
  async getUserProperties(params: { page?: number; limit?: number; status?: string } = {}): Promise<PaginatedResponse<UserPost>> {
    const response = await api.get<PaginatedResponse<UserPost>>('/user/properties', { params });
    return response.data;
  }

  // Get user's property statistics
  async getUserStats(): Promise<PostStats> {
    const response = await api.get<PostStats>('/user/properties/stats');
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
}

export const propertyService = new PropertyService();
