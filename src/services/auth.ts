import { api, corsApi } from './api';
import { 
  LoginCredentials, 
  RegisterData, 
  AuthResponse, 
  ForgotPasswordData, 
  ResetPasswordData, 
  ChangePasswordData,
  User
} from '@/types/auth';
import { ProSaiAuthResponse } from '@/types/prosai-api';

class AuthService {
  // Login with credentials - using CORS-friendly method
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Try URL encoded format first (most compatible)
      const response = await corsApi.postUrlEncoded<ProSaiAuthResponse>('/auth/login', credentials as unknown as Record<string, unknown>);
      return this.transformAuthResponse(response);
    } catch (error: unknown) {
      // If URL encoded fails, try form data
      const axiosError = error as { response?: { status?: number } };
      if (axiosError.response?.status === 400 || axiosError.response?.status === 415) {
        try {
          const response = await corsApi.postForm<ProSaiAuthResponse>('/auth/login', credentials as unknown as Record<string, unknown>);
          return this.transformAuthResponse(response);
        } catch (formError: unknown) {
          console.error('❌ Form data login failed:', formError);
          throw formError;
        }
      }
      console.error('❌ Login failed:', error);
      throw error;
    }
  }

  // Register new user - using CORS-friendly method
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      // Try URL encoded format first (most compatible)
      const response = await corsApi.postUrlEncoded<ProSaiAuthResponse>('/auth/register', data as unknown as Record<string, unknown>);
      return this.transformAuthResponse(response);
    } catch (error: unknown) {
      // If URL encoded fails, try form data
      const axiosError = error as { response?: { status?: number } };
      if (axiosError.response?.status === 400 || axiosError.response?.status === 415) {
        try {
          const response = await corsApi.postForm<ProSaiAuthResponse>('/auth/register', data as unknown as Record<string, unknown>);
          return this.transformAuthResponse(response);
        } catch (formError: unknown) {
          console.error('❌ Form data registration failed:', formError);
          throw formError;
        }
      }
      console.error('❌ Registration failed:', error);
      throw error;
    }
  }

  // Helper method to transform API response
  private transformAuthResponse(response: ProSaiAuthResponse): AuthResponse {
    // Transform ProSai API response to match our AuthResponse interface
    if (response && response.access_token && response.user) {
      return {
        success: true,
        user: {
          id: response.user.id,
          email: response.user.email,
          name: response.user.full_name || `${response.user.first_name} ${response.user.last_name}` || response.user.email,
          avatar: response.user.avatar || undefined,
          phone: response.user.phone,
          balance: response.user.balance, // Include balance from API
          role: response.user.role, // Include role from API
          membership: response.user.is_premium ? 'gold' : 'basic',
          createdAt: response.user.created_at || new Date().toISOString(),
          updatedAt: response.user.updated_at || new Date().toISOString(),
        },
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
      };
    } else {
      throw new Error('Invalid response from ProSai API');
    }
  }

  // Logout user
  async logout(): Promise<void> {
    await api.post('/auth/logout');
  }

  // Refresh access token
  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    const response = await api.post<{ accessToken: string }>('/auth/refresh', {
      refreshToken
    });
    return response.data;
  }

  // Forgot password
  async forgotPassword(data: ForgotPasswordData): Promise<{ message: string }> {
    const response = await api.post<{ message: string }>('/auth/forgot-password', data);
    return response.data;
  }

  // Reset password
  async resetPassword(data: ResetPasswordData): Promise<{ message: string }> {
    const response = await api.post<{ message: string }>('/auth/reset-password', data);
    return response.data;
  }

  // Change password (authenticated user)
  async changePassword(data: ChangePasswordData): Promise<{ message: string }> {
    const response = await api.post<{ message: string }>('/auth/change-password', data);
    return response.data;
  }

  // Get current user profile
  async getProfile(): Promise<User> {
    const response = await api.get<User>('/auth/profile');
    return response.data;
  }

  // Update user profile
  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await api.put<User>('/auth/profile', data);
    return response.data;
  }

  // Verify email
  async verifyEmail(token: string): Promise<{ message: string }> {
    const response = await api.post<{ message: string }>('/auth/verify-email', { token });
    return response.data;
  }

  // Resend verification email
  async resendVerification(): Promise<{ message: string }> {
    const response = await api.post<{ message: string }>('/auth/resend-verification');
    return response.data;
  }
}

export const authService = new AuthService();
