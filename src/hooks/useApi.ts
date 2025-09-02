'use client';

import { useState, useCallback } from 'react';
import { App } from 'antd';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApi<T = unknown>() {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });
  const { message } = App.useApp();

  const execute = useCallback(async <R = T>(
    apiCall: () => Promise<R>,
    options?: {
      showSuccessMessage?: boolean;
      successMessage?: string;
      showErrorMessage?: boolean;
      onSuccess?: (data: R) => void;
      onError?: (error: unknown) => void;
    }
  ) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const result = await apiCall();
      setState({ data: result as T, loading: false, error: null });

      if (options?.showSuccessMessage) {
        message.success(options.successMessage || 'Thao tác thành công!');
      }

      if (options?.onSuccess) {
        options.onSuccess(result);
      }

      return result;
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } }; message?: string };
      const errorMessage = axiosError.response?.data?.message || axiosError.message || 'Đã có lỗi xảy ra';
      setState(prev => ({ ...prev, loading: false, error: errorMessage }));

      if (options?.showErrorMessage !== false) {
        message.error(errorMessage);
      }

      if (options?.onError) {
        options.onError(error);
      }

      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}
