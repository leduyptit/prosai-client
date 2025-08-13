'use client';

import React from 'react';
import { Input as AntInput } from 'antd';
import type { InputProps as AntInputProps } from 'antd';

interface InputProps extends AntInputProps {
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  error?: boolean;
  helperText?: string;
}

const Input: React.FC<InputProps> = ({
  variant = 'default',
  size = 'medium',
  className = '',
  error = false,
  helperText,
  ...props
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'filled':
        return 'input-filled';
      case 'outlined':
        return 'input-outlined';
      default:
        return 'input-default';
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'input-sm';
      case 'large':
        return 'input-lg';
      default:
        return 'input-md';
    }
  };

  const getErrorClass = () => {
    return error ? 'input-error' : '';
  };

  return (
    <div className="input-wrapper">
      <AntInput
        className={`${getVariantClass()} ${getSizeClass()} ${getErrorClass()} ${className}`}
        status={error ? 'error' : undefined}
        {...props}
      />
      {helperText && (
        <div className={`helper-text ${error ? 'text-red-500' : 'text-gray-500'}`}>
          {helperText}
        </div>
      )}
    </div>
  );
};

export default Input; 