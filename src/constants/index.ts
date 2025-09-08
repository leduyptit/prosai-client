// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    BASE: '/auth',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
    CALLBACK: '/auth/callback',
  },
  USERS: {
    BASE: '/users',
    PROFILE: '/users/profile',
    AVATAR: '/users/avatar',
    BALANCE: '/users/balance',
    STATS: '/users/stats',
    DASHBOARD: '/user/dashboard',
    NOTIFICATIONS: '/user/notifications',
    PAYMENTS: '/user/payments',
    SETTINGS: '/user/settings',
  },
  PROPERTIES: {
    BASE: '/properties',
    SEARCH: '/properties/search',
    DETAIL: '/properties',
    STATS: '/properties/stats',
    RANKING: '/properties/ranking',
    SUGGESTIONS: '/properties/suggestions',
    RANKING_FOR_YOU: '/property-ranking/realestate-for-you',
    RANKING_TOP: '/property-ranking/realestate-top',
    RANKING_HIGH_RATED: '/property-ranking/realestate-highrated',
    RANKING_AI_SUGGEST: '/property-ranking/realestate-ai-suggest',
    RELATED_BY_OWNER: '/property-related/realestate-by-owner',
    RELATED_RECOMMEND: '/property-related/realestate-recommend',
  },
  FAVORITES: {
    BASE: '/favorites',
    CHECK: '/favorites/check',
  },
  BOOKMARKS: {
    BASE: '/bookmarks',
  },
  NEWS: {
    BASE: '/news',
    CATEGORIES: '/news-categories/active/all',
    MOST_VIEWED: '/news/most-viewed',
    BY_CATEGORY: '/news/category',
  },
  MEMBERSHIP: {
    BASE: '/membership',
    PLANS: '/membership/plans',
    UPGRADE: '/membership/upgrade',
  },
  TRANSACTIONS: {
    BASE: '/transactions',
    USER: '/transactions/user',
  },
  STATISTICS: {
    BASE: '/statistics',
  },
} as const;

// User roles
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  MANAGER: 'manager',
} as const;

// Theme colors
export const THEME_COLORS = {
  PRIMARY: '#1890ff',
  SUCCESS: '#52c41a',
  WARNING: '#faad14',
  ERROR: '#ff4d4f',
  INFO: '#1890ff',
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  USER_TOKEN: 'user_token',
  USER_PROFILE: 'user_profile',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const;

// File upload
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
} as const;

// Date formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  INPUT: 'yyyy-MM-dd',
  DATETIME: 'MMM dd, yyyy HH:mm',
} as const;

// Cities
export const CITIES = [
  { value: 'Hà Nội', label: 'Hà Nội' },
  { value: 'Hưng Yên', label: 'Hưng Yên' },
  { value: 'Quảng Trị', label: 'Quảng Trị' },
  { value: 'Huế', label: 'Huế' },
  { value: 'Hải Phòng', label: 'Hải Phòng' },
  { value: 'Phú Thọ', label: 'Phú Thọ' },
  { value: 'Thanh Hoá', label: 'Thanh Hoá' },
  { value: 'Quảng Ninh', label: 'Quảng Ninh' },
  { value: 'Lào Cai', label: 'Lào Cai' },
  { value: 'Bắc Ninh', label: 'Bắc Ninh' },
  { value: 'Nghệ An', label: 'Nghệ An' },
  { value: 'Đà Nẵng', label: 'Đà Nẵng' },
  { value: 'Ninh Bình', label: 'Ninh Bình' },
  { value: 'Khánh Hòa', label: 'Khánh Hòa' },
  { value: 'Tây Ninh', label: 'Tây Ninh' },
  { value: 'Đồng Tháp', label: 'Đồng Tháp' },
  { value: 'Hà Tĩnh', label: 'Hà Tĩnh' },
  { value: 'An Giang', label: 'An Giang' },
  { value: 'Thái Nguyên', label: 'Thái Nguyên' },
  { value: 'Lạng Sơn', label: 'Lạng Sơn' },
  { value: 'Điện Biên', label: 'Điện Biên' }, 
  { value: 'Đồng Nai', label: 'Đồng Nai' },
  { value: 'Quảng Ngãi', label: 'Quảng Ngãi' },
  { value: 'Vĩnh Long', label: 'Vĩnh Long' },
  { value: 'Cao Bằng', label: 'Cao Bằng' },
  { value: 'Lai Châu', label: 'Lai Châu' },
  { value: 'Đắk Lắk', label: 'Đắk Lắk' },
  { value: 'Gia Lai', label: 'Gia Lai' },
  { value: 'Lâm Đồng', label: 'Lâm Đồng' },
  { value: 'Hồ Chí Minh', label: 'Hồ Chí Minh' },
  { value: 'Sơn La', label: 'Sơn La' },
  { value: 'Cần Thơ', label: 'Cần Thơ' },
  { value: 'Cà Mau', label: 'Cà Mau' },
  { value: 'Tuyên Quang', label: 'Tuyên Quang' }
] as const;


