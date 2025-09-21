export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T = any> {
  data: T[];
  count: number;
  page: number;
  total: number;
  pageCount: number;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

export interface LoginRequest {
  email: string;
  password: string;
  [key: string]: unknown;
}

export interface RegisterRequest {
  full_name: string;
  email: string;
  password: string;
  phone: string;
  [key: string]: unknown;
}

export interface AuthResponse {
  success: boolean;
  user: {
    id: string;
    email: string;
    full_name: string;
    phone: string;
    avatar?: string;
    balance: string;
    role: string;
    created_at: string;
    updated_at: string;
  };
  accessToken: string;
  refreshToken: string;
}

export interface SocialLoginRequest {
  access_token: string;
  provider: 'FACEBOOK' | 'GOOGLE';
}

export interface SocialLoginResponse {
  success: boolean;
  user: {
    id: string;
    email: string;
    full_name: string;
    phone: string;
    avatar?: string;
    balance: string;
    role: string;
    created_at: string;
    updated_at: string;
  };
  accessToken: string;
  refreshToken: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  avatar?: string;
  balance: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface UpdateProfileRequest {
  full_name?: string;
  phone?: string;
  avatar?: string;
  [key: string]: unknown;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  [key: string]: unknown;
}

export interface ForgotPasswordRequest {
  email: string;
  [key: string]: unknown;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
  [key: string]: unknown;
}

export interface Property {
  id: string;
  id_social?: string;
  title: string;
  description: string;
  price_all: number | number[];
  price: number | number[];
  area: number | number[];
  bedrooms: number;
  bathrooms: number;
  address: string | null;
  city: string | null;
  district: string | null;
  property_type: number;
  listing_type: number;
  legal_status: number;
  interior_status: number;
  status: string | null;
  images: string[];
  created_at: string;
  updated_at: string;
  phone_message: string[];
  phone_user: string | null;
  user_name_social: string;
  ranking_score?: number;
  project_name?: string;
  smart_score?: string;
  attribuite_score?: string;
  explain?: string;
  sentiment_score?: number;
  note_1?: number;
  note_2?: number | null;
  note_3?: number | null;
  note_4?: number | null;
  note_5?: number | null;
  note_6?: number | null;
  note_7?: number | null;
  note_8?: number | null;
  note_9?: number | null;
  note_10?: number | null;
  is_favorite?: boolean;
}

export interface PropertySummary {
  id: string;
  title: string;
  price: string;
  area: number;
  location: string;
  url?: string;
}

export interface PropertySearchParams {
  keyword?: string;
  city?: string;
  district?: string;
  property_type?: string;
  min_price?: number;
  max_price?: number;
  min_area?: number;
  max_area?: number;
  bedrooms?: number;
  bathrooms?: number;
  page?: number;
  per_page?: number;
}

export interface PropertySearchResponse extends PaginatedResponse<Property> {}

export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  summary: string;
  image?: string;
  author: string;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface NewsSummary {
  id: string;
  title: string;
  url?: string;
  publishedAt: Date;
}

export interface NewsSearchParams {
  keyword?: string;
  category?: string;
  page?: number;
  per_page?: number;
}

export interface NewsSearchResponse extends PaginatedResponse<NewsArticle> {}

export interface NewsCategory {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
  property_id?: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in days
  features: string[];
  max_properties: number;
  max_images_per_property: number;
  priority_support: boolean;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan_id: string;
  plan: MembershipPlan;
  status: 'active' | 'expired' | 'cancelled';
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
}

export interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'bank_transfer' | 'momo' | 'vnpay';
  name: string;
  description: string;
  icon: string;
  is_active: boolean;
}

export interface PaymentRequest {
  subscription_id: string;
  payment_method: string;
  amount: number;
}

export interface PaymentResponse {
  success: boolean;
  payment_url?: string;
  transaction_id?: string;
  message: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  is_read: boolean;
  data?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface NotificationResponse extends PaginatedResponse<Notification> {}

export interface MarkNotificationReadRequest {
  notification_ids: string[];
}

export interface MarkNotificationReadResponse {
  success: boolean;
  message: string;
}

export interface DeleteNotificationRequest {
  notification_ids: string[];
}

export interface DeleteNotificationResponse {
  success: boolean;
  message: string;
}

export interface ApiConfig {
  baseURL: string;
  timeout: number;
  headers: Record<string, string>;
}

export interface RequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  data?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
  timeout?: number;
}

export interface ResponseConfig {
  data: any;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: RequestConfig;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  content: string;
  featured_image: string | null;
  images: string[];
  investor: string;
  contractor: string | null;
  architect: string | null;
  address: string;
  city: string;
  ward: string;
  area: string;
  floors: number;
  apartments: number;
  total_investment: string;
  price_from: string;
  price_to: string;
  start_date: string | null;
  expected_completion_date: string | null;
  handover_date: string | null;
  status: string;
  project_type: string;
  view_count: number;
  like_count: number;
  is_featured: boolean;
  is_published: boolean;
  is_active: boolean;
  meta_tags: {
    title: string;
    keywords: string;
    description: string;
  };
  created_at: string;
  updated_at: string | null;
}

export interface ProjectListResponse {
  data: Project[];
  total: number;
  page: number;
  pageCount: number;
}

export interface ProjectListParams {
  page?: number;
  limit?: number;
  city?: string;
  project_type?: string;
  status?: string;
  search?: string;
  sort_type?: string;
  is_featured?: boolean;
  is_published?: boolean;
  filter_type?: string;
}

export interface PropertyRankingItem {
  id: string;
  id_social: string;
  user_id_social: string;
  user_name_social: string;
  description: string;
  created_at: string;
  updated_at: string;
  user_id: string | null;
  title: string;
  price: number[];
  price_all: number[];
  area: number[];
  address: string | null;
  images: string[];
  is_favorite: boolean;
}