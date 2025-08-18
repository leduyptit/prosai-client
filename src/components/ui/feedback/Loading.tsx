import React from 'react';

interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
  className?: string;
  variant?: 'fullscreen' | 'inline' | 'centered';
  spinnerType?: 'spinner' | 'dots' | 'pulse';
}

const Loading: React.FC<LoadingProps> = ({ 
  size = 'medium', 
  text = 'Đang tải...', 
  className = '',
  variant = 'fullscreen',
  spinnerType = 'spinner'
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  const textSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  const variantClasses = {
    fullscreen: 'min-h-screen bg-gray-50',
    inline: 'min-h-0',
    centered: 'min-h-0 flex items-center justify-center'
  };

  const renderSpinner = () => {
    switch (spinnerType) {
      case 'dots':
        return (
          <div className="flex space-x-1 mb-4">
            <div className={`${sizeClasses[size]} bg-blue-600 rounded-full animate-bounce`} style={{ animationDelay: '0ms' }}></div>
            <div className={`${sizeClasses[size]} bg-blue-600 rounded-full animate-bounce`} style={{ animationDelay: '150ms' }}></div>
            <div className={`${sizeClasses[size]} bg-blue-600 rounded-full animate-bounce`} style={{ animationDelay: '300ms' }}></div>
          </div>
        );
      case 'pulse':
        return (
          <div className={`${sizeClasses[size]} bg-blue-600 rounded-full animate-pulse mb-4`}></div>
        );
      case 'spinner':
      default:
        return (
          <div className={`${sizeClasses[size]} border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4`}></div>
        );
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center ${variantClasses[variant]} ${className}`}>
      {renderSpinner()}
      {text && <p className={`text-gray-600 ${textSizeClasses[size]}`}>{text}</p>}
    </div>
  );
};

export default Loading;
