'use client';

import React from 'react';
import { Card as AntCard } from 'antd';
import type { CardProps as AntCardProps } from 'antd';

interface CardProps extends Omit<AntCardProps, 'size' | 'variant'> {
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  hoverable?: boolean;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  variant = 'default',
  size = 'medium',
  className = '',
  hoverable = false,
  children,
  ...props
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'elevated':
        return 'card-elevated';
      case 'outlined':
        return 'card-outlined';
      case 'filled':
        return 'card-filled';
      default:
        return 'card-default';
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'card-sm';
      case 'large':
        return 'card-lg';
      default:
        return 'card-md';
    }
  };

  return (
    <AntCard
      className={`${getVariantClass()} ${getSizeClass()} ${className}`}
      hoverable={hoverable}
      {...props}
    >
      {children}
    </AntCard>
  );
};

export default Card; 