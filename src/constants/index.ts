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

// Districts by city
export const DISTRICTS = {
  'Hà Nội': [
    { value: 'Ba Đình', label: 'Ba Đình', searchCount: 25678 },
    { value: 'Hoàn Kiếm', label: 'Hoàn Kiếm', searchCount: 15432 },
    { value: 'Tây Hồ', label: 'Tây Hồ', searchCount: 14321 },
    { value: 'Long Biên', label: 'Long Biên', searchCount: 28945 },
    { value: 'Cầu Giấy', label: 'Cầu Giấy', searchCount: 33987 },
    { value: 'Đống Đa', label: 'Đống Đa', searchCount: 19876 },
    { value: 'Hai Bà Trưng', label: 'Hai Bà Trưng', searchCount: 16543 },
    { value: 'Hoàng Mai', label: 'Hoàng Mai', searchCount: 13210 },
    { value: 'Thanh Xuân', label: 'Thanh Xuân', searchCount: 21234 },
    { value: 'Hà Đông', label: 'Hà Đông', searchCount: 23456 },
    { value: 'Sơn Tây', label: 'Sơn Tây', searchCount: 8765 },
    { value: 'Bắc Từ Liêm', label: 'Bắc Từ Liêm', searchCount: 18765 },
    { value: 'Nam Từ Liêm', label: 'Nam Từ Liêm', searchCount: 17654 },
    { value: 'Mê Linh', label: 'Mê Linh', searchCount: 5432 },
    { value: 'Sóc Sơn', label: 'Sóc Sơn', searchCount: 4321 },
    { value: 'Đông Anh', label: 'Đông Anh', searchCount: 3210 },
    { value: 'Gia Lâm', label: 'Gia Lâm', searchCount: 2109 },
    { value: 'Quốc Oai', label: 'Quốc Oai', searchCount: 1098 },
    { value: 'Thạch Thất', label: 'Thạch Thất', searchCount: 987 },
    { value: 'Chương Mỹ', label: 'Chương Mỹ', searchCount: 876 },
    { value: 'Thanh Oai', label: 'Thanh Oai', searchCount: 765 },
    { value: 'Thường Tín', label: 'Thường Tín', searchCount: 654 },
    { value: 'Phú Xuyên', label: 'Phú Xuyên', searchCount: 543 },
    { value: 'Ứng Hòa', label: 'Ứng Hòa', searchCount: 432 },
    { value: 'Mỹ Đức', label: 'Mỹ Đức', searchCount: 321 },
  ],
  'Hồ Chí Minh': [
    { value: 'Quận 1', label: 'Quận 1', searchCount: 45678 },
    { value: 'Quận 2', label: 'Quận 2', searchCount: 42345 },
    { value: 'Quận 3', label: 'Quận 3', searchCount: 39876 },
    { value: 'Quận 4', label: 'Quận 4', searchCount: 37654 },
    { value: 'Quận 5', label: 'Quận 5', searchCount: 35432 },
    { value: 'Quận 6', label: 'Quận 6', searchCount: 33210 },
    { value: 'Quận 7', label: 'Quận 7', searchCount: 31987 },
    { value: 'Quận 8', label: 'Quận 8', searchCount: 30765 },
    { value: 'Quận 9', label: 'Quận 9', searchCount: 29543 },
    { value: 'Quận 10', label: 'Quận 10', searchCount: 28321 },
    { value: 'Quận 11', label: 'Quận 11', searchCount: 27098 },
    { value: 'Quận 12', label: 'Quận 12', searchCount: 25876 },
    { value: 'Thủ Đức', label: 'Thủ Đức', searchCount: 24654 },
    { value: 'Gò Vấp', label: 'Gò Vấp', searchCount: 23432 },
    { value: 'Bình Thạnh', label: 'Bình Thạnh', searchCount: 22210 },
    { value: 'Tân Bình', label: 'Tân Bình', searchCount: 20987 },
    { value: 'Tân Phú', label: 'Tân Phú', searchCount: 19765 },
    { value: 'Phú Nhuận', label: 'Phú Nhuận', searchCount: 18543 },
    { value: 'Bình Tân', label: 'Bình Tân', searchCount: 17321 },
    { value: 'Củ Chi', label: 'Củ Chi', searchCount: 16098 },
    { value: 'Hóc Môn', label: 'Hóc Môn', searchCount: 14876 },
    { value: 'Bình Chánh', label: 'Bình Chánh', searchCount: 13654 },
    { value: 'Nhà Bè', label: 'Nhà Bè', searchCount: 12432 },
    { value: 'Cần Giờ', label: 'Cần Giờ', searchCount: 11210 },
  ],
  'Đà Nẵng': [
    { value: 'Quận Hải Châu', label: 'Quận Hải Châu', searchCount: 12345 },
    { value: 'Quận Thanh Khê', label: 'Quận Thanh Khê', searchCount: 11234 },
    { value: 'Quận Sơn Trà', label: 'Quận Sơn Trà', searchCount: 10123 },
    { value: 'Quận Ngũ Hành Sơn', label: 'Quận Ngũ Hành Sơn', searchCount: 9012 },
    { value: 'Quận Liên Chiểu', label: 'Quận Liên Chiểu', searchCount: 8901 },
    { value: 'Quận Cẩm Lệ', label: 'Quận Cẩm Lệ', searchCount: 8790 },
    { value: 'Huyện Hòa Vang', label: 'Huyện Hòa Vang', searchCount: 5678 },
    { value: 'Huyện Hoàng Sa', label: 'Huyện Hoàng Sa', searchCount: 4567 },
  ],
  'Hải Phòng': [
    { value: 'Quận Hồng Bàng', label: 'Quận Hồng Bàng', searchCount: 8765 },
    { value: 'Quận Ngô Quyền', label: 'Quận Ngô Quyền', searchCount: 7654 },
    { value: 'Quận Lê Chân', label: 'Quận Lê Chân', searchCount: 6543 },
    { value: 'Quận Hải An', label: 'Quận Hải An', searchCount: 5432 },
    { value: 'Quận Kiến An', label: 'Quận Kiến An', searchCount: 4321 },
    { value: 'Quận Đồ Sơn', label: 'Quận Đồ Sơn', searchCount: 3210 },
    { value: 'Quận Dương Kinh', label: 'Quận Dương Kinh', searchCount: 2109 },
    { value: 'Huyện Thuỷ Nguyên', label: 'Huyện Thuỷ Nguyên', searchCount: 1098 },
    { value: 'Huyện An Dương', label: 'Huyện An Dương', searchCount: 987 },
    { value: 'Huyện An Lão', label: 'Huyện An Lão', searchCount: 876 },
    { value: 'Huyện Kiến Thuỵ', label: 'Huyện Kiến Thuỵ', searchCount: 765 },
    { value: 'Huyện Tiên Lãng', label: 'Huyện Tiên Lãng', searchCount: 654 },
    { value: 'Huyện Vĩnh Bảo', label: 'Huyện Vĩnh Bảo', searchCount: 543 },
    { value: 'Huyện Cát Hải', label: 'Huyện Cát Hải', searchCount: 432 },
    { value: 'Huyện Bạch Long Vĩ', label: 'Huyện Bạch Long Vĩ', searchCount: 321 },
  ],
  'Cần Thơ': [
    { value: 'Quận Ninh Kiều', label: 'Quận Ninh Kiều', searchCount: 5432 },
    { value: 'Quận Ô Môn', label: 'Quận Ô Môn', searchCount: 4321 },
    { value: 'Quận Bình Thuỷ', label: 'Quận Bình Thuỷ', searchCount: 3210 },
    { value: 'Quận Cái Răng', label: 'Quận Cái Răng', searchCount: 2109 },
    { value: 'Quận Thốt Nốt', label: 'Quận Thốt Nốt', searchCount: 1098 },
    { value: 'Huyện Vĩnh Thạnh', label: 'Huyện Vĩnh Thạnh', searchCount: 987 },
    { value: 'Huyện Cờ Đỏ', label: 'Huyện Cờ Đỏ', searchCount: 876 },
    { value: 'Huyện Phong Điền', label: 'Huyện Phong Điền', searchCount: 765 },
    { value: 'Huyện Thới Lai', label: 'Huyện Thới Lai', searchCount: 654 },
  ],
  'Bình Dương': [
    { value: 'Thành phố Thủ Dầu Một', label: 'Thành phố Thủ Dầu Một', searchCount: 8765 },
    { value: 'Thị xã Dĩ An', label: 'Thị xã Dĩ An', searchCount: 7654 },
    { value: 'Thị xã Thuận An', label: 'Thị xã Thuận An', searchCount: 6543 },
    { value: 'Thị xã Tân Uyên', label: 'Thị xã Tân Uyên', searchCount: 5432 },
    { value: 'Huyện Bến Cát', label: 'Huyện Bến Cát', searchCount: 4321 },
    { value: 'Huyện Dầu Tiếng', label: 'Huyện Dầu Tiếng', searchCount: 3210 },
    { value: 'Huyện Phú Giáo', label: 'Huyện Phú Giáo', searchCount: 2109 },
    { value: 'Huyện Bàu Bàng', label: 'Huyện Bàu Bàng', searchCount: 1098 },
    { value: 'Huyện Bắc Tân Uyên', label: 'Huyện Bắc Tân Uyên', searchCount: 987 },
  ],
  'Long An': [
    { value: 'Thành phố Tân An', label: 'Thành phố Tân An', searchCount: 5432 },
    { value: 'Thị xã Kiến Tường', label: 'Thị xã Kiến Tường', searchCount: 4321 },
    { value: 'Huyện Tân Hưng', label: 'Huyện Tân Hưng', searchCount: 3210 },
    { value: 'Huyện Vĩnh Hưng', label: 'Huyện Vĩnh Hưng', searchCount: 2109 },
    { value: 'Huyện Mộc Hóa', label: 'Huyện Mộc Hóa', searchCount: 1098 },
    { value: 'Huyện Tân Thạnh', label: 'Huyện Tân Thạnh', searchCount: 987 },
    { value: 'Huyện Thạnh Hóa', label: 'Huyện Thạnh Hóa', searchCount: 876 },
    { value: 'Huyện Đức Huệ', label: 'Huyện Đức Huệ', searchCount: 765 },
    { value: 'Huyện Đức Hòa', label: 'Huyện Đức Hòa', searchCount: 654 },
    { value: 'Huyện Bến Lức', label: 'Huyện Bến Lức', searchCount: 543 },
    { value: 'Huyện Thủ Thừa', label: 'Huyện Thủ Thừa', searchCount: 432 },
    { value: 'Huyện Tân Trụ', label: 'Huyện Tân Trụ', searchCount: 321 },
    { value: 'Huyện Cần Đước', label: 'Huyện Cần Đước', searchCount: 210 },
    { value: 'Huyện Cần Giuộc', label: 'Huyện Cần Giuộc', searchCount: 109 },
    { value: 'Huyện Châu Thành', label: 'Huyện Châu Thành', searchCount: 98 },
  ],
  'Tiền Giang': [
    { value: 'Thành phố Mỹ Tho', label: 'Thành phố Mỹ Tho', searchCount: 4321 },
    { value: 'Thị xã Gò Công', label: 'Thị xã Gò Công', searchCount: 3210 },
    { value: 'Thị xã Cai Lậy', label: 'Thị xã Cai Lậy', searchCount: 2109 },
    { value: 'Huyện Tân Phước', label: 'Huyện Tân Phước', searchCount: 1098 },
    { value: 'Huyện Cái Bè', label: 'Huyện Cái Bè', searchCount: 987 },
    { value: 'Huyện Cai Lậy', label: 'Huyện Cai Lậy', searchCount: 876 },
    { value: 'Huyện Châu Thành', label: 'Huyện Châu Thành', searchCount: 765 },
    { value: 'Huyện Chợ Gạo', label: 'Huyện Chợ Gạo', searchCount: 654 },
    { value: 'Huyện Gò Công Tây', label: 'Huyện Gò Công Tây', searchCount: 543 },
    { value: 'Huyện Gò Công Đông', label: 'Huyện Gò Công Đông', searchCount: 432 },
    { value: 'Huyện Tân Phú Đông', label: 'Huyện Tân Phú Đông', searchCount: 321 },
  ],
  'Bình Thuận': [
    { value: 'Thành phố Phan Thiết', label: 'Thành phố Phan Thiết', searchCount: 3210 },
    { value: 'Thị xã La Gi', label: 'Thị xã La Gi', searchCount: 2109 },
    { value: 'Huyện Tuy Phong', label: 'Huyện Tuy Phong', searchCount: 1098 },
    { value: 'Huyện Bắc Bình', label: 'Huyện Bắc Bình', searchCount: 987 },
    { value: 'Huyện Hàm Thuận Bắc', label: 'Huyện Hàm Thuận Bắc', searchCount: 876 },
    { value: 'Huyện Hàm Thuận Nam', label: 'Huyện Hàm Thuận Nam', searchCount: 765 },
    { value: 'Huyện Tánh Linh', label: 'Huyện Tánh Linh', searchCount: 654 },
    { value: 'Huyện Đức Linh', label: 'Huyện Đức Linh', searchCount: 543 },
    { value: 'Huyện Hàm Tân', label: 'Huyện Hàm Tân', searchCount: 432 },
    { value: 'Huyện Phú Quí', label: 'Huyện Phú Quí', searchCount: 321 },
  ],
  'Khánh Hòa': [
    { value: 'Thành phố Nha Trang', label: 'Thành phố Nha Trang', searchCount: 5432 },
    { value: 'Thành phố Cam Ranh', label: 'Thành phố Cam Ranh', searchCount: 4321 },
    { value: 'Huyện Cam Lâm', label: 'Huyện Cam Lâm', searchCount: 3210 },
    { value: 'Huyện Vạn Ninh', label: 'Huyện Vạn Ninh', searchCount: 2109 },
    { value: 'Thị xã Ninh Hòa', label: 'Thị xã Ninh Hòa', searchCount: 1098 },
    { value: 'Huyện Khánh Vĩnh', label: 'Huyện Khánh Vĩnh', searchCount: 987 },
    { value: 'Huyện Diên Khánh', label: 'Huyện Diên Khánh', searchCount: 876 },
    { value: 'Huyện Khánh Sơn', label: 'Huyện Khánh Sơn', searchCount: 765 },
    { value: 'Huyện Trường Sa', label: 'Huyện Trường Sa', searchCount: 654 },
  ],
  'Lâm Đồng': [
    { value: 'Thành phố Đà Lạt', label: 'Thành phố Đà Lạt', searchCount: 4321 },
    { value: 'Thành phố Bảo Lộc', label: 'Thành phố Bảo Lộc', searchCount: 3210 },
    { value: 'Huyện Đam Rông', label: 'Huyện Đam Rông', searchCount: 2109 },
    { value: 'Huyện Lạc Dương', label: 'Huyện Lạc Dương', searchCount: 1098 },
    { value: 'Huyện Lâm Hà', label: 'Huyện Lâm Hà', searchCount: 987 },
    { value: 'Huyện Đơn Dương', label: 'Huyện Đơn Dương', searchCount: 876 },
    { value: 'Huyện Đức Trọng', label: 'Huyện Đức Trọng', searchCount: 765 },
    { value: 'Huyện Di Linh', label: 'Huyện Di Linh', searchCount: 654 },
    { value: 'Huyện Bảo Lâm', label: 'Huyện Bảo Lâm', searchCount: 543 },
    { value: 'Huyện Đạ Huoai', label: 'Huyện Đạ Huoai', searchCount: 432 },
    { value: 'Huyện Đạ Tẻh', label: 'Huyện Đạ Tẻh', searchCount: 321 },
    { value: 'Huyện Cát Tiên', label: 'Huyện Cát Tiên', searchCount: 210 },
  ],
  'An Giang': [
    { value: 'Thành phố Long Xuyên', label: 'Thành phố Long Xuyên', searchCount: 3210 },
    { value: 'Thành phố Châu Đốc', label: 'Thành phố Châu Đốc', searchCount: 2109 },
    { value: 'Huyện An Phú', label: 'Huyện An Phú', searchCount: 1098 },
    { value: 'Thị xã Tân Châu', label: 'Thị xã Tân Châu', searchCount: 987 },
    { value: 'Huyện Phú Tân', label: 'Huyện Phú Tân', searchCount: 876 },
    { value: 'Huyện Châu Phú', label: 'Huyện Châu Phú', searchCount: 765 },
    { value: 'Huyện Tịnh Biên', label: 'Huyện Tịnh Biên', searchCount: 654 },
    { value: 'Huyện Tri Tôn', label: 'Huyện Tri Tôn', searchCount: 543 },
    { value: 'Huyện Châu Thành', label: 'Huyện Châu Thành', searchCount: 432 },
    { value: 'Huyện Chợ Mới', label: 'Huyện Chợ Mới', searchCount: 321 },
    { value: 'Huyện Thoại Sơn', label: 'Huyện Thoại Sơn', searchCount: 210 },
  ],
  'Kiên Giang': [
    { value: 'Thành phố Rạch Giá', label: 'Thành phố Rạch Giá', searchCount: 2109 },
    { value: 'Thành phố Hà Tiên', label: 'Thành phố Hà Tiên', searchCount: 1098 },
    { value: 'Huyện Kiên Lương', label: 'Huyện Kiên Lương', searchCount: 987 },
    { value: 'Huyện Hòn Đất', label: 'Huyện Hòn Đất', searchCount: 876 },
    { value: 'Huyện Tân Hiệp', label: 'Huyện Tân Hiệp', searchCount: 765 },
    { value: 'Huyện Châu Thành', label: 'Huyện Châu Thành', searchCount: 654 },
    { value: 'Huyện Giồng Riềng', label: 'Huyện Giồng Riềng', searchCount: 543 },
    { value: 'Huyện Gò Quao', label: 'Huyện Gò Quao', searchCount: 432 },
    { value: 'Huyện An Biên', label: 'Huyện An Biên', searchCount: 321 },
    { value: 'Huyện An Minh', label: 'Huyện An Minh', searchCount: 210 },
    { value: 'Huyện Vĩnh Thuận', label: 'Huyện Vĩnh Thuận', searchCount: 109 },
    { value: 'Huyện Phú Quốc', label: 'Huyện Phú Quốc', searchCount: 98 },
    { value: 'Huyện Kiên Hải', label: 'Huyện Kiên Hải', searchCount: 87 },
    { value: 'Huyện U Minh Thượng', label: 'Huyện U Minh Thượng', searchCount: 76 },
  ],
  'Trà Vinh': [
    { value: 'Thành phố Trà Vinh', label: 'Thành phố Trà Vinh', searchCount: 1098 },
    { value: 'Huyện Càng Long', label: 'Huyện Càng Long', searchCount: 987 },
    { value: 'Huyện Cầu Kè', label: 'Huyện Cầu Kè', searchCount: 876 },
    { value: 'Huyện Tiểu Cần', label: 'Huyện Tiểu Cần', searchCount: 765 },
    { value: 'Huyện Châu Thành', label: 'Huyện Châu Thành', searchCount: 654 },
    { value: 'Huyện Cầu Ngang', label: 'Huyện Cầu Ngang', searchCount: 543 },
    { value: 'Huyện Trà Cú', label: 'Huyện Trà Cú', searchCount: 432 },
    { value: 'Huyện Duyên Hải', label: 'Huyện Duyên Hải', searchCount: 321 },
    { value: 'Thị xã Duyên Hải', label: 'Thị xã Duyên Hải', searchCount: 210 },
  ],
  'Sóc Trăng': [
    { value: 'Thành phố Sóc Trăng', label: 'Thành phố Sóc Trăng', searchCount: 987 },
    { value: 'Huyện Châu Thành', label: 'Huyện Châu Thành', searchCount: 876 },
    { value: 'Huyện Kế Sách', label: 'Huyện Kế Sách', searchCount: 765 },
    { value: 'Huyện Mỹ Tú', label: 'Huyện Mỹ Tú', searchCount: 654 },
    { value: 'Huyện Cù Lao Dung', label: 'Huyện Cù Lao Dung', searchCount: 543 },
    { value: 'Huyện Long Phú', label: 'Huyện Long Phú', searchCount: 432 },
    { value: 'Huyện Mỹ Xuyên', label: 'Huyện Mỹ Xuyên', searchCount: 321 },
    { value: 'Thị xã Ngã Năm', label: 'Thị xã Ngã Năm', searchCount: 210 },
    { value: 'Huyện Thạnh Trị', label: 'Huyện Thạnh Trị', searchCount: 109 },
    { value: 'Thị xã Vĩnh Châu', label: 'Thị xã Vĩnh Châu', searchCount: 98 },
  ],
  'Bạc Liêu': [
    { value: 'Thành phố Bạc Liêu', label: 'Thành phố Bạc Liêu', searchCount: 876 },
    { value: 'Huyện Hồng Dân', label: 'Huyện Hồng Dân', searchCount: 765 },
    { value: 'Huyện Phước Long', label: 'Huyện Phước Long', searchCount: 654 },
    { value: 'Huyện Vĩnh Lợi', label: 'Huyện Vĩnh Lợi', searchCount: 543 },
    { value: 'Thị xã Giá Rai', label: 'Thị xã Giá Rai', searchCount: 432 },
    { value: 'Huyện Đông Hải', label: 'Huyện Đông Hải', searchCount: 321 },
    { value: 'Huyện Hoà Bình', label: 'Huyện Hoà Bình', searchCount: 210 },
  ],
  'Cà Mau': [
    { value: 'Thành phố Cà Mau', label: 'Thành phố Cà Mau', searchCount: 765 },
    { value: 'Huyện U Minh', label: 'Huyện U Minh', searchCount: 654 },
    { value: 'Huyện Thới Bình', label: 'Huyện Thới Bình', searchCount: 543 },
    { value: 'Huyện Trần Văn Thời', label: 'Huyện Trần Văn Thời', searchCount: 432 },
    { value: 'Huyện Cái Nước', label: 'Huyện Cái Nước', searchCount: 321 },
    { value: 'Huyện Đầm Dơi', label: 'Huyện Đầm Dơi', searchCount: 210 },
    { value: 'Huyện Năm Căn', label: 'Huyện Năm Căn', searchCount: 109 },
    { value: 'Huyện Phú Tân', label: 'Huyện Phú Tân', searchCount: 98 },
    { value: 'Huyện Ngọc Hiển', label: 'Huyện Ngọc Hiển', searchCount: 87 },
  ],
  'Đồng Tháp': [
    { value: 'Thành phố Cao Lãnh', label: 'Thành phố Cao Lãnh', searchCount: 654 },
    { value: 'Thành phố Sa Đéc', label: 'Thành phố Sa Đéc', searchCount: 543 },
    { value: 'Thị xã Hồng Ngự', label: 'Thị xã Hồng Ngự', searchCount: 432 },
    { value: 'Huyện Tân Hồng', label: 'Huyện Tân Hồng', searchCount: 321 },
    { value: 'Huyện Hồng Ngự', label: 'Huyện Hồng Ngự', searchCount: 210 },
    { value: 'Huyện Tam Nông', label: 'Huyện Tam Nông', searchCount: 109 },
    { value: 'Huyện Tháp Mười', label: 'Huyện Tháp Mười', searchCount: 98 },
    { value: 'Huyện Cao Lãnh', label: 'Huyện Cao Lãnh', searchCount: 87 },
    { value: 'Huyện Thanh Bình', label: 'Huyện Thanh Bình', searchCount: 76 },
    { value: 'Huyện Lấp Vò', label: 'Huyện Lấp Vò', searchCount: 65 },
    { value: 'Huyện Lai Vung', label: 'Huyện Lai Vung', searchCount: 54 },
    { value: 'Huyện Châu Thành', label: 'Huyện Châu Thành', searchCount: 43 },
  ],
  'Vĩnh Long': [
    { value: 'Thành phố Vĩnh Long', label: 'Thành phố Vĩnh Long', searchCount: 543 },
    { value: 'Huyện Long Hồ', label: 'Huyện Long Hồ', searchCount: 432 },
    { value: 'Huyện Mang Thít', label: 'Huyện Mang Thít', searchCount: 321 },
    { value: 'Huyện Vũng Liêm', label: 'Huyện Vũng Liêm', searchCount: 210 },
    { value: 'Huyện Tam Bình', label: 'Huyện Tam Bình', searchCount: 109 },
    { value: 'Thị xã Bình Minh', label: 'Thị xã Bình Minh', searchCount: 98 },
    { value: 'Huyện Trà Ôn', label: 'Huyện Trà Ôn', searchCount: 87 },
    { value: 'Huyện Bình Tân', label: 'Huyện Bình Tân', searchCount: 76 },
  ],
  'Bình Phước': [
    { value: 'Thành phố Đồng Xoài', label: 'Thành phố Đồng Xoài', searchCount: 432 },
    { value: 'Thị xã Bình Long', label: 'Thị xã Bình Long', searchCount: 321 },
    { value: 'Thị xã Bù Đăng', label: 'Thị xã Bù Đăng', searchCount: 210 },
    { value: 'Huyện Bù Gia Mập', label: 'Huyện Bù Gia Mập', searchCount: 109 },
    { value: 'Huyện Lộc Ninh', label: 'Huyện Lộc Ninh', searchCount: 98 },
    { value: 'Huyện Bù Đốp', label: 'Huyện Bù Đốp', searchCount: 87 },
    { value: 'Huyện Hớn Quản', label: 'Huyện Hớn Quản', searchCount: 76 },
    { value: 'Huyện Đồng Phú', label: 'Huyện Đồng Phú', searchCount: 65 },
    { value: 'Huyện Bù Đăng', label: 'Huyện Bù Đăng', searchCount: 54 },
    { value: 'Huyện Chơn Thành', label: 'Huyện Chơn Thành', searchCount: 43 },
    { value: 'Huyện Phú Riềng', label: 'Huyện Phú Riềng', searchCount: 32 },
  ],
  'Tây Ninh': [
    { value: 'Thành phố Tây Ninh', label: 'Thành phố Tây Ninh', searchCount: 321 },
    { value: 'Huyện Tân Biên', label: 'Huyện Tân Biên', searchCount: 210 },
    { value: 'Huyện Tân Châu', label: 'Huyện Tân Châu', searchCount: 109 },
    { value: 'Huyện Dương Minh Châu', label: 'Huyện Dương Minh Châu', searchCount: 98 },
    { value: 'Huyện Châu Thành', label: 'Huyện Châu Thành', searchCount: 87 },
    { value: 'Thị xã Hòa Thành', label: 'Thị xã Hòa Thành', searchCount: 76 },
    { value: 'Huyện Bến Cầu', label: 'Huyện Bến Cầu', searchCount: 65 },
    { value: 'Thị xã Trảng Bàng', label: 'Thị xã Trảng Bàng', searchCount: 54 },
    { value: 'Huyện Gò Dầu', label: 'Huyện Gò Dầu', searchCount: 43 },
  ],
  'Phú Yên': [
    { value: 'Thành phố Tuy Hòa', label: 'Thành phố Tuy Hòa', searchCount: 210 },
    { value: 'Thị xã Sông Cầu', label: 'Thị xã Sông Cầu', searchCount: 109 },
    { value: 'Huyện Đồng Xuân', label: 'Huyện Đồng Xuân', searchCount: 98 },
    { value: 'Huyện Tuy An', label: 'Huyện Tuy An', searchCount: 87 },
    { value: 'Huyện Sơn Hòa', label: 'Huyện Sơn Hòa', searchCount: 76 },
    { value: 'Huyện Sông Hinh', label: 'Huyện Sông Hinh', searchCount: 65 },
    { value: 'Huyện Tây Hòa', label: 'Huyện Tây Hòa', searchCount: 54 },
    { value: 'Huyện Phú Hòa', label: 'Huyện Phú Hòa', searchCount: 43 },
    { value: 'Thị xã Đông Hòa', label: 'Thị xã Đông Hòa', searchCount: 32 },
  ],
  'Quảng Trị': [
    { value: 'Thành phố Đông Hà', label: 'Thành phố Đông Hà', searchCount: 109 },
    { value: 'Thị xã Quảng Trị', label: 'Thị xã Quảng Trị', searchCount: 98 },
    { value: 'Huyện Vĩnh Linh', label: 'Huyện Vĩnh Linh', searchCount: 87 },
    { value: 'Huyện Hướng Hóa', label: 'Huyện Hướng Hóa', searchCount: 76 },
    { value: 'Huyện Gio Linh', label: 'Huyện Gio Linh', searchCount: 65 },
    { value: 'Huyện Đa Krông', label: 'Huyện Đa Krông', searchCount: 54 },
    { value: 'Huyện Cam Lộ', label: 'Huyện Cam Lộ', searchCount: 43 },
    { value: 'Huyện Triệu Phong', label: 'Huyện Triệu Phong', searchCount: 32 },
    { value: 'Huyện Hải Lăng', label: 'Huyện Hải Lăng', searchCount: 21 },
    { value: 'Huyện Cồn Cỏ', label: 'Huyện Cồn Cỏ', searchCount: 10 },
  ],
  'Thừa Thiên Huế': [
    { value: 'Thành phố Huế', label: 'Thành phố Huế', searchCount: 432 },
    { value: 'Thị xã Hương Thủy', label: 'Thị xã Hương Thủy', searchCount: 321 },
    { value: 'Thị xã Hương Trà', label: 'Thị xã Hương Trà', searchCount: 210 },
    { value: 'Huyện Phong Điền', label: 'Huyện Phong Điền', searchCount: 109 },
    { value: 'Huyện Quảng Điền', label: 'Huyện Quảng Điền', searchCount: 98 },
    { value: 'Huyện Phú Vang', label: 'Huyện Phú Vang', searchCount: 87 },
    { value: 'Thị xã A Lưới', label: 'Thị xã A Lưới', searchCount: 76 },
    { value: 'Huyện Phú Lộc', label: 'Huyện Phú Lộc', searchCount: 65 },
    { value: 'Huyện Nam Đông', label: 'Huyện Nam Đông', searchCount: 54 },
  ],
  'Quảng Bình': [
    { value: 'Thành phố Đồng Hới', label: 'Thành phố Đồng Hới', searchCount: 98 },
    { value: 'Huyện Minh Hóa', label: 'Huyện Minh Hóa', searchCount: 87 },
    { value: 'Huyện Tuyên Hóa', label: 'Huyện Tuyên Hóa', searchCount: 76 },
    { value: 'Huyện Quảng Trạch', label: 'Huyện Quảng Trạch', searchCount: 65 },
    { value: 'Huyện Bố Trạch', label: 'Huyện Bố Trạch', searchCount: 54 },
    { value: 'Huyện Quảng Ninh', label: 'Huyện Quảng Ninh', searchCount: 43 },
    { value: 'Huyện Lệ Thủy', label: 'Huyện Lệ Thủy', searchCount: 32 },
    { value: 'Thị xã Ba Đồn', label: 'Thị xã Ba Đồn', searchCount: 21 },
  ],
  'Hà Nam': [
    { value: 'Thành phố Phủ Lý', label: 'Thành phố Phủ Lý', searchCount: 87 },
    { value: 'Thị xã Duy Tiên', label: 'Thị xã Duy Tiên', searchCount: 76 },
    { value: 'Huyện Kim Bảng', label: 'Huyện Kim Bảng', searchCount: 65 },
    { value: 'Huyện Thanh Liêm', label: 'Huyện Thanh Liêm', searchCount: 54 },
    { value: 'Huyện Bình Lục', label: 'Huyện Bình Lục', searchCount: 43 },
    { value: 'Huyện Lý Nhân', label: 'Huyện Lý Nhân', searchCount: 32 },
  ],
  'Nam Định': [
    { value: 'Thành phố Nam Định', label: 'Thành phố Nam Định', searchCount: 76 },
    { value: 'Huyện Mỹ Lộc', label: 'Huyện Mỹ Lộc', searchCount: 65 },
    { value: 'Huyện Vụ Bản', label: 'Huyện Vụ Bản', searchCount: 54 },
    { value: 'Huyện Ý Yên', label: 'Huyện Ý Yên', searchCount: 43 },
    { value: 'Huyện Nghĩa Hưng', label: 'Huyện Nghĩa Hưng', searchCount: 32 },
    { value: 'Huyện Nam Trực', label: 'Huyện Nam Trực', searchCount: 21 },
    { value: 'Huyện Trực Ninh', label: 'Huyện Trực Ninh', searchCount: 10 },
    { value: 'Huyện Xuân Trường', label: 'Huyện Xuân Trường', searchCount: 9 },
    { value: 'Huyện Giao Thủy', label: 'Huyện Giao Thủy', searchCount: 8 },
    { value: 'Huyện Hải Hậu', label: 'Huyện Hải Hậu', searchCount: 7 },
  ],
  'Ninh Bình': [
    { value: 'Thành phố Ninh Bình', label: 'Thành phố Ninh Bình', searchCount: 65 },
    { value: 'Thành phố Tam Điệp', label: 'Thành phố Tam Điệp', searchCount: 54 },
    { value: 'Huyện Nho Quan', label: 'Huyện Nho Quan', searchCount: 43 },
    { value: 'Huyện Gia Viễn', label: 'Huyện Gia Viễn', searchCount: 32 },
    { value: 'Huyện Hoa Lư', label: 'Huyện Hoa Lư', searchCount: 21 },
    { value: 'Huyện Yên Khánh', label: 'Huyện Yên Khánh', searchCount: 10 },
    { value: 'Huyện Kim Sơn', label: 'Huyện Kim Sơn', searchCount: 9 },
    { value: 'Huyện Yên Mô', label: 'Huyện Yên Mô', searchCount: 8 },
  ],
  'Thái Bình': [
    { value: 'Thành phố Thái Bình', label: 'Thành phố Thái Bình', searchCount: 54 },
    { value: 'Huyện Quỳnh Phụ', label: 'Huyện Quỳnh Phụ', searchCount: 43 },
    { value: 'Huyện Hưng Hà', label: 'Huyện Hưng Hà', searchCount: 32 },
    { value: 'Huyện Đông Hưng', label: 'Huyện Đông Hưng', searchCount: 21 },
    { value: 'Huyện Thái Thụy', label: 'Huyện Thái Thụy', searchCount: 10 },
    { value: 'Huyện Tiền Hải', label: 'Huyện Tiền Hải', searchCount: 9 },
    { value: 'Huyện Kiến Xương', label: 'Huyện Kiến Xương', searchCount: 8 },
    { value: 'Huyện Vũ Thư', label: 'Huyện Vũ Thư', searchCount: 7 },
  ],
  'Hưng Yên': [
    { value: 'Thành phố Hưng Yên', label: 'Thành phố Hưng Yên', searchCount: 43 },
    { value: 'Huyện Văn Lâm', label: 'Huyện Văn Lâm', searchCount: 32 },
    { value: 'Huyện Văn Giang', label: 'Huyện Văn Giang', searchCount: 21 },
    { value: 'Huyện Yên Mỹ', label: 'Huyện Yên Mỹ', searchCount: 10 },
    { value: 'Thị xã Mỹ Hào', label: 'Thị xã Mỹ Hào', searchCount: 9 },
    { value: 'Huyện Ân Thi', label: 'Huyện Ân Thi', searchCount: 8 },
    { value: 'Huyện Khoái Châu', label: 'Huyện Khoái Châu', searchCount: 7 },
    { value: 'Huyện Kim Động', label: 'Huyện Kim Động', searchCount: 6 },
    { value: 'Huyện Tiên Lữ', label: 'Huyện Tiên Lữ', searchCount: 5 },
    { value: 'Huyện Phù Cừ', label: 'Huyện Phù Cừ', searchCount: 4 },
  ],
  'Hải Dương': [
    // TODO: Thêm districts cho Hải Dương
  ],
  'Bắc Giang': [
    // TODO: Thêm districts cho Bắc Giang
  ],
  'Bắc Ninh': [
    // TODO: Thêm districts cho Bắc Ninh
  ],
  'Phú Thọ': [
    // TODO: Thêm districts cho Phú Thọ
  ],
  'Vĩnh Phúc': [
    // TODO: Thêm districts cho Vĩnh Phúc
  ],
  'Thái Nguyên': [
    // TODO: Thêm districts cho Thái Nguyên
  ],
  'Lạng Sơn': [
    // TODO: Thêm districts cho Lạng Sơn
  ],
  'Cao Bằng': [
    // TODO: Thêm districts cho Cao Bằng
  ],
  'Bắc Kạn': [
    // TODO: Thêm districts cho Bắc Kạn
  ],
  'Tuyên Quang': [
    // TODO: Thêm districts cho Tuyên Quang
  ],
  'Hà Giang': [
    // TODO: Thêm districts cho Hà Giang
  ],
  'Lào Cai': [
    // TODO: Thêm districts cho Lào Cai
  ],
  'Yên Bái': [
    // TODO: Thêm districts cho Yên Bái
  ],
  'Lai Châu': [
    // TODO: Thêm districts cho Lai Châu
  ],
  'Sơn La': [
    // TODO: Thêm districts cho Sơn La
  ],
  'Điện Biên': [
    // TODO: Thêm districts cho Điện Biên
  ],
  'Hòa Bình': [
    // TODO: Thêm districts cho Hòa Bình
  ],
  'Nghệ An': [
    // TODO: Thêm districts cho Nghệ An
  ],
  'Hà Tĩnh': [
    // TODO: Thêm districts cho Hà Tĩnh
  ],
  'Quảng Nam': [
    // TODO: Thêm districts cho Quảng Nam
  ],
  'Quảng Ngãi': [
    // TODO: Thêm districts cho Quảng Ngãi
  ],
  'Bình Định': [
    // TODO: Thêm districts cho Bình Định
  ],
  'Gia Lai': [
    // TODO: Thêm districts cho Gia Lai
  ],
  'Kon Tum': [
    // TODO: Thêm districts cho Kon Tum
  ],
  'Đắk Lắk': [
    // TODO: Thêm districts cho Đắk Lắk
  ],
  'Đắk Nông': [
    // TODO: Thêm districts cho Đắk Nông
  ],
  'Ninh Thuận': [
    // TODO: Thêm districts cho Ninh Thuận
  ],
  'Đồng Nai': [
    // TODO: Thêm districts cho Đồng Nai
  ],
  'Bà Rịa - Vũng Tàu': [
    // TODO: Thêm districts cho Bà Rịa - Vũng Tàu
  ],
} as const;

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
