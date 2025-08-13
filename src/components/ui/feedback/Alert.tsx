'use client';

import React from 'react';
import { Alert as AntAlert } from 'antd';
import type { AlertProps as AntAlertProps } from 'antd';

interface AlertProps extends AntAlertProps {
  variant?: 'success' | 'info' | 'warning' | 'error';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  closable?: boolean;
  showIcon?: boolean;
}

const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  size = 'medium',
  className = '',
  closable = true,
  showIcon = true,
  ...props
}) => {
  const getType = () => {
    switch (variant) {
      case 'success':
        return 'success';
      case 'info':
        return 'info';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      default:
        return 'info';
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'alert-sm';
      case 'large':
        return 'alert-lg';
      default:
        return 'alert-md';
    }
  };

  return (
    <AntAlert
      type={getType()}
      className={`${getSizeClass()} ${className}`}
      closable={closable}
      showIcon={showIcon}
      {...props}
    />
  );
};

export default Alert; 