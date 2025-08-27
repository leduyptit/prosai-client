// Date formatting utilities
export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateTime = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Format date to relative time in Vietnamese
 * @param dateString - ISO date string or Date object
 * @returns Formatted relative time string
 */
export const formatRelativeTime = (dateString: string | Date): string => {
  const now = new Date();
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Vừa xong';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} phút trước`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} giờ trước`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} ngày trước`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} tuần trước`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} tháng trước`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} năm trước`;
};


// Currency formatting
export const formatCurrency = (amount: number, currency = 'VND'): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency,
  }).format(amount);
};

// Price formatting for Vietnamese real estate
export const formatPrice = (price: number): string => {
  if (!price || price === 0) return 'Liên hệ';
  
  const parts = price.toString().split(',');
  const minPrice = parseFloat(parts[0]);
  const maxPrice = parts[1] ? parseFloat(parts[1]) : minPrice;
  
  if (minPrice < 1000) {
    const unit = 'triệu';
    return minPrice === maxPrice 
      ? `${minPrice.toFixed(1)} ${unit}`
      : `${minPrice.toFixed(1)} - ${maxPrice.toFixed(1)} ${unit}`;
  } else {
    const unit = 'tỷ';
    const minBillion = (minPrice / 1000).toFixed(1);
    const maxBillion = (maxPrice / 1000).toFixed(1);
    return minPrice === maxPrice 
      ? `${minBillion} ${unit}`
      : `${minBillion} - ${maxBillion} ${unit}`;
  }
};

// Area formatting
export const formatArea = (area: number): string => {
  if (!area || area === 0) return 'Liên hệ';
  
  const parts = area.toString().split(',');
  const minArea = parts[0];
  const maxArea = parts[1] || minArea;
  
  return minArea === maxArea 
    ? `${minArea} m²`
    : `${minArea} - ${maxArea} m²`;
};

// Number formatting
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

// File size formatting
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// String utilities
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const truncate = (str: string, length: number): string => {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}; 