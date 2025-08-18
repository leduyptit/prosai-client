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

// Relative time formatting in Vietnamese
export const formatRelativeTime = (date: Date | string): string => {
  const now = new Date();
  const targetDate = new Date(date);
  const diffInMs = now.getTime() - targetDate.getTime();
  
  const minutes = Math.floor(diffInMs / (1000 * 60));
  const hours = Math.floor(diffInMs / (1000 * 60 * 60));
  const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);
  
  if (years > 0) {
    return `${years} năm trước`;
  } else if (months > 0) {
    return `${months} tháng trước`;
  } else if (days > 0) {
    return `${days} ngày trước`;
  } else if (hours > 0) {
    return `${hours} giờ trước`;
  } else if (minutes > 0) {
    return `${minutes} phút trước`;
  } else {
    return 'Vừa xong';
  }
};


// Currency formatting
export const formatCurrency = (amount: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
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