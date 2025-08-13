'use client';

import React from 'react';
import { Modal as AntModal } from 'antd';
import type { ModalProps as AntModalProps } from 'antd';

interface ModalProps extends AntModalProps {
  variant?: 'default' | 'centered' | 'fullscreen';
  size?: 'small' | 'medium' | 'large' | 'full';
  className?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  variant = 'default',
  size = 'medium',
  className = '',
  children,
  ...props
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'centered':
        return 'modal-centered';
      case 'fullscreen':
        return 'modal-fullscreen';
      default:
        return 'modal-default';
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'modal-sm';
      case 'large':
        return 'modal-lg';
      case 'full':
        return 'modal-full';
      default:
        return 'modal-md';
    }
  };

  return (
    <AntModal
      className={`${getVariantClass()} ${getSizeClass()} ${className}`}
      {...props}
    >
      {children}
    </AntModal>
  );
};

export default Modal; 