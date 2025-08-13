// Export all types
export * from './auth';
export * from './api';

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user' | 'manager';
  createdAt: Date;
  updatedAt: Date;
}

// Project types
export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'paused' | 'cancelled';
  progress: number;
  startDate: Date;
  endDate?: Date;
  budget: number;
  team: User[];
  createdAt: Date;
  updatedAt: Date;
}

// Task types
export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee?: User;
  projectId: string;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Analytics types
export interface Analytics {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  revenue: number;
  expenses: number;
  profit: number;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Form types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'date';
  required?: boolean;
  placeholder?: string;
  options?: { label: string; value: string | number }[];
}

// Navigation types
export interface MenuItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
}

// Theme types
export interface Theme {
  mode: 'light' | 'dark';
  primaryColor: string;
  secondaryColor: string;
}

// Property types
export interface Property {
  id: string;
  title: string;
  price: string;
  area: string;
  location: string;
  bedrooms?: number;
  bathrooms?: number;
  type: 'apartment' | 'house' | 'villa' | 'office' | 'land';
  images: string[];
  description?: string;
  features?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PropertySummary {
  id: string;
  title: string;
  price: string;
  area: string;
  location: string;
  image?: string;
  url?: string; // Custom URL, fallback to /property/{id}
}

// News types
export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  image?: string;
  publishedAt: Date;
  category?: string;
  author?: string;
  url?: string;
}

export interface NewsSummary {
  id: string;
  title: string;
  publishedAt: Date;
  url?: string;
} 