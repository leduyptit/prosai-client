'use client';

import React from 'react';
import { Menu as AntMenu } from 'antd';
import type { MenuProps as AntMenuProps } from 'antd';

interface MenuProps extends AntMenuProps {
  variant?: 'horizontal' | 'vertical' | 'inline';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  mode?: 'horizontal' | 'vertical' | 'inline';
}

const Menu: React.FC<MenuProps> = ({
  variant = 'horizontal',
  size = 'medium',
  className = '',
  mode = 'horizontal',
  ...props
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'vertical':
        return 'menu-vertical';
      case 'inline':
        return 'menu-inline';
      default:
        return 'menu-horizontal';
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'menu-sm';
      case 'large':
        return 'menu-lg';
      default:
        return 'menu-md';
    }
  };

  return (
    <AntMenu
      mode={mode}
      className={`${getVariantClass()} ${getSizeClass()} ${className}`}
      {...props}
    />
  );
};

export default Menu; 