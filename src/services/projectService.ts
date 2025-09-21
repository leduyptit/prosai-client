import { API_CONFIG } from '@/utils/env';

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

class ProjectService {
  private baseUrl = `${API_CONFIG.baseUrl}/projects`;

  async getProjects(params: ProjectListParams = {}): Promise<ProjectListResponse> {
    const searchParams = new URLSearchParams();
    
    if (params.page) searchParams.append('page', params.page.toString());
    if (params.limit) searchParams.append('limit', params.limit.toString());
    if (params.city) searchParams.append('city', params.city);
    if (params.project_type) searchParams.append('project_type', params.project_type);
    if (params.status) searchParams.append('status', params.status);
    if (params.search) searchParams.append('search', params.search);
    if (params.sort_type) searchParams.append('sort_type', params.sort_type);
    if (params.is_featured !== undefined) searchParams.append('is_featured', params.is_featured.toString());
    if (params.is_published !== undefined) searchParams.append('is_published', params.is_published.toString());

    const url = `${this.baseUrl}?${searchParams.toString()}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }

    return response.json();
  }

  async getProjectById(id: string): Promise<Project> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch project: ${response.statusText}`);
    }

    return response.json();
  }

  async getProjectBySlug(slug: string): Promise<Project> {
    const response = await fetch(`${this.baseUrl}/slug/${slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch project: ${response.statusText}`);
    }

    return response.json();
  }
}

export const projectService = new ProjectService();
