// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REGISTER: '/api/auth/register',
    REFRESH: '/api/auth/refresh',
  },
  USERS: {
    BASE: '/api/users',
    PROFILE: '/api/users/profile',
    AVATAR: '/api/users/avatar',
  }
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
  { value: 'Hồ Chí Minh', label: 'Hồ Chí Minh' },
  { value: 'Đà Nẵng', label: 'Đà Nẵng' },
  { value: 'Hải Phòng', label: 'Hải Phòng' },
  { value: 'Cần Thơ', label: 'Cần Thơ' },
  { value: 'Bình Dương', label: 'Bình Dương' },
  { value: 'Long An', label: 'Long An' },
  { value: 'Tiền Giang', label: 'Tiền Giang' },
  { value: 'Bình Thuận', label: 'Bình Thuận' },
  { value: 'Khánh Hòa', label: 'Khánh Hòa' },
  { value: 'Lâm Đồng', label: 'Lâm Đồng' },
  { value: 'An Giang', label: 'An Giang' },
  { value: 'Kiên Giang', label: 'Kiên Giang' },
  { value: 'Trà Vinh', label: 'Trà Vinh' },
  { value: 'Sóc Trăng', label: 'Sóc Trăng' },
  { value: 'Bạc Liêu', label: 'Bạc Liêu' },
  { value: 'Cà Mau', label: 'Cà Mau' },
  { value: 'Đồng Tháp', label: 'Đồng Tháp' },
  { value: 'Vĩnh Long', label: 'Vĩnh Long' },
  { value: 'Bình Phước', label: 'Bình Phước' },
  { value: 'Tây Ninh', label: 'Tây Ninh' },
  { value: 'Phú Yên', label: 'Phú Yên' },
  { value: 'Quảng Trị', label: 'Quảng Trị' },
  { value: 'Thừa Thiên Huế', label: 'Thừa Thiên Huế' },
  { value: 'Quảng Bình', label: 'Quảng Bình' },
  { value: 'Hà Nam', label: 'Hà Nam' },
  { value: 'Nam Định', label: 'Nam Định' },
  { value: 'Ninh Bình', label: 'Ninh Bình' },
  { value: 'Thái Bình', label: 'Thái Bình' },
  { value: 'Hưng Yên', label: 'Hưng Yên' },
  { value: 'Hải Dương', label: 'Hải Dương' },
  { value: 'Bắc Giang', label: 'Bắc Giang' },
  { value: 'Bắc Ninh', label: 'Bắc Ninh' },
  { value: 'Phú Thọ', label: 'Phú Thọ' },
  { value: 'Vĩnh Phúc', label: 'Vĩnh Phúc' },
  { value: 'Thái Nguyên', label: 'Thái Nguyên' },
  { value: 'Lạng Sơn', label: 'Lạng Sơn' },
  { value: 'Cao Bằng', label: 'Cao Bằng' },
  { value: 'Bắc Kạn', label: 'Bắc Kạn' },
  { value: 'Tuyên Quang', label: 'Tuyên Quang' },
  { value: 'Hà Giang', label: 'Hà Giang' },
  { value: 'Lào Cai', label: 'Lào Cai' },
  { value: 'Yên Bái', label: 'Yên Bái' },
  { value: 'Lai Châu', label: 'Lai Châu' },
  { value: 'Sơn La', label: 'Sơn La' },
  { value: 'Điện Biên', label: 'Điện Biên' },
  { value: 'Hòa Bình', label: 'Hòa Bình' },
  { value: 'Nghệ An', label: 'Nghệ An' },
  { value: 'Hà Tĩnh', label: 'Hà Tĩnh' },
  { value: 'Quảng Bình', label: 'Quảng Bình' },
  { value: 'Quảng Trị', label: 'Quảng Trị' },
  { value: 'Thừa Thiên Huế', label: 'Thừa Thiên Huế' },
  { value: 'Đà Nẵng', label: 'Đà Nẵng' },
  { value: 'Quảng Nam', label: 'Quảng Nam' },
  { value: 'Quảng Ngãi', label: 'Quảng Ngãi' },
  { value: 'Phú Yên', label: 'Phú Yên' },
  { value: 'Khánh Hòa', label: 'Khánh Hòa' },
  { value: 'Ninh Thuận', label: 'Ninh Thuận' },
  { value: 'Bình Thuận', label: 'Bình Thuận' },
  { value: 'Lâm Đồng', label: 'Lâm Đồng' },
  { value: 'Bình Phước', label: 'Bình Phước' },
  { value: 'Tây Ninh', label: 'Tây Ninh' },
  { value: 'Bình Dương', label: 'Bình Dương' },
  { value: 'Long An', label: 'Long An' },
  { value: 'Tiền Giang', label: 'Tiền Giang' },
  { value: 'Vĩnh Long', label: 'Vĩnh Long' },
  { value: 'Đồng Tháp', label: 'Đồng Tháp' },
  { value: 'An Giang', label: 'An Giang' },
  { value: 'Kiên Giang', label: 'Kiên Giang' },
  { value: 'Trà Vinh', label: 'Trà Vinh' },
  { value: 'Sóc Trăng', label: 'Sóc Trăng' },
  { value: 'Bạc Liêu', label: 'Bạc Liêu' },
  { value: 'Cà Mau', label: 'Cà Mau' },
  { value: 'Cần Thơ', label: 'Cần Thơ' },
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
  { value: '0-50', label: 'Dưới 50m²' },
  { value: '50-100', label: '50m² - 100m²' },
  { value: '100-200', label: '100m² - 200m²' },
  { value: '200-500', label: '200m² - 500m²' },
  { value: '500-1000', label: '500m² - 1000m²' },
  { value: '1000+', label: 'Trên 1000m²' },
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

