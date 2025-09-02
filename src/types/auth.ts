// Authentication Types
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  image?: string;
  avatar_url?: string; // Add avatar_url for custom usage
  balance?: string;
  role?: string;
  accessToken?: string;
  refreshToken?: string;
  provider?: 'credentials' | 'google' | 'facebook' | 'zalo'; // Track login provider
}

export interface Session {
  user: User;
  accessToken: string;
  expires: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    email: string;
    full_name: string;
    avatar?: string;
    balance: string;
    role: string;
  };
}

export interface SocialLoginRequest {
  access_token: string;
  provider: 'GOOGLE' | 'FACEBOOK';
}

export interface SocialLoginResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    email: string;
    full_name: string;
    avatar?: string;
    balance: string;
    role: string;
  };
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar?: string;
  balance: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface UpdateProfileRequest {
  full_name?: string;
  avatar?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  new_password: string;
  confirm_password: string;
}

export interface AuthError {
  message: string;
  code?: string;
  field?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  socialLogin: (accessToken: string, provider: 'GOOGLE' | 'FACEBOOK') => Promise<void>;
  updateProfile: (data: UpdateProfileRequest) => Promise<void>;
  changePassword: (data: ChangePasswordRequest) => Promise<void>;
  forgotPassword: (data: ForgotPasswordRequest) => Promise<void>;
  resetPassword: (data: ResetPasswordRequest) => Promise<void>;
  clearError: () => void;
}

// Membership Types
export type MembershipPlan = 'basic' | 'silver' | 'gold';

export interface MembershipFeature {
  name: string;
  included: boolean;
  limit?: number;
}

export interface MembershipPlanDetails {
  type: MembershipPlan;
  name: string;
  price: string;
  features: MembershipFeature[];
  image: string;
  isPopular?: boolean;
}

export interface UserMembership {
  plan: MembershipPlan;
  startDate: string;
  endDate: string;
  isActive: boolean;
  autoRenew: boolean;
}

// Session Types (extending NextAuth)
declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    user: User;
  }

  interface User {
    id: string;
    email: string;
    name: string;
    phone?: string;
    image?: string;
    avatar_url?: string; // Add avatar_url for custom usage
    balance?: string; // Account balance
    role?: string; // User role for admin access
    accessToken?: string;
    refreshToken?: string;
    provider?: 'credentials' | 'google' | 'facebook' | 'zalo'; // Track login provider
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    user: {
      id: string;
      email: string;
      name: string;
      phone?: string;
      image?: string;
      avatar_url?: string; // Add avatar_url for custom usage
      balance?: string; // Account balance
      role?: string; // User role for admin access
      provider?: 'credentials' | 'google' | 'facebook' | 'zalo'; // Track login provider
    };
  }
}