// Property types
export const PROPERTY_TYPES = [
  { value: '1', label: 'Chung cư' },
  { value: '2', label: 'Chung cư mini' },
  { value: '3', label: 'Nhà đất' },
  { value: '4', label: 'Nhà riêng' },
  { value: '5', label: 'Biệt thự' },
  { value: '6', label: 'Đất nền dự án' },
  { value: '7', label: 'Kho nhà xưởng' },
  { value: '8', label: 'Shophouse/codotel' },
  { value: '9', label: 'Khác' },
] as const;

// Listing types
export const LISTING_TYPES = [
  { value: '1', label: 'Cần Bán' },
  { value: '2', label: 'Cho thuê' },
  { value: '4', label: 'Cần mua' },
  { value: '5', label: 'Cần thuê' },
  { value: '3', label: 'Chưa rõ' },
] as const;

// Price ranges
export const PRICE_RANGES = [
  { value: '0-500', label: 'Dưới 500 triệu' },
  { value: '500-1000', label: '500 triệu - 1 tỷ' },
  { value: '1000-2000', label: '1 tỷ - 2 tỷ' },
  { value: '2000-5000', label: '2 tỷ - 5 tỷ' },
  { value: '5000-10000', label: '5 tỷ - 10 tỷ' },
  { value: '10000+', label: 'Trên 10 tỷ' },
] as const;

// Price slider configuration
export const PRICE_SLIDER_CONFIG = {
  MIN: 0,
  MAX: 3000, // 3 tỷ (3000 triệu)
  STEP: 50,
  MARKS: {
    0: '0 triệu',
    1000: '1 tỷ',
    2000: '2 tỷ',
    3000: '3 tỷ',
  },
  DEFAULT_RANGE: [0, 3000] as [number, number],
} as const;

// Area ranges
export const AREA_RANGES = [
  { value: '0-50', label: 'Dưới 50m²' },
  { value: '50-100', label: '50m² - 100m²' },
  { value: '100-200', label: '100m² - 200m²' },
  { value: '200-500', label: '200m² - 500m²' },
  { value: '500-1000', label: '500m² - 1000m²' },
  { value: '1000+', label: 'Trên 1000m²' },
] as const;

// Area slider configuration
export const AREA_SLIDER_CONFIG = {
  MIN: 0,
  MAX: 150,
  STEP: 50,
  MARKS: {
    0: '0m²',
    50: '50m²',
    100: '100m²',
    150: '150m²',
  },
  DEFAULT_RANGE: [0, 150] as [number, number],
} as const;

// Bedroom options
export const BEDROOM_OPTIONS = [
  { value: '1', label: '1 phòng ngủ' },
  { value: '2', label: '2 phòng ngủ' },
  { value: '3', label: '3 phòng ngủ' },
  { value: '4', label: '4 phòng ngủ' },
  { value: '5+', label: '5+ phòng ngủ' },
] as const;

// Bathroom options
export const BATHROOM_OPTIONS = [
  { value: '1', label: '1 phòng tắm' },
  { value: '2', label: '2 phòng tắm' },
  { value: '3', label: '3 phòng tắm' },
  { value: '4+', label: '4+ phòng tắm' },
] as const;

// Legal status options
export const LEGAL_STATUS = [
  { value: '1', label: 'Sổ đỏ' },
  { value: '2', label: 'Sổ hồng' },
  { value: '3', label: 'Hợp đồng mua bán' },
  { value: '4', label: 'Chờ sổ' },
] as const;

// Sort options
export const SORT_OPTIONS = [
  { value: 'newest', label: 'Mới nhất' },
  { value: 'oldest', label: 'Cũ nhất' },
  { value: 'price_asc', label: 'Giá tăng dần' },
  { value: 'price_desc', label: 'Giá giảm dần' },
  { value: 'area_asc', label: 'Diện tích tăng dần' },
  { value: 'area_desc', label: 'Diện tích giảm dần' },
  { value: 'views_desc', label: 'Lượt xem nhiều nhất' },
] as const;

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Không thể kết nối đến server',
  UNAUTHORIZED: 'Email hoặc mật khẩu không chính xác',
  FORBIDDEN: 'Tài khoản đã bị khóa hoặc chưa được xác thực',
  RATE_LIMIT: 'Quá nhiều lần thử, vui lòng thử lại sau',
  SERVER_ERROR: 'Lỗi server, vui lòng thử lại sau',
  UNKNOWN_ERROR: 'Đã có lỗi xảy ra, vui lòng thử lại',
} as const;