// Membership plans
export const MEMBERSHIP_PLANS = [
  {
    id: 'basic',
    name: 'Cơ bản',
    price: 0,
    features: [
      'Đăng tối đa 5 tin',
      'Hỗ trợ cơ bản',
      'Thời hạn 30 ngày',
    ],
    color: '#6B7280',
  },
  {
    id: 'silver',
    name: 'Bạc',
    price: 199000,
    features: [
      'Đăng tối đa 20 tin',
      'Ưu tiên hiển thị',
      'Hỗ trợ 24/7',
      'Thời hạn 90 ngày',
    ],
    color: '#9CA3AF',
  },
  {
    id: 'gold',
    name: 'Vàng',
    price: 499000,
    features: [
      'Đăng không giới hạn',
      'Ưu tiên cao nhất',
      'Hỗ trợ VIP',
      'Thời hạn 365 ngày',
      'Tính năng AI nâng cao',
    ],
    color: '#F59E0B',
  },
] as const;

// Social login providers
export const SOCIAL_PROVIDERS = {
  GOOGLE: 'google',
  FACEBOOK: 'facebook',
  ZALO: 'zalo',
} as const;

// API base URLs
export const API_BASE_URLS = {
  PROSAI: 'https://api-v1.prosai.vn',
  ZALO_OAUTH: 'https://oauth.zaloapp.com/v4',
  ZALO_GRAPH: 'https://graph.zalo.me/v2.0',
} as const;

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Không thể kết nối đến server',
  UNAUTHORIZED: 'Email hoặc mật khẩu không chính xác',
  FORBIDDEN: 'Tài khoản đã bị khóa hoặc chưa được xác thực',
  RATE_LIMIT: 'Quá nhiều lần thử, vui lòng thử lại sau',
  SERVER_ERROR: 'Lỗi server, vui lòng thử lại sau',
  UNKNOWN_ERROR: 'Đã có lỗi xảy ra, vui lòng thử lại',
} as const;
