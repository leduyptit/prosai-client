'use client';

import React from 'react';
import { Select as AntSelect } from 'antd';
import type { SelectProps as AntSelectProps } from 'antd';

interface SelectProps extends Omit<AntSelectProps, 'size' | 'variant'> {
  variant?: 'default' | 'filled' | 'outlined' | 'borderless';
  size?: 'small' | 'middle' | 'large';
  className?: string;
  error?: boolean;
  helperText?: string;
}

const Select: React.FC<SelectProps> = ({
  variant = 'default',
  size = 'middle',
  className = '',
  error = false,
  helperText,
  ...props
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'filled':
        return 'select-filled';
      case 'outlined':
        return 'select-outlined';
      case 'borderless':
        return 'select-borderless';
      default:
        return 'select-default';
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'select-sm';
      case 'large':
        return 'select-lg';
      default:
        return 'select-md';
    }
  };

  const getErrorClass = () => {
    return error ? 'select-error' : '';
  };

  return (
    <div className="select-wrapper">
      <AntSelect
        size={size}
        className={`${getVariantClass()} ${getSizeClass()} ${getErrorClass()} ${className}`}
        suffixIcon={<img src="/svgs/Group 11548.svg" className="w-2.5 h-2.5" alt="down" />}
        status={error ? 'error' : undefined}
        {...props}
      />
      {helperText && (
        <div className={`text-xs font-medium helper-text ${error ? 'text-red-500' : 'text-gray-500'}`}>
          {helperText}
        </div>
      )}
    </div>
  );
};

export default Select; 