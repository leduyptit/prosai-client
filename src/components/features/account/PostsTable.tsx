'use client';

import React from 'react';
import { Table, Tag, Button, Pagination } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface PostData {
  id: string;
  title: string;
  postDate: string;
  expiredDate: string;
  status: 'active' | 'expired' | 'pending';
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
      case 'pending':
        return <Tag color="orange">Chờ duyệt</Tag>;
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
      width: 120,
      render: (date: string) => (
        <span className="text-sm text-gray-600">{date}</span>
      ),
    },
    {
      title: 'Ngày hết hạn',
      dataIndex: 'expiredDate',
      key: 'expiredDate',
      width: 120,
      render: (date: string) => (
        <span className="text-sm text-gray-600">{date}</span>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: string) => getStatusTag(status),
    },
    {
      title: 'Lượt xem',
      dataIndex: 'views',
      key: 'views',
      width: 100,
      render: (views: number) => (
        <span className="text-sm font-medium">{formatNumber(views)}</span>
      ),
    },
    {
      title: 'Tương tác',
      dataIndex: 'interactions',
      key: 'interactions',
      width: 100,
      render: (interactions: number) => (
        <span className="text-sm font-medium">{formatNumber(interactions)}</span>
      ),
    },
    {
      title: '',
      key: 'actions',
      width: 150,
      render: (_, record: PostData) => (
        <div className="flex items-center gap-1">
          <Button
            type="link"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => {
              window.open(`/property/${record.id}`, '_blank');
              onView?.(record.id);
            }}
            className="text-blue-600 hover:text-blue-700 p-1"
          >
            Xem
          </Button>
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => onEdit?.(record.id)}
            className="text-green-600 hover:text-green-700 p-1"
          >
            Sửa
          </Button>
          <Button
            type="link"
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => onDelete?.(record.id)}
            className="text-red-600 hover:text-red-700 p-1"
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