'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Table, Tag, Empty, Button, App, Tooltip } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/navigation';
import { ProtectedRoute } from '@/components/shared';
import { APP_CONFIG } from '@/utils/env';
import { formatCurrency, formatDateTime } from '@/utils/format';
import { paymentsService } from '@/services';
import { AccountSidebar } from '@/components/features/account';

interface InvoiceItem {
  id: string;
  amount: number;
  currency: string;
  status: string;
  paymentMethod: string;
  createdAt: string;
}

export default function InvoicesPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<InvoiceItem[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const { message } = App.useApp();

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await paymentsService.getPayments({ page, limit: pageSize });
        if (!mounted) return;
        const list = Array.isArray(res) ? res : Array.isArray(res?.data) ? res.data : [];
        const totalCount = typeof res?.total === 'number' ? res.total : (typeof res?.count === 'number' ? res.count : list.length);
        // Normalize fields to match table columns
        const normalized = list.map((item: any) => ({
          id: item.id,
          amount: parseFloat(item.amount ?? item.total ?? 0),
          currency: item.currency || 'VND',
          status: String(item.status || '').toLowerCase(),
          paymentMethod: item.payment_method || item.type || '',
          createdAt: item.created_at ? new Date(item.created_at * 1000).toISOString() : (item.createdAt || new Date().toISOString()),
        }));
        setData(normalized);
        setTotal(totalCount);
      } catch {
        if (!mounted) return;
        setError('Không thể tải danh sách hóa đơn');
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [page, pageSize]);

  const columns = useMemo(() => [
    {
      title: 'Mã hóa đơn',
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => (
        <div className="flex items-center gap-2">
          <span className="font-mono">{id.slice(0, 8)}…</span>
          <Tooltip title="Sao chép mã hóa đơn">
            <Button
              size="small"
              type="text"
              icon={<CopyOutlined />}
              onClick={async () => {
                const { copyToClipboard } = await import('@/utils/clipboard');
                const ok = await copyToClipboard(id);
                if (ok) message.success('Đã sao chép mã hóa đơn');
                else message.error('Sao chép thất bại');
              }}
            />
          </Tooltip>
        </div>
      ),
    },
    {
      title: 'Phương thức',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      render: (t: string) => t || '—',
    },
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right' as const,
      render: (amt: number, row: InvoiceItem) => formatCurrency(amt, row.currency || 'VND'),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (s: string) => {
        const map: Record<string, { color: string; text: string }> = {
          paid: { color: 'green', text: 'Đã thanh toán' },
          completed: { color: 'green', text: 'Đã thanh toán' },
          pending: { color: 'orange', text: 'Đang xử lý' },
          failed: { color: 'red', text: 'Thất bại' },
        };
        const meta = map[s] || { color: 'default', text: s };
        return <Tag color={meta.color}>{meta.text}</Tag>;
      },
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (d: string) => formatDateTime(d),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      align: 'right' as const,
      render: (_: unknown, row: InvoiceItem) => (
        <div className="flex items-center justify-end gap-2">
          <Tooltip title="Xem chi tiết">
            <Link href={`/account-overview/invoices/${row.id}`} className="text-blue-600 hover:underline">Xem</Link>
          </Tooltip>
        </div>
      )
    }
  ], [message]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white">
        <div className="bg-gray-50 p-3">
          <div className="responsive-container mx-auto px-4">
            <Breadcrumb
              separator=">"
              className="text-sm"
              items={[
                { title: <Link href={APP_CONFIG.homeUrl} className="text-gray-600 hover:text-blue-600">Trang chủ</Link> },
                { title: <Link href="/account-overview" className="text-gray-600 hover:text-blue-600">Hồ sơ tài khoản</Link> },
                { title: <span className="text-gray-900">Hóa đơn / Giao dịch</span> },
              ]}
            />
          </div>
        </div>
        <div className="responsive-container mx-auto px-4 py-6">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-3">
              <AccountSidebar activeKey="invoices" />
            </div>
            <div className="col-span-12 lg:col-span-9">
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-medium">Hóa đơn / Giao dịch</h1>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <Table
                    rowKey="id"
                    loading={loading}
                    dataSource={data}
                    columns={columns}
                    pagination={{
                      current: page,
                      pageSize,
                      total,
                      showSizeChanger: true,
                      position: ['bottomCenter'],
                      onChange: (p, ps) => {
                        setPage(p);
                        setPageSize(ps);
                      },
                    }}
                    locale={{
                      emptyText: (
                        <Empty description={error || 'Chưa có hóa đơn nào'} />
                      ),
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}


