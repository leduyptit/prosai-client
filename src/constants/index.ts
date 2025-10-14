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
    MEMBERSHIP: '/user/membership',
    MEMBERSHIP_UPGRADE: '/user/membership/upgrade',
    MEMBERSHIP_CANCEL: '/user/membership/cancel',
    DELETE_ACCOUNT: '/user/delete-account',
    SAVED_PROPERTIES: '/user/saved-properties',
    USER_PROPERTIES: '/user/properties',
    USER_PROPERTIES_STATS: '/user/properties/stats',
  },
  PROPERTIES: {
    BASE: '/properties',
    SEARCH: '/properties/search',
    DETAIL: '/properties',
    STATS: '/properties/stats',
    FEATURED: '/properties/featured',
    SEARCH_PUBLIC: '/search-property',
    MY: '/properties/my',
    RANKING: '/properties/ranking',
    SUGGESTIONS: '/properties/suggestions',
    RANKING_FOR_YOU: '/property-ranking/realestate-for-you',
    RANKING_TOP: '/property-ranking/realestate-top',
    RANKING_HIGH_RATED: '/property-ranking/realestate-highrated',
    RANKING_AI_SUGGEST: '/property-ranking/realestate-ai-suggest',
    RELATED_BY_OWNER: '/property-related/realestate-by-owner',
    RELATED_RECOMMEND: '/property-related/realestate-recommend',
  },
  SEARCH: {
    TOP_TOPICS: '/search-topic/top-topics',
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
  PAYMENTS: {
    CREATE: '/payments/create',
    LIST: '/payments',
    DETAIL: '/payments',
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
  PROFILE: {
    STATS: '/profile/stats',
    PROPERTY_STATS: '/profile/property-stats',
  },
  PACKAGES: {
    BASE: '/packages',
    PURCHASE: '/packages/purchase',
    UPGRADE: '/packages/upgrade',
  },
  WARDS: {
    BY_CITY: '/wards/city',
  },
  DISTRICTS: {
    BY_CITY: '/districts/city',
  },
  SUGGESTIONS: {
    ADDRESS: '/suggestions/address',
  },
  MINIO: {
    UPLOAD: '/minio/upload',
    FILE: '/minio/file',
  },
  CONTACT: {
    BASE: '/contact',
  },
  CONVERSATION: {
    HISTORY: '/conversation-history/conversations',
    MESSAGES: '/conversation-history/conversations', // usage: `${MESSAGES}/${id}/messages`
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

// Area ranges
export const AREA_RANGES = [
  { value: '0-30', label: 'Dưới 30 m²' },
  { value: '30-50', label: '30 - 50 m²' },
  { value: '50-80', label: '50 - 80 m²' },
  { value: '80-100', label: '80 - 100 m²' },
  { value: '100-150', label: '100 - 150 m²' },
  { value: '150-200', label: '150 - 200 m²' },
  { value: '200-250', label: '200 - 250 m²' },
  { value: '250-300', label: '250 - 300 m²' },
  { value: '300-500', label: '300 - 500 m²' },
  { value: '500+', label: 'Trên 500 m²' },
] as const;

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

// Project sort constants
export const PROJECT_SORT = {
  LATEST: 'LATEST',
  OLDEST: 'OLDEST',
  MOST_VIEWED: 'MOST_VIEWED',
  MOST_LIKED: 'MOST_LIKED',
  NAME_ASC: 'NAME_ASC',
  NAME_DESC: 'NAME_DESC',
  PRICE_ASC: 'PRICE_ASC',
  PRICE_DESC: 'PRICE_DESC',
  AREA_ASC: 'AREA_ASC',
  AREA_DESC: 'AREA_DESC',
  START_DATE_ASC: 'START_DATE_ASC',
  START_DATE_DESC: 'START_DATE_DESC',
} as const;

// Project status constants
export const PROJECT_STATUS = {
  PLANNING: "Đang lên kế hoạch",
  PRE_CONSTRUCTION: "Chuẩn bị thi công",
  UNDER_CONSTRUCTION: "Đang thi công",
  COMPLETED: "Hoàn thành",
  HANDOVER: "Đã bàn giao",
  SUSPENDED: "Tạm dừng",
  CANCELLED: "Hủy bỏ",
} as const;

// Project sort options
export const PROJECT_SORT_OPTIONS = [
  { value: PROJECT_SORT.LATEST, label: 'Mới nhất' },
  { value: PROJECT_SORT.OLDEST, label: 'Cũ nhất' },
  { value: PROJECT_SORT.NAME_ASC, label: 'Tên A-Z' },
  { value: PROJECT_SORT.NAME_DESC, label: 'Tên Z-A' },
  { value: PROJECT_SORT.PRICE_ASC, label: 'Giá tăng dần' },
  { value: PROJECT_SORT.PRICE_DESC, label: 'Giá giảm dần' },
  { value: PROJECT_SORT.AREA_ASC, label: 'Diện tích tăng dần' },
  { value: PROJECT_SORT.AREA_DESC, label: 'Diện tích giảm dần' },
  { value: PROJECT_SORT.START_DATE_ASC, label: 'Ngày khởi công tăng dần' },
  { value: PROJECT_SORT.START_DATE_DESC, label: 'Ngày khởi công giảm dần' },
  { value: PROJECT_SORT.MOST_VIEWED, label: 'Lượt xem nhiều nhất' },
  { value: PROJECT_SORT.MOST_LIKED, label: 'Yêu thích nhiều nhất' },
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
