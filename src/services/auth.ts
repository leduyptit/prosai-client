import { corsApi, apiClient } from './api';
import { 
  LoginRequest, 
  RegisterRequest, 
  SocialLoginRequest, 
  UserProfile,
  UpdateProfileRequest,
  ChangePasswordRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ApiResponse
} from '@/types/api';
import { ProSaiAuthResponse } from '@/types/prosai-api';

class AuthService {
  private baseUrl = '/auth';

  // Login
  async login(credentials: LoginRequest): Promise<ProSaiAuthResponse> {
    try {
      const response = await corsApi.postUrlEncoded<ProSaiAuthResponse>(`${this.baseUrl}/login`, credentials);
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  // Register
  async register(credentials: RegisterRequest): Promise<ProSaiAuthResponse> {
    try {
      const response = await corsApi.postUrlEncoded<ProSaiAuthResponse>(`${this.baseUrl}/register`, credentials);
      return response;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }

  // Social Login
  async socialLogin(accessToken: string, provider: 'FACEBOOK' | 'GOOGLE'): Promise<ProSaiAuthResponse> {
    try {
      const request: SocialLoginRequest = {
        access_token: accessToken,
        provider
      };
      
      const response = await corsApi.get<ProSaiAuthResponse>(`${this.baseUrl}/social-login?access_token=${encodeURIComponent(accessToken)}&provider=${provider}`);
      return response;
    } catch (error) {
      console.error(`${provider} social login failed:`, error);
      throw error;
    }
  }

  // Get User Profile
  async getProfile(): Promise<UserProfile> {
    try {
      const response = await apiClient.get<UserProfile>(`${this.baseUrl}/profile`);
      return response.data;
    } catch (error) {
      console.error('Get profile failed:', error);
      throw error;
    }
  }

  // Update Profile
  async updateProfile(data: UpdateProfileRequest): Promise<ApiResponse<UserProfile>> {
    try {
      const response = await apiClient.put<ApiResponse<UserProfile>>(`${this.baseUrl}/profile`, data);
      return response.data;
    } catch (error) {
      console.error('Update profile failed:', error);
      throw error;
    }
  }

  // Change Password
  async changePassword(data: ChangePasswordRequest): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await apiClient.post(`${this.baseUrl}/change-password`, data);
      return response.data;
    } catch (error) {
      console.error('Change password failed:', error);
      throw error;
    }
  }

  // Forgot Password
  async forgotPassword(data: ForgotPasswordRequest): Promise<ApiResponse<{ message: string }> & { statusCode?: number }> {
    try {
      const response = await apiClient.post<ApiResponse<{ message: string }>>(`${this.baseUrl}/forgot-password`, data);
      return {
        ...response.data,
        statusCode: response.status
      };
    } catch (error) {
      console.error('Forgot password failed:', error);
      throw error;
    }
  }

  // Reset Password
  async resetPassword(data: ResetPasswordRequest): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await apiClient.post<ApiResponse<{ message: string }>>(`${this.baseUrl}/reset-password`, data);
      return response.data;
    } catch (error) {
      console.error('Reset password failed:', error);
      throw error;
    }
  }

  // Logout
  async logout(): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await apiClient.post<ApiResponse<{ message: string }>>(`${this.baseUrl}/logout`);
      return response.data;
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  }

  // Refresh Token
  async refreshToken(refreshToken: string): Promise<ProSaiAuthResponse> {
    try {
      const response = await apiClient.post<ProSaiAuthResponse>(`${this.baseUrl}/refresh-token`, { refresh_token: refreshToken });
      return response.data;
    } catch (error) {
      console.error('Refresh token failed:', error);
      throw error;
    }
  }

  // Verify Token
  async verifyToken(token: string): Promise<ApiResponse<{ user: UserProfile }>> {
    try {
      const response = await apiClient.get<ApiResponse<{ user: UserProfile }>>(`${this.baseUrl}/verify-token?token=${encodeURIComponent(token)}`);
      return response.data;
    } catch (error) {
      console.error('Verify token failed:', error);
      throw error;
    }
  }
}

export const authService = new AuthService();
