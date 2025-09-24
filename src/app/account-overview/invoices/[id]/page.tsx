'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { App, Card, Descriptions, Tag, Skeleton, Button, Tooltip, Alert } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { paymentsService } from '@/services';
import { Breadcrumb } from '@/components/ui/navigation';
import { ProtectedRoute } from '@/components/shared';
import { APP_CONFIG } from '@/utils/env';
import { formatCurrency, formatDateTime } from '@/utils/format';

export default function InvoiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { message } = App.useApp();
  const id = String(params?.id || '');

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Demo banking info (for PENDING status)
  const BANK_INFO = {
    bankCode: 'VCB',
    bankName: 'VCB',
    accountNumber: '0801000217070',
    accountName: 'Lê Khương Duy',
  } as const;

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await paymentsService.getPaymentById(id);
        if (!mounted) return;
        const payload = (res as any)?.data || res;
        setData(payload);
      } catch (e) {
        if (!mounted) return;
        setError('Không thể tải chi tiết hóa đơn');
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [id]);

  const handleCopyId = async () => {
    const { copyToClipboard } = await import('@/utils/clipboard');
    const ok = await copyToClipboard(id);
    if (ok) message.success('Đã sao chép mã hóa đơn');
    else message.error('Sao chép thất bại');
  };

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
                { title: <Link href="/account-overview/invoices" className="text-gray-600 hover:text-blue-600">Hóa đơn / Giao dịch</Link> },
                { title: <span className="text-gray-900">Chi tiết</span> },
              ]}
            />
          </div>
        </div>

        <div className="responsive-container mx-auto px-4 py-6">
          <div className="max-w-3xl mx-auto">
            <Card
              title={
                <div className="flex items-center justify-between">
                  <span className="font-medium">Hóa đơn #{id.slice(0, 8)}…</span>
                  <div className="flex items-center gap-2">
                    <Button size="small" onClick={() => router.push('/account-overview/invoices')}>Quay lại</Button>
                    <Button type="primary" size="small" onClick={handleCopyId}>Sao chép mã hóa đơn</Button>
                  </div>
                </div>
              }
            >
              {loading ? (
                <Skeleton active />
              ) : error ? (
                <div className="text-red-600">{error}</div>
              ) : data ? (
                <Descriptions column={1} bordered size="small">
                  <Descriptions.Item label="Mã hóa đơn">{data.id}</Descriptions.Item>
                  <Descriptions.Item label="Số tiền">{formatCurrency(parseFloat(data?.amount ?? 0), 'VND')}</Descriptions.Item>
                  <Descriptions.Item label="Phương thức">{data.payment_method || '—'}</Descriptions.Item>
                  <Descriptions.Item label="Trạng thái">
                    {(() => {
                      const s = String(data?.status || '').toLowerCase();
                      const map: Record<string, { color: string; text: string }> = {
                        paid: { color: 'green', text: 'Đã thanh toán' },
                        completed: { color: 'green', text: 'Đã thanh toán' },
                        pending: { color: 'orange', text: 'Đang xử lý' },
                        failed: { color: 'red', text: 'Thất bại' },
                      };
                      const meta = map[s] || { color: 'default', text: data?.status || '—' };
                      return <Tag color={meta.color}>{meta.text}</Tag>;
                    })()}
                  </Descriptions.Item>
                  <Descriptions.Item label="Ngày tạo">{data.created_at ? formatDateTime(new Date(data.created_at * 1000).toISOString()) : '—'}</Descriptions.Item>
                  <Descriptions.Item label="Ngày cập nhật">{data.updated_at ? formatDateTime(new Date(data.updated_at * 1000).toISOString()) : '—'}</Descriptions.Item>
                  <Descriptions.Item label="Mã giao dịch">{data.transaction_id || '—'}</Descriptions.Item>
                  {data.note ? (
                    <Descriptions.Item label="Ghi chú">{data.note}</Descriptions.Item>
                  ) : null}
                </Descriptions>
              ) : null}

              {/* Pending payment helper (demo) */}
              {String(data?.status || '').toLowerCase() === 'pending' && (
                <div className="mt-6">
                  <h2 className="text-base font-medium mb-3">Thanh toán chuyển khoản</h2>
                  <div className="border border-gray-200 rounded-lg p-4 max-w-2xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center justify-center">
                      {/* VietQR (demo) */}
                      <div className="flex flex-col items-center">
                        <img
                          src={`https://img.vietqr.io/image/${BANK_INFO.bankCode}-${BANK_INFO.accountNumber}-compact2.png?amount=${encodeURIComponent(parseFloat(data?.amount ?? 0))}&addInfo=${encodeURIComponent(id)}&accountName=${encodeURIComponent(BANK_INFO.accountName)}`}
                          alt="VietQR"
                          className="rounded border border-gray-200"
                          style={{ maxWidth: 260 }}
                        />
                        <div className="text-xs text-gray-500 mt-2">Quét QR để điền sẵn thông tin</div>
                      </div>

                      {/* Bank info */}
                      <div className="space-y-3">
                        <div className="border border-gray-200 rounded px-3 py-2">
                          <div className="text-gray-500 text-xs">Số tiền</div>
                          <div className="font-medium">{formatCurrency(parseFloat(data?.amount ?? 0), 'VND')}</div>
                        </div>

                        <div className="flex items-center justify-between bg-white border border-gray-200 rounded px-3 py-2">
                          <div>
                            <div className="text-gray-500 text-xs">Số tài khoản</div>
                            <div className="font-medium text-green-600">{BANK_INFO.accountNumber}</div>
                          </div>
                          <Tooltip title="Sao chép số tài khoản">
                            <Button
                              size="small"
                              icon={<CopyOutlined />}
                              onClick={async () => {
                                const { copyToClipboard } = await import('@/utils/clipboard');
                                const ok = await copyToClipboard(BANK_INFO.accountNumber);
                                if (ok) message.success('Đã sao chép số tài khoản');
                                else message.error('Sao chép thất bại');
                              }}
                            />
                          </Tooltip>
                        </div>

                        <div className="flex items-center justify-between bg-white border border-gray-200 rounded px-3 py-2">
                          <div>
                            <div className="text-gray-500 text-xs">Nội dung chuyển khoản</div>
                            <div className="font-medium text-red-600">{id}</div>
                          </div>
                          <Tooltip title="Sao chép nội dung chuyển khoản">
                            <Button
                              size="small"
                              icon={<CopyOutlined />}
                              onClick={async () => {
                                const { copyToClipboard } = await import('@/utils/clipboard');
                                const ok = await copyToClipboard(id);
                                if (ok) message.success('Đã sao chép nội dung');
                                else message.error('Sao chép thất bại');
                              }}
                            />
                          </Tooltip>
                        </div>

                        <div className="flex items-center justify-between bg-white border border-gray-200 rounded px-3 py-2">
                          <div>
                            <div className="text-gray-500 text-xs">Chủ tài khoản</div>
                            <div className="font-medium">{BANK_INFO.accountName}</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between bg-white border border-gray-200 rounded px-3 py-2">
                          <div>
                            <div className="text-gray-500 text-xs">Ngân hàng</div>
                            <div className="font-medium">{BANK_INFO.bankName}</div>
                          </div>
                        </div>

                        <Alert
                          type="info"
                          showIcon
                          message="Lưu ý"
                          description="Nhập đúng nội dung chuyển khoản để hệ thống cộng tiền tự động."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}


