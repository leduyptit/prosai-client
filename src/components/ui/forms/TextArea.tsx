'use client';

import React from 'react';
import { Input as AntInput } from 'antd';
import type { TextAreaProps as AntTextAreaProps } from 'antd/es/input/TextArea';

const { TextArea: AntTextArea } = AntInput;

interface TextAreaProps extends Omit<AntTextAreaProps, 'variant' | 'size'> {
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  error?: boolean;
  helperText?: string;
  rows?: number;
  maxLength?: number;
  showCount?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({
  variant = 'default',
  size = 'medium',
  className = '',
  error = false,
  helperText,
  rows = 4,
  maxLength,
  showCount = false,
  ...props
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'filled':
        return 'textarea-filled';
      case 'outlined':
        return 'textarea-outlined';
      default:
        return 'textarea-default';
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'textarea-sm';
      case 'large':
        return 'textarea-lg';
      default:
        return 'textarea-md';
    }
  };

  const getErrorClass = () => {
    return error ? 'textarea-error' : '';
  };

  return (
    <div className="textarea-wrapper">
      <AntTextArea
        className={`${getVariantClass()} ${getSizeClass()} ${getErrorClass()} ${className}`}
        status={error ? 'error' : undefined}
        rows={rows}
        maxLength={maxLength}
        showCount={showCount}
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

export default TextArea; 