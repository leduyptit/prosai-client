'use client';

import React from 'react';
import { Table, Tag, Button, Pagination, Divider } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface PostData {
  id: string;
  title: string;
  postDate: string;
  expiredDate: string;
  status: 'active' | 'expired' | 'deleted';
  views: number;
  interactions: number;
}

interface PostsTableProps {
  data?: PostData[];
  loading?: boolean;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  className?: string;
}

const PostsTable: React.FC<PostsTableProps> = ({
  data = [],
  loading = false,
  currentPage = 1,
  totalPages = 4,
  onPageChange,
  onView,
  onEdit,
  onDelete,
  className = ''
}) => {
  const getStatusTag = (status: string) => {
    switch (status) {
      case 'active':
        return <Tag color="green">Đang hiển thị</Tag>;
      case 'expired':
        return <Tag color="red">Hết hạn</Tag>;
      case 'deleted':
        return <Tag color="default">Đã xóa</Tag>;
      default:
        return <Tag color="default">{status}</Tag>;
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const columns: ColumnsType<PostData> = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      width: 300,
      key: 'title',
      render: (text: string) => (
        <div className="max-w-xs">
          <span className="text-sm font-medium text-gray-900 line-clamp-2">
            {text}
          </span>
        </div>
      ),
    },
    {
      title: 'Ngày đăng',
      dataIndex: 'postDate',
      key: 'postDate',
      width: 50,
      render: (date: string) => (
        <span className="text-sm text-gray-600">{date}</span>
      ),
    },
    {
      title: 'Ngày hết hạn',
      dataIndex: 'expiredDate',
      key: 'expiredDate',
      width: 50,
      render: (date: string) => (
        <span className="text-sm text-gray-600">{date}</span>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 50,
      render: (status: string) => getStatusTag(status),
    },
    {
      title: 'Lượt xem',
      dataIndex: 'views',
      key: 'views',
      width: 50,
      render: (views: number) => (
        <span className="text-sm font-medium">{formatNumber(views)}</span>
      ),
    },
    {
      title: 'Tương tác',
      dataIndex: 'interactions',
      key: 'interactions',
      width: 50,
      render: (interactions: number) => (
        <span className="text-sm font-medium">{formatNumber(interactions)}</span>
      ),
    },
    {
      title: '',
      key: 'actions',
      width: 50,
      render: (_, record: PostData) => (
        <div className="flex items-center gap-1">
          <Button
            type="link"
            size="small"
            disabled={record.status === 'deleted'}
            onClick={() => {
              if (record.status === 'deleted') return;
              window.open(`/property/${record.id}`, '_blank');
              onView?.(record.id);
            }}
            className="hover:text-blue-700 p-0"
            style={{ padding: 0, color: '#005EBC' }}
          >
            Xem
          </Button>
          <Divider type="vertical" />
          <Button
            type="link"
            size="small"
            disabled={record.status === 'deleted'}
            onClick={() => {
              if (record.status === 'deleted') return;
              onEdit?.(record.id);
            }}
            className="hover:text-green-700 p-0"
            style={{ padding: 0, color: '#005EBC' }}
          >
            Sửa
          </Button>
          <Divider type="vertical" />
          <Button
            type="link"
            size="small"
            disabled={record.status === 'deleted'}
            onClick={() => {
              if (record.status === 'deleted') return;
              onDelete?.(record.id);
            }}
            className="hover:text-red-700 p-0"
            style={{ padding: 0, color: '#DC3545' }}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className={className}>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          loading={loading}
          pagination={false}
          className="[&_.ant-table-thead>tr>th]:bg-gray-50 [&_.ant-table-thead>tr>th]:border-b-2 [&_.ant-table-thead>tr>th]:border-gray-200"
        />
        
        {/* Custom Pagination */}
        <div className="flex justify-center py-4 border-t border-gray-200">
          <Pagination
            current={currentPage}
            total={totalPages * 10} // Assuming 10 items per page
            pageSize={10}
            showQuickJumper={false}
            showSizeChanger={false}
            onChange={onPageChange}
            className="[&_.ant-pagination-item-active]:bg-blue-600 [&_.ant-pagination-item-active]:border-blue-600"
          />
        </div>
      </div>
    </div>
  );
};

export default PostsTable;