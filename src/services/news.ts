import { apiClient } from './api';
import { API_ENDPOINTS } from '@/constants';

export interface NewsCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  featured_image: string;
  images: string[];
  author: string;
  view_count: number;
  views?: number; // Alternative field name for view count
  like_count: number;
  is_featured: boolean;
  is_published: boolean;
  is_active: boolean;
  published_at: string;
  meta_tags: {
    title: string;
    keywords: string;
    description: string;
  };
  category_id: string;
  category: NewsCategory;
  created_at: string;
  updated_at: string | null;
}

export interface NewsResponse {
  data: NewsArticle[];
  total: number;
  page: number;
  pageCount: number;
}

// Fetch active news categories
export const fetchNewsCategories = async (): Promise<NewsCategory[]> => {
  try {
    const response = await apiClient.get<NewsCategory[]>(API_ENDPOINTS.NEWS.CATEGORIES);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch news categories:', error);
    throw new Error('Không thể tải danh mục tin tức');
  }
};

// Fetch news by category
export const fetchNewsByCategory = async (categoryId: string, page: number = 1, limit: number = 3, sortType: string = 'latest'): Promise<NewsResponse> => {
  try {
    const response = await apiClient.get<NewsResponse>(`${API_ENDPOINTS.NEWS.BY_CATEGORY}/${categoryId}`, {
      params: { page, limit, sort_type: sortType }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch news by category:', error);
    throw new Error('Không thể tải tin tức');
  }
};

// Fetch all news
export const fetchAllNews = async (
  page: number = 1, 
  limit: number = 10, 
  sortType: string = 'LATEST',
  isFeatured: boolean = false,
  isPublished: boolean = true
): Promise<NewsResponse> => {
  try {
    const response = await apiClient.get<NewsResponse>(API_ENDPOINTS.NEWS.BASE, {
      params: { 
        page, 
        limit, 
        sort_type: sortType,
        is_featured: isFeatured,
        is_published: isPublished
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch all news:', error);
    throw new Error('Không thể tải tin tức');
  }
};

// Fetch most viewed news
export const fetchMostViewedNews = async (limit: number = 10): Promise<NewsArticle[]> => {
  try {
    const response = await apiClient.get<NewsArticle[]>(API_ENDPOINTS.NEWS.MOST_VIEWED, {
      params: { limit }
    });
    return response.data || [];
  } catch (error) {
    console.error('Failed to fetch most viewed news:', error);
    throw new Error('Không thể tải tin tức xem nhiều nhất');
  }
};

// Fetch news detail by ID
export const fetchNewsDetail = async (articleId: string): Promise<NewsArticle> => {
  try {
    const response = await apiClient.get<NewsArticle>(`${API_ENDPOINTS.NEWS.BASE}/${articleId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch news detail:', error);
    throw new Error('Không thể tải chi tiết bài viết');
  }
};
