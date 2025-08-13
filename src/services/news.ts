import { api, PaginatedResponse } from './api';
import { NewsArticle, NewsCategory } from '@/types/api';

class NewsService {
  // Get news articles with pagination
  async getNews(params: {
    page?: number;
    limit?: number;
    category?: NewsCategory;
    search?: string;
  } = {}): Promise<PaginatedResponse<NewsArticle>> {
    const response = await api.get<PaginatedResponse<NewsArticle>>('/news', { params });
    return response.data;
  }

  // Get single news article
  async getArticle(id: string): Promise<NewsArticle> {
    const response = await api.get<NewsArticle>(`/news/${id}`);
    return response.data;
  }

  // Get featured news
  async getFeaturedNews(limit: number = 5): Promise<NewsArticle[]> {
    const response = await api.get<NewsArticle[]>(`/news/featured?limit=${limit}`);
    return response.data;
  }

  // Get news by category
  async getNewsByCategory(category: NewsCategory, params: {
    page?: number;
    limit?: number;
  } = {}): Promise<PaginatedResponse<NewsArticle>> {
    const response = await api.get<PaginatedResponse<NewsArticle>>(`/news/category/${category}`, { params });
    return response.data;
  }

  // Get related news
  async getRelatedNews(articleId: string, limit: number = 4): Promise<NewsArticle[]> {
    const response = await api.get<NewsArticle[]>(`/news/${articleId}/related?limit=${limit}`);
    return response.data;
  }

  // Search news
  async searchNews(query: string, params: {
    page?: number;
    limit?: number;
    category?: NewsCategory;
  } = {}): Promise<PaginatedResponse<NewsArticle>> {
    const searchParams = { query, ...params };
    const response = await api.get<PaginatedResponse<NewsArticle>>('/news/search', { params: searchParams });
    return response.data;
  }

  // Get news categories
  async getCategories(): Promise<{ category: NewsCategory; name: string; count: number }[]> {
    const response = await api.get<{ category: NewsCategory; name: string; count: number }[]>('/news/categories');
    return response.data;
  }
}

export const newsService = new NewsService();
