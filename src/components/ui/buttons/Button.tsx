'use client';

import React from 'react';
import { Button as AntButton } from 'antd';
import type { ButtonProps as AntButtonProps } from 'antd';

interface ButtonProps extends Omit<AntButtonProps, 'variant' | 'size'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  className = '',
  children,
  ...props
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'primary':
        return 'btn-primary';
      case 'secondary':
        return 'btn-secondary';
      case 'outline':
        return 'btn-outline';
      case 'ghost':
        return 'btn-ghost';
      case 'danger':
        return 'btn-danger';
      default:
        return 'btn-primary';
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'btn-sm';
      case 'large':
        return 'btn-lg';
      default:
        return 'btn-md';
    }
  };

  return (
    <AntButton
      className={`${getVariantClass()} ${getSizeClass()} ${className}`}
      {...props}
    >
      {children}
    </AntButton>
  );
};

export default Button; 