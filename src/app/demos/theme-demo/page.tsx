'use client';

import React, { useState } from 'react';
import {
  Button,
  Input,
  Select,
  DatePicker,
  Form,
  Card,
  Table,
  Modal,
  Alert,
  Badge,
  Space,
  Divider,
  Typography,
  Switch,
  Checkbox,
  Radio,
  Slider,
  Progress,
  Tag,
  Avatar,
  Tooltip,
  Popconfirm,
  message,
  notification,
} from 'antd';
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

export default function ThemeDemoPage() {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // Table data
  const tableData = [
    {
      key: '1',
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@email.com',
      phone: '0123456789',
      status: 'active',
      role: 'Admin',
    },
    {
      key: '2',
      name: 'Trần Thị B',
      email: 'tranthib@email.com',
      phone: '0987654321',
      status: 'inactive',
      role: 'User',
    },
    {
      key: '3',
      name: 'Lê Văn C',
      email: 'levanc@email.com',
      phone: '0555666777',
      status: 'active',
      role: 'Manager',
    },
  ];

  const tableColumns = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Badge 
          status={status === 'active' ? 'success' : 'default'} 
          text={status === 'active' ? 'Hoạt động' : 'Không hoạt động'} 
        />
      ),
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => {
        const color = role === 'Admin' ? 'red' : role === 'Manager' ? 'blue' : 'green';
        return <Tag color={color}>{role}</Tag>;
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      render: () => (
        <Space size="small">
          <Button type="text" icon={<EyeOutlined />} size="small" />
          <Button type="text" icon={<EditOutlined />} size="small" />
          <Popconfirm
            title="Xác nhận xóa"
            description="Bạn có chắc chắn muốn xóa mục này?"
            onConfirm={() => message.success('Đã xóa thành công')}
            okText="Có"
            cancelText="Không"
          >
            <Button type="text" icon={<DeleteOutlined />} size="small" danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleFormSubmit = (values: Record<string, unknown>) => {
    setLoading(true);
    setTimeout(() => {
      message.success('Form đã được gửi thành công!');
      notification.success({
        message: 'Thành công',
        description: 'Dữ liệu đã được lưu thành công.',
      });
      setLoading(false);
      form.resetFields();
    }, 1000);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    message.info('Modal đã được đóng');
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Title level={1} className="text-blue-600">
            PROSAI Theme Demo
          </Title>
          <Paragraph className="text-lg text-gray-600">
            Trang demo các component Ant Design với theme PROSAI và tiếng Việt
          </Paragraph>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Buttons Section */}
          <Card title="Buttons" className="shadow-md">
            <Space direction="vertical" size="middle" className="w-full">
              <div>
                <Title level={5}>Primary Buttons</Title>
                <Space wrap>
                  <Button type="primary">Primary Button</Button>
                  <Button type="primary" size="large">Large Button</Button>
                  <Button type="primary" size="small">Small Button</Button>
                  <Button type="primary" loading>Loading</Button>
                </Space>
              </div>

              <div>
                <Title level={5}>Secondary Buttons</Title>
                <Space wrap>
                  <Button>Default Button</Button>
                  <Button size="large">Large Button</Button>
                  <Button size="small">Small Button</Button>
                  <Button disabled>Disabled</Button>
                </Space>
              </div>

              <div>
                <Title level={5}>Danger Buttons</Title>
                <Space wrap>
                  <Button danger>Danger Button</Button>
                  <Button type="primary" danger>Primary Danger</Button>
                </Space>
              </div>

              <div>
                <Title level={5}>Icon Buttons</Title>
                <Space wrap>
                  <Button icon={<PlusOutlined />} type="primary">Thêm mới</Button>
                  <Button icon={<EditOutlined />}>Chỉnh sửa</Button>
                  <Button icon={<DeleteOutlined />} danger>Xóa</Button>
                </Space>
              </div>
            </Space>
          </Card>

          {/* Form Controls Section */}
          <Card title="Form Controls" className="shadow-md">
            <Space direction="vertical" size="middle" className="w-full">
              <div>
                <Title level={5}>Input Fields</Title>
                <Space direction="vertical" className="w-full">
                  <Input placeholder="Nhập tên của bạn" prefix={<UserOutlined />} />
                  <Input.Password placeholder="Nhập mật khẩu" prefix={<LockOutlined />} />
                  <Input placeholder="Nhập email" prefix={<MailOutlined />} />
                  <Input placeholder="Nhập số điện thoại" prefix={<PhoneOutlined />} />
                </Space>
              </div>

              <div>
                <Title level={5}>Select & DatePicker</Title>
                <Space direction="vertical" className="w-full">
                  <Select placeholder="Chọn vai trò" className="w-full">
                    <Option value="admin">Admin</Option>
                    <Option value="user">User</Option>
                    <Option value="manager">Manager</Option>
                  </Select>
                  <DatePicker placeholder="Chọn ngày" className="w-full" />
                </Space>
              </div>

              <div>
                <Title level={5}>Switches & Checkboxes</Title>
                <Space>
                  <Switch defaultChecked /> <Text>Bật thông báo</Text>
                  <Checkbox defaultChecked>Đồng ý với điều khoản</Checkbox>
                </Space>
              </div>
            </Space>
          </Card>

          {/* Form Section */}
          <Card title="Complete Form" className="shadow-md">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleFormSubmit}
              className="w-full"
            >
              <Form.Item
                name="name"
                label="Họ và tên"
                rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Nhập họ và tên" />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Vui lòng nhập email!' },
                  { type: 'email', message: 'Email không hợp lệ!' }
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="Nhập email" />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
              >
                <Input prefix={<PhoneOutlined />} placeholder="Nhập số điện thoại" />
              </Form.Item>

              <Form.Item
                name="role"
                label="Vai trò"
                rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}
              >
                <Select placeholder="Chọn vai trò">
                  <Option value="admin">Admin</Option>
                  <Option value="user">User</Option>
                  <Option value="manager">Manager</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="description"
                label="Mô tả"
              >
                <TextArea rows={3} placeholder="Nhập mô tả (tùy chọn)" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} className="w-full">
                  Gửi form
                </Button>
              </Form.Item>
            </Form>
          </Card>

          {/* Data Display Section */}
          <Card title="Data Display" className="shadow-md">
            <Space direction="vertical" size="middle" className="w-full">
              <div>
                <Title level={5}>Alerts</Title>
                <Space direction="vertical" className="w-full">
                  <Alert message="Thông báo thành công" type="success" showIcon />
                  <Alert message="Cảnh báo" type="warning" showIcon />
                  <Alert message="Lỗi" type="error" showIcon />
                  <Alert message="Thông tin" type="info" showIcon />
                </Space>
              </div>

              <div>
                <Title level={5}>Badges & Tags</Title>
                <Space wrap>
                  <Badge count={5}>
                    <Avatar shape="square" icon={<UserOutlined />} />
                  </Badge>
                  <Badge count={0} showZero>
                    <Avatar shape="square" icon={<UserOutlined />} />
                  </Badge>
                  <Tag color="blue">Blue</Tag>
                  <Tag color="green">Green</Tag>
                  <Tag color="red">Red</Tag>
                </Space>
              </div>

              <div>
                <Title level={5}>Progress</Title>
                <Space direction="vertical" className="w-full">
                  <Progress percent={30} />
                  <Progress percent={70} status="exception" />
                  <Progress percent={100} />
                </Space>
              </div>

              <div>
                <Title level={5}>Slider</Title>
                <Slider defaultValue={30} />
              </div>
            </Space>
          </Card>

          {/* Table Section */}
          <Card title="Data Table" className="shadow-md col-span-full">
            <div className="mb-4">
              <Space>
                <Button type="primary" icon={<PlusOutlined />}>
                  Thêm người dùng
                </Button>
                <Input.Search placeholder="Tìm kiếm..." style={{ width: 300 }} />
              </Space>
            </div>
            <Table
              columns={tableColumns}
              dataSource={tableData}
              pagination={{
                total: 3,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} của ${total} mục`,
              }}
            />
          </Card>

          {/* Modal Section */}
          <Card title="Modal & Notifications" className="shadow-md">
            <Space direction="vertical" size="middle" className="w-full">
              <div>
                <Title level={5}>Modal</Title>
                <Button type="primary" onClick={showModal}>
                  Mở Modal
                </Button>
                <Modal
                  title="Modal Demo"
                  open={isModalVisible}
                  onOk={handleModalOk}
                  onCancel={handleModalCancel}
                  okText="Xác nhận"
                  cancelText="Hủy"
                >
                  <p>Đây là nội dung của modal với theme PROSAI.</p>
                  <p>Modal này sử dụng tiếng Việt cho các nút.</p>
                </Modal>
              </div>

              <div>
                <Title level={5}>Messages & Notifications</Title>
                <Space wrap>
                  <Button onClick={() => message.success('Thành công!')}>
                    Success Message
                  </Button>
                  <Button onClick={() => message.error('Có lỗi xảy ra!')}>
                    Error Message
                  </Button>
                  <Button onClick={() => notification.info({
                    message: 'Thông báo',
                    description: 'Đây là một thông báo thông tin.',
                  })}>
                    Info Notification
                  </Button>
                </Space>
              </div>

              <div>
                <Title level={5}>Tooltips</Title>
                <Space>
                  <Tooltip title="Đây là tooltip">
                    <Button>Hover me</Button>
                  </Tooltip>
                  <Popconfirm
                    title="Xác nhận"
                    description="Bạn có chắc chắn muốn thực hiện hành động này?"
                    okText="Có"
                    cancelText="Không"
                  >
                    <Button danger>Popconfirm</Button>
                  </Popconfirm>
                </Space>
              </div>
            </Space>
          </Card>
        </div>

        {/* Theme Info */}
        <Card title="Theme Information" className="mt-8 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Title level={4}>Màu sắc chính</Title>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-600 rounded"></div>
                  <Text>Primary: #00478E</Text>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-500 rounded"></div>
                  <Text>Primary Hover: #0056CC</Text>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-700 rounded"></div>
                  <Text>Primary Active: #003366</Text>
                </div>
              </div>
            </div>
            <div>
              <Title level={4}>Border Radius</Title>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 rounded"></div>
                  <Text>Default: 8px</Text>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
                  <Text>Large: 12px</Text>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 