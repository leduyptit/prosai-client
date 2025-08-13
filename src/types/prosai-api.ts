// ProSai API Response Types
export interface ProSaiAuthResponse {
  access_token: string;
  refresh_token: string;
  user: ProSaiUser;
}

export interface ProSaiUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  username: string;
  phone: string;
  is_active: boolean;
  is_verified: boolean;
  is_deleted: boolean;
  is_premium: boolean;
  balance: string;
  role: 'USER' | 'ADMIN' | 'MODERATOR';
  premium_start_date: string | null;
  premium_end_date: string | null;
  avatar?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProSaiProperty {
  id: string;
  title: string;
  description: string;
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  address: string;
  district: string;
  city: string;
  property_type: string;
  listing_type: string;
  images: string[];
  features: string[];
  contact_info: {
    name: string;
    phone: string;
    email?: string;
  };
  ai_rating?: {
    overall: number;
    price: number;
    location: number;
    amenities: number;
    legal: number;
    investment: number;
    description: string;
  };
  views: number;
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface ProSaiPaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
  };
}

export interface ProSaiErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
  status_code: number;
}
