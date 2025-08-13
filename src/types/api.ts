// Property Types
export interface Property {
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
  propertyType: PropertyType;
  listingType: ListingType;
  images: PropertyImage[];
  features: string[];
  contactInfo: ContactInfo;
  aiRating?: AIRating;
  views: number;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export type PropertyType = 'apartment' | 'house' | 'villa' | 'office' | 'land' | 'warehouse';
export type ListingType = 'sale' | 'rent';

export interface PropertyImage {
  id: string;
  url: string;
  alt?: string;
  isPrimary: boolean;
}

export interface ContactInfo {
  name: string;
  phone: string;
  email?: string;
  whatsapp?: string;
  zalo?: string;
}

export interface AIRating {
  overall: number;
  price: number;
  location: number;
  amenities: number;
  legal: number;
  investment: number;
  description: string;
}

// Search & Filter Types
export interface PropertyFilters {
  propertyType?: PropertyType[];
  listingType?: ListingType;
  priceMin?: number;
  priceMax?: number;
  areaMin?: number;
  areaMax?: number;
  bedrooms?: number;
  bathrooms?: number;
  district?: string[];
  city?: string;
  features?: string[];
  sortBy?: 'price' | 'area' | 'created_at' | 'views';
  sortOrder?: 'asc' | 'desc';
}

export interface SearchParams extends PropertyFilters {
  query?: string;
  page?: number;
  limit?: number;
}

// Post Management Types
export interface UserPost {
  id: string;
  property: Property;
  status: PostStatus;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}

export type PostStatus = 'active' | 'inactive' | 'expired' | 'pending' | 'rejected';

export interface PostStats {
  totalPosts: number;
  activePosts: number;
  expiredPosts: number;
  totalViews: number;
  totalContacts: number;
}

// News Types
export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: NewsCategory;
  tags: string[];
  author: {
    name: string;
    avatar?: string;
  };
  publishedAt: string;
  views: number;
  isPublished: boolean;
}

export type NewsCategory = 'market' | 'legal' | 'investment' | 'tips' | 'trends';

// Notification Types
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: string;
  data?: Record<string, any>;
}

export type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'property' | 'system';

// Statistics Types
export interface DashboardStats {
  properties: {
    total: number;
    active: number;
    views: number;
    contacts: number;
  };
  membership: {
    plan: string;
    expiresAt: string;
    postsRemaining: number;
  };
  recent: {
    properties: Property[];
    notifications: Notification[];
  };
}
