// Authentication Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  balance?: string; // Account balance from ProSai API
  membership?: MembershipPlan;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
}

export interface AuthResponse {
  success: boolean;
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
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
    image?: string;
    balance?: string; // Account balance
    accessToken?: string;
    refreshToken?: string;
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
      image?: string;
      balance?: string; // Account balance
    };
  }
}
