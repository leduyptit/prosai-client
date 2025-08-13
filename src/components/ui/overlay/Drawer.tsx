'use client';

import React from 'react';
import { Drawer as AntDrawer } from 'antd';
import type { DrawerProps as AntDrawerProps } from 'antd';

interface DrawerProps extends Omit<AntDrawerProps, 'size'> {
  variant?: 'default' | 'left' | 'right' | 'top' | 'bottom';
  size?: 'small' | 'medium' | 'large' | 'full';
  className?: string;
  children: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({
  variant = 'default',
  size = 'medium',
  className = '',
  children,
  ...props
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'left':
        return 'drawer-left';
      case 'right':
        return 'drawer-right';
      case 'top':
        return 'drawer-top';
      case 'bottom':
        return 'drawer-bottom';
      default:
        return 'drawer-default';
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'drawer-sm';
      case 'large':
        return 'drawer-lg';
      case 'full':
        return 'drawer-full';
      default:
        return 'drawer-md';
    }
  };

  return (
    <AntDrawer
      className={`${getVariantClass()} ${getSizeClass()} ${className}`}
      {...props}
    >
      {children}
    </AntDrawer>
  );
};

export default Drawer; 