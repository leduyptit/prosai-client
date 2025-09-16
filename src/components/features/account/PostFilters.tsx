'use client';

import React from 'react';
import { Select, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

interface PostFiltersProps {
  statusFilter?: string;
  dateFilter?: string;
  onStatusChange?: (value: string) => void;
  onDateChange?: (value: string) => void;
  onExportCSV?: () => void;
  className?: string;
}

const PostFilters: React.FC<PostFiltersProps> = ({
  statusFilter = 'all',
  dateFilter = '7days',
  onStatusChange,
  onDateChange,
  onExportCSV,
  className = ''
}) => {
  const statusOptions = [
    { value: 'all', label: 'Tất cả' },
    { value: 'active', label: 'Đang hiển thị' },
    { value: 'expired', label: 'Hết hạn' },
    { value: 'deleted', label: 'Đã xóa' },
  ];

  const dateOptions = [
    { value: '7days', label: '7 ngày gần nhất' },
    { value: '30days', label: '30 ngày gần nhất' },
    { value: '90days', label: '3 tháng gần nhất' },
    { value: 'all', label: 'Tất cả thời gian' },
  ];

  return (
    <div className={`flex flex-wrap items-center justify-between gap-4 mb-6 ${className}`}>
      {/* Left side - Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <Select
          value={statusFilter}
          onChange={onStatusChange}
          options={statusOptions}
          className="w-32"
          size="large"
        />
        
        <Select
          value={dateFilter}
          onChange={onDateChange}
          options={dateOptions}
          className="w-40"
          size="large"
        />
      </div>

      {/* Right side - Export button */}
      <Button
        onClick={onExportCSV}
        icon={<DownloadOutlined />}
        size="large"
        className="flex items-center gap-2"
      >
        Tải danh sách CSV
      </Button>
    </div>
  );
};

export default PostFilters;