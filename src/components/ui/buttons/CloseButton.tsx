'use client';

import React from 'react';
import IconButton from './IconButton';

interface CloseButtonProps {
  onClick: () => void;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  variant?: 'default' | 'circular' | 'ghost';
}

const CloseButton: React.FC<CloseButtonProps> = ({
  onClick,
  size = 'medium',
  className = '',
  variant = 'default'
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'circular':
        return 'rounded-full bg-gray-100 hover:bg-gray-200';
      case 'ghost':
        return 'hover:bg-gray-100';
      default:
        return 'rounded-full bg-gray-100 hover:bg-gray-200';
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'w-6 h-6';
      case 'large':
        return 'w-10 h-10';
      default:
        return 'w-8 h-8';
    }
  };

  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center transition-colors
        ${getVariantClass()} ${getSizeClass()} ${className}
      `}
      aria-label="Close"
    >
      <svg 
        className="w-4 h-4" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M6 18L18 6M6 6l12 12" 
        />
      </svg>
    </button>
  );
};

export default CloseButton; 