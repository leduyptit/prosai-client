'use client';

import React, { useState } from 'react';
import { Form, Input, Select, DatePicker, Button, Upload, Breadcrumb } from 'antd';
import { UploadOutlined, CalendarOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { APP_CONFIG } from '@/utils/env';
import Link from 'next/link';

const { TextArea } = Input;
const { Option } = Select;

const PostPropertyPage: React.FC = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);

  const handleSubmit = (values: any) => {
    console.log('Form values:', values);
    // Handle form submission here
  };

  const uploadProps = {
    fileList,
    onChange: ({ fileList }: any) => setFileList(fileList),
    beforeUpload: () => false, // Prevent auto upload
    multiple: true, // Allow multiple file selection
    accept: 'image/*', // Accept only image files
    maxCount: 10, // Maximum 10 images
  };

  const breadcrumbItems = [
    { title: 'Trang chủ', href: '/' },
    { title: 'Đăng tin bất động sản' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-5xl mx-auto px-4">
        {/* Breadcrumb */}
        <Breadcrumb 
          items={breadcrumbItems}
          className="mb-4 text-sm"
        />

        {/* Main Title */}
        <h1 className="text-2xl font-bold text-blue-600 text-center mb-6">
          Đăng tin bất động sản của bạn
        </h1>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{
              postingDate: dayjs('2025-06-05'),
              expirationDate: dayjs('2025-07-05'),
              propertyType: 'chung-cu',
              listingType: 'mua',
              bedrooms: '1',
              bathrooms: '1',
              hasElevator: 'co',
              hasParking: 'co'
            }}
            className="space-y-4"
          >
            {/* Title - Full Width */}
            <div className="w-full mb-0">
              <Form.Item
                label="Tiêu đề tin đăng"
                name="title"
                rules={[{ required: true, message: 'Vui lòng nhập tiêu đề tin đăng' }]}
                className="mb-0"
              >
                <Input placeholder="Nhập tiêu đề tin đăng" size="large" />
              </Form.Item>
            </div>

            {/* Date Fields - Two Columns */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <Form.Item
                label="Ngày đăng tin"
                name="postingDate"
                rules={[{ required: true, message: 'Vui lòng chọn ngày đăng tin' }]}
                className="mb-0"
              >
                <DatePicker
                  format="DD/MM/YYYY"
                  placeholder="Chọn ngày"
                  size="large"
                  className="w-full"
                  suffixIcon={<CalendarOutlined />}
                />
              </Form.Item>

              <Form.Item
                label="Ngày hết hạn"
                name="expirationDate"
                rules={[{ required: true, message: 'Vui lòng chọn ngày hết hạn' }]}
                className="mb-0"
              >
                <DatePicker
                  format="DD/MM/YYYY"
                  placeholder="Chọn ngày"
                  size="large"
                  className="w-full"
                  suffixIcon={<CalendarOutlined />}
                />
              </Form.Item>

              <Form.Item
                label="Loại bất động sản"
                name="propertyType"
                rules={[{ required: true, message: 'Vui lòng chọn loại bất động sản' }]}
                className="mb-0"
              >
                <Select size="large" placeholder="Chọn loại bất động sản">
                  <Option value="chung-cu">Chung cư</Option>
                  <Option value="nha-rieng">Nhà riêng</Option>
                  <Option value="biet-thu">Biệt thự</Option>
                  <Option value="nha-pho">Nhà phố</Option>
                  <Option value="dat-nen">Đất nền</Option>
                  <Option value="van-phong">Văn phòng</Option>
                  <Option value="cua-hang">Cửa hàng</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Hình thức"
                name="listingType"
                rules={[{ required: true, message: 'Vui lòng chọn hình thức' }]}
                className="mb-0"
              >
                <Select size="large" placeholder="Chọn hình thức">
                  <Option value="mua">Mua</Option>
                  <Option value="ban">Bán</Option>
                  <Option value="thue">Thuê</Option>
                  <Option value="cho-thue">Cho thuê</Option>
                </Select>
              </Form.Item>
            </div>

            {/* Location - Left Column Only */}
            <div className="grid grid-cols-2 md:grid-cols-2 gap-8"  >
              <Form.Item
                label="Vị trí"
                name="location"
                rules={[{ required: true, message: 'Vui lòng nhập vị trí' }]}
                className="mb-0"
              >
                <Input placeholder="Nhập địa chỉ chi tiết" size="large" />
              </Form.Item>
              <Form.Item
                label="Mã dự án (nếu có)"
                name="projectCode"
                className="mb-0"
              >
                <Input placeholder="Nhập mã dự án" size="large" />
              </Form.Item>
            </div>


            {/* Price and Project Name - Two Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Form.Item
                label="Giá (VNĐ)"
                name="price"
                rules={[{ required: true, message: 'Vui lòng nhập giá' }]}
                className="mb-0"
              >
                <Input placeholder="Nhập giá" size="large" />
              </Form.Item>

              <Form.Item
                label="Tên dự án"
                name="projectName"
                className="mb-0"
              >
                <Input placeholder="Nhập tên dự án" size="large" />
              </Form.Item>
            </div>

            {/* Price per m² and Current Floor - Two Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Form.Item
                label="Giá/m² (VNĐ)"
                name="pricePerSqm"
                className="mb-0"
              >
                <Input placeholder="Nhập giá/m²" size="large" />
              </Form.Item>

              <Form.Item
                label="Tầng hiện tại"
                name="currentFloor"
                className="mb-0"
              >
                <Input placeholder="Nhập tầng hiện tại" size="large" />
              </Form.Item>
            </div>

            {/* Area and Total Floors - Two Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Form.Item
                label="Diện tích (m²)"
                name="area"
                rules={[{ required: true, message: 'Vui lòng nhập diện tích' }]}
                className="mb-0"
              >
                <Input placeholder="Nhập diện tích" size="large" />
              </Form.Item>

              <Form.Item
                label="Tổng số tầng"
                name="totalFloors"
                className="mb-0"
              >
                <Input placeholder="Nhập tổng số tầng" size="large" />
              </Form.Item>
            </div>

            {/* Bedrooms and Year Built - Two Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Form.Item
                label="Phòng ngủ"
                name="bedrooms"
                rules={[{ required: true, message: 'Vui lòng chọn số phòng ngủ' }]}
                className="mb-0"
              >
                <Select size="large" placeholder="Chọn số phòng ngủ">
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                  <Option value="4">4</Option>
                  <Option value="5">5</Option>
                  <Option value="6+">6+</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Năm xây dựng"
                name="yearBuilt"
                className="mb-0"
              >
                <Input placeholder="Nhập năm xây dựng" size="large" />
              </Form.Item>
            </div>

            {/* Bathrooms and Elevator - Two Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Form.Item
                label="Phòng vệ sinh"
                name="bathrooms"
                rules={[{ required: true, message: 'Vui lòng chọn số phòng vệ sinh' }]}
                className="mb-0"
              >
                <Select size="large" placeholder="Chọn số phòng vệ sinh">
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                  <Option value="4">4</Option>
                  <Option value="5+">5+</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Có thang máy"
                name="hasElevator"
                className="mb-0"
              >
                <Select size="large" placeholder="Chọn">
                  <Option value="co">Có</Option>
                  <Option value="khong">Không</Option>
                </Select>
              </Form.Item>
            </div>

            {/* Legal Status and Parking - Two Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Form.Item
                label="Tình trạng pháp lý"
                name="legalStatus"
                className="mb-0"
              >
                <Input placeholder="Nhập tình trạng pháp lý" size="large" />
              </Form.Item>

              <Form.Item
                label="Có chỗ đậu xe"
                name="hasParking"
                className="mb-0"
              >
                <Select size="large" placeholder="Chọn">
                  <Option value="co">Có</Option>
                  <Option value="khong">Không</Option>
                </Select>
              </Form.Item>
            </div>

            {/* Interior Status and Description - Two Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Form.Item
                label="Tình trạng nội thất"
                name="interiorCondition"
                className="mb-0"
              >
                <Input placeholder="Nhập tình trạng nội thất" size="large" />
              </Form.Item>

              <Form.Item
                label="Mô tả nội thất"
                name="interiorDescription"
                className="mb-0"
              >
                <Input placeholder="Nhập mô tả nội thất" size="large" />
              </Form.Item>
            </div>

            {/* Detailed Property Description - Full Width */}
            <div className="w-full">
              <Form.Item
                label="Mô tả chi tiết BĐS (tự động trích xuất thông tin)"
                name="description"
                rules={[{ required: true, message: 'Vui lòng nhập mô tả chi tiết' }]}
                className="mb-0"
              >
                <TextArea
                  rows={4}
                  placeholder="VD: Căn hộ 3PN, 2WC, tầng 15, giá 5.2 tỷ, nội thất cao cấp.."
                  size="large"
                />
              </Form.Item>
            </div>

            {/* Image Upload - Full Width */}
            <div className="w-full">
              <Form.Item
                label="Đính kèm ảnh BĐS"
                name="images"
                className="mb-0"
                extra="Có thể chọn nhiều ảnh (tối đa 10 ảnh). Hỗ trợ định dạng: JPG, PNG, GIF"
              >
                <Upload {...uploadProps} listType="picture-card">
                  <Button icon={<UploadOutlined />} size="large">
                    Chọn ảnh
                  </Button>
                </Upload>
              </Form.Item>
            </div>

            {/* Contact Information - Full Width, Vertical Stack */}
            <div className="w-full space-y-4">
              <Form.Item
                label="Họ tên người đăng"
                name="contactName"
                rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
                className="mb-0"
              >
                <Input placeholder="Nhập họ tên" size="large" />
              </Form.Item>

              <Form.Item
                label="Số điện thoại liên hệ"
                name="contactPhone"
                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                className="mb-0"
              >
                <Input placeholder="Nhập số điện thoại" size="large" />
              </Form.Item>

              <Form.Item
                label="Email liên hệ"
                name="contactEmail"
                rules={[
                  { required: true, message: 'Vui lòng nhập email' },
                  { type: 'email', message: 'Email không hợp lệ' }
                ]}
                className="mb-0"
              >
                <Input placeholder="Nhập email" size="large" />
              </Form.Item>
            </div>

            {/* Action Buttons */}
            <div className="text-center pt-4">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="w-1/3 py-3 h-auto text-lg mb-4"
              >
                ĐĂNG TIN
              </Button>
              
              <div>
                <Link href={APP_CONFIG.homeUrl} className="font-medium" style={{ color: '#005EBC' }}>
                  Trở về trang chủ
                </Link>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default PostPropertyPage;
