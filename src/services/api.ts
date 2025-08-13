import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getSession } from 'next-auth/react';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api-v1.prosai.vn';

// Create axios instance with CORS-friendly configuration
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  // Don't set Content-Type globally to avoid preflight requests
  // It will be set automatically for JSON data
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Try to refresh token or redirect to login
      const session = await getSession();
      if (session?.user && 'refreshToken' in session && session.refreshToken) {
        try {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken: session.refreshToken,
          });
          
          if (response.data.accessToken) {
            // Update session with new token
            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
            return apiClient(originalRequest);
          }
        } catch (refreshError: unknown) {
          // Refresh failed, redirect to login
          console.error('Token refresh failed:', refreshError);
          window.location.href = '/auth/signin';
        }
      } else {
        // No refresh token, redirect to login
        window.location.href = '/auth/signin';
      }
    }

    return Promise.reject(error);
  }
);

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

// Generic API methods
class ApiService {
  async get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await apiClient.get(url, config);
    return response.data;
  }

  async post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await apiClient.post(url, data, config);
    return response.data;
  }

  async put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await apiClient.put(url, data, config);
    return response.data;
  }

  async patch<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await apiClient.patch(url, data, config);
    return response.data;
  }

  async delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await apiClient.delete(url, config);
    return response.data;
  }
}

export const api = new ApiService();

// Special CORS-friendly client for registration/login (no preflight)
export const corsApiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: false, // Don't send cookies to avoid preflight
});

// CORS-friendly API service for auth endpoints
class CorsApiService {
  // POST request using form data to avoid preflight
  async postForm<T>(url: string, data: Record<string, unknown> | { [key: string]: unknown }): Promise<T> {
    try {
      const formData = new FormData();
      
      // Convert object to form data
      Object.keys(data).forEach(key => {
        if (data[key] !== null && data[key] !== undefined) {
          formData.append(key, String(data[key]));
        }
      });

      const response = await corsApiClient.post(url, formData, {
        headers: {
          // Let browser set Content-Type for form data (includes boundary)
        }
      });
      return response.data;
    } catch (error: unknown) {
      this.handleCorsError(error);
      throw error;
    }
  }

  // POST request with simple content type to avoid preflight
  async postSimple<T>(url: string, data: unknown): Promise<T> {
    try {
      const response = await corsApiClient.post(url, JSON.stringify(data), {
        headers: {
          'Content-Type': 'text/plain', // Simple content type, no preflight
        }
      });
      return response.data;
    } catch (error: unknown) {
      this.handleCorsError(error);
      throw error;
    }
  }

  // POST request as URL encoded to avoid preflight
  async postUrlEncoded<T>(url: string, data: Record<string, unknown> | { [key: string]: unknown }): Promise<T> {
    try {
      const params = new URLSearchParams();
      
      // Convert object to URL encoded format
      Object.keys(data).forEach(key => {
        if (data[key] !== null && data[key] !== undefined) {
          params.append(key, String(data[key]));
        }
      });

      const response = await corsApiClient.post(url, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      });
      return response.data;
    } catch (error: unknown) {
      this.handleCorsError(error);
      throw error;
    }
  }

  // Handle CORS-specific errors
  private handleCorsError(error: unknown) {
    const axiosError = error as { code?: string; response?: { status?: number }; config?: { url?: string; method?: string }; message?: string };
    if (axiosError.code === 'ERR_NETWORK' || !axiosError.response) {
      console.error('❌ CORS/Network error:', {
        message: 'Không thể kết nối đến server - có thể do CORS policy',
        originalError: axiosError.message,
        url: axiosError.config?.url,
        method: axiosError.config?.method
      });
    } else if (axiosError.response?.status === 0) {
      console.error('❌ CORS preflight failed:', {
        message: 'CORS preflight request bị chặn',
        url: axiosError.config?.url
      });
    }
  }
}

export const corsApi = new CorsApiService();
