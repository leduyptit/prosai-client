'use client';

import React from 'react';
import { Breadcrumb as AntBreadcrumb } from 'antd';
import type { BreadcrumbProps as AntBreadcrumbProps } from 'antd';

interface BreadcrumbProps extends AntBreadcrumbProps {
  variant?: 'default' | 'separator' | 'slash';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  separator?: React.ReactNode;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  variant = 'default',
  size = 'medium',
  className = '',
  separator = '/',
  ...props
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'separator':
        return 'breadcrumb-separator';
      case 'slash':
        return 'breadcrumb-slash';
      default:
        return 'breadcrumb-default';
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'breadcrumb-sm';
      case 'large':
        return 'breadcrumb-lg';
      default:
        return 'breadcrumb-md';
    }
  };

  return (
    <AntBreadcrumb
      separator={separator}
      className={`${getVariantClass()} ${getSizeClass()} ${className}`}
      {...props}
    />
  );
};

export default Breadcrumb; 