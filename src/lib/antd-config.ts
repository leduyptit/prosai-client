import viVN from 'antd/locale/vi_VN';
import { themeConfig } from './theme';

export const antdConfig = {
  locale: viVN,
  theme: themeConfig,
  // Additional Ant Design configurations
  componentSize: 'middle' as const,
  space: {
    size: 'middle' as const,
  },
  // Form validation messages in Vietnamese
  form: {
    validateMessages: {
      required: 'Vui lòng nhập ${label}',
      types: {
        email: '${label} không phải là email hợp lệ',
        number: '${label} phải là số',
      },
      number: {
        range: '${label} phải từ ${min} đến ${max}',
      },
    },
  },
  // Date picker locale
  datePicker: {
    locale: viVN.DatePicker,
  },
  // Table locale
  table: {
    locale: viVN.Table,
  },
  // Pagination locale
  pagination: {
    locale: viVN.Pagination,
  },
  // Modal locale
  modal: {
    locale: viVN.Modal,
  },
  // Select locale
  select: {
    locale: viVN.Select,
  },
  // Upload locale
  upload: {
    locale: viVN.Upload,
  },
}; 