'use client';

// Toast component - currently using Antd message
import { message } from 'antd';

interface ToastOptions {
  duration?: number;
  maxCount?: number;
  top?: number;
  rtl?: boolean;
}

interface ToastProps {
  content: string;
  type?: 'success' | 'error' | 'info' | 'warning' | 'loading';
  duration?: number;
}

class Toast {
  private static instance: Toast;

  static success(content: string, duration?: number) {
    message.success(content, duration);
  }

  static error(content: string, duration?: number) {
    message.error(content, duration);
  }

  static info(content: string, duration?: number) {
    message.info(content, duration);
  }

  static warning(content: string, duration?: number) {
    message.warning(content, duration);
  }

  static loading(content: string, duration?: number) {
    message.loading(content, duration);
  }

  static destroy() {
    message.destroy();
  }

  static config(options: ToastOptions) {
    message.config(options);
  }
}

export default Toast; 