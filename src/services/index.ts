// Export services
export { authService } from './auth';
export { propertyService } from './property';
export { userService } from './user';

// Export news functions
export { fetchNewsCategories, fetchNewsByCategory, fetchAllNews } from './news';

// Export types
export type { NewsCategory, NewsArticle, NewsResponse } from './news';
