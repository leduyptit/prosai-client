import React from 'react';
import Loading from './Loading';

interface LoadingWrapperProps {
  children: React.ReactNode;
  loading: boolean;
  loadingText?: string;
  loadingSize?: 'small' | 'medium' | 'large';
  loadingVariant?: 'fullscreen' | 'inline' | 'centered';
  loadingSpinnerType?: 'spinner' | 'dots' | 'pulse';
  fallback?: React.ReactNode;
  className?: string;
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({
  children,
  loading,
  loadingText = 'Đang tải...',
  loadingSize = 'medium',
  loadingVariant = 'inline',
  loadingSpinnerType = 'spinner',
  fallback,
  className = ''
}) => {
  if (loading) {
    if (fallback) {
      return <>{fallback}</>;
    }
    
    return (
      <Loading
        size={loadingSize}
        text={loadingText}
        variant={loadingVariant}
        spinnerType={loadingSpinnerType}
        className={className}
      />
    );
  }

  return <>{children}</>;
};

export default LoadingWrapper;
