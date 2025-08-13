'use client';

import React from 'react';
import { Badge as AntBadge } from 'antd';
import type { BadgeProps as AntBadgeProps } from 'antd';

interface BadgeProps extends Omit<AntBadgeProps, 'size'> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'processing';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  children?: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'medium',
  className = '',
  children,
  ...props
}) => {
  const getStatus = () => {
    switch (variant) {
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      case 'processing':
        return 'processing';
      default:
        return 'default';
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'badge-sm';
      case 'large':
        return 'badge-lg';
      default:
        return 'badge-md';
    }
  };

  return (
    <AntBadge
      status={getStatus()}
      className={`${getSizeClass()} ${className}`}
      {...props}
    >
      {children}
    </AntBadge>
  );
};

export default Badge; 