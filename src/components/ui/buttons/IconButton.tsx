'use client';

import React from 'react';
import { Button as AntButton } from 'antd';
import type { ButtonProps as AntButtonProps } from 'antd';

interface IconButtonProps extends Omit<AntButtonProps, 'children'> {
  icon: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  tooltip?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  variant = 'ghost',
  size = 'medium',
  className = '',
  tooltip,
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
        return 'btn-ghost';
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
      type="text"
      icon={icon}
      className={`icon-button ${getVariantClass()} ${getSizeClass()} ${className}`}
      title={tooltip}
      {...props}
    />
  );
};

export default IconButton; 