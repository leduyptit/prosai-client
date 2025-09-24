'use client';

import React, { useMemo, useState } from 'react';
import { Form, InputNumber, Radio, Button, Alert, App } from 'antd';
import { Modal } from '@/components/ui/overlay';
import { formatCurrency } from '@/utils/format';
import { paymentsService } from '@/services';
import { useRouter } from 'next/navigation';

export interface TopUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_AMOUNTS = [50000, 100000, 200000, 500000, 1000000, 2000000];

const TopUpModal: React.FC<TopUpModalProps> = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedAmount: number | undefined = Form.useWatch('amount', form);
  const { message } = App.useApp();
  const router = useRouter();

  const handleQuickPick = (value: number) => {
    form.setFieldsValue({ amount: value });
  };

  const handleOk = async () => {
    try {
      setError(null);
      const values = await form.validateFields();
      setSubmitting(true);
      const method: 'BANK_TRANSFER' | 'MOMO' = values.method === 'momo' ? 'MOMO' : 'BANK_TRANSFER';
      const res = await paymentsService.createTopUp({ amount: values.amount, payment_method: method });
      const createdId = (res as any)?.data?.id || (res as any)?.id;
      if (createdId) {
        let seconds = 3;
        const key = 'topup-redirect';
        message.open({ key, type: 'success', content: `Tạo lệnh nạp thành công. Chuyển hướng sau ${seconds}s…` });
        const timer = setInterval(() => {
          seconds -= 1;
          if (seconds > 0) {
            message.open({ key, type: 'success', content: `Tạo lệnh nạp thành công. Chuyển hướng sau ${seconds}s…` });
          } else {
            clearInterval(timer);
            message.destroy(key);
            router.push(`/account-overview/invoices/${createdId}`);
          }
        }, 1000);
      } else {
        message.success('Tạo lệnh nạp tiền thành công');
      }
      onClose();
      form.resetFields();
    } catch (err: any) {
      if (err?.errorFields) return; // validation error already shown
      setError(err?.message || 'Có lỗi xảy ra, vui lòng thử lại.');
      message.error('Tạo lệnh nạp tiền thất bại');
    } finally {
      setSubmitting(false);
    }
  };

  const amountHelp = useMemo(() => {
    if (!selectedAmount) return 'Nhập số tiền muốn nạp (VND)';
    return `Sẽ nạp ${formatCurrency(selectedAmount, 'VND')}`;
  }, [selectedAmount]);

  return (
    <Modal
      open={isOpen}
      onCancel={() => {
        onClose();
        form.resetFields();
        setError(null);
      }}
      onOk={handleOk}
      okText={submitting ? 'Đang xử lý…' : 'Tạo lệnh nạp tiền'}
      okButtonProps={{ loading: submitting, className: 'bg-blue-600' }}
      cancelText="Hủy"
      title="Tạo lệnh nạp tiền"
      className="top-up-modal"
      destroyOnClose
      centered
    >
      <div className="space-y-4">
        {error && <Alert type="error" message={error} />}
        <Form form={form} layout="vertical" requiredMark={false} initialValues={{ method: 'banking' }}>
          <Form.Item
            label="Số tiền nạp"
            className="font-medium"
            name="amount"
            rules={[
              { required: true, message: 'Vui lòng nhập số tiền' },
              { type: 'number', min: 10000, message: 'Tối thiểu 10.000đ' },
            ]}
            help={amountHelp}
          >
            <InputNumber<number>
              style={{ width: '100%' }}
              min={10000}
              step={10000}
              formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(v) => (v ? Number(v.replace(/\D/g, '')) : 0)}
              placeholder="vd: 100.000"
              addonAfter="VND"
            />
          </Form.Item>

          <div className="flex flex-wrap gap-2 mb-4">
            {QUICK_AMOUNTS.map((amt) => (
              <Button
                key={amt}
                onClick={() => handleQuickPick(amt)}
                className={selectedAmount === amt ? 'bg-blue-50 border-blue-500 text-blue-600' : ''}
                style={{ borderRadius: '9999px' }}
              >
                {formatCurrency(amt, 'VND')}
              </Button>
            ))}
          </div>

          <Form.Item className="mt-4 font-medium" label="Phương thức nạp" name="method">
            <Radio.Group>
              <Radio value="banking">
                <span className="inline-flex items-center gap-2">
                  Chuyển khoản ngân hàng
                </span>
              </Radio>
              <div className="h-3" />
              <Radio value="momo" disabled>
                <span className="inline-flex items-center gap-2 text-gray-400">
                  {/* No MoMo icon available in assets; using generic wallet text */}
                  Ví MoMo (Chưa hỗ trợ)
                </span>
              </Radio>
            </Radio.Group>
          </Form.Item>

          <Alert
            type="info"
            showIcon
            message="Lưu ý"
            description="Sau khi xác nhận, bạn sẽ nhận hướng dẫn chuyển khoản. Số dư sẽ được cập nhật sau khi thanh toán thành công."
          />
        </Form>
      </div>
    </Modal>
  );
};

export default TopUpModal;


