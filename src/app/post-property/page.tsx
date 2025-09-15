'use client';

import React, { useMemo, useState } from 'react';
import { Form, Input, Select, DatePicker, Button, Upload, Breadcrumb, App } from 'antd';
import { UploadOutlined, CalendarOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { APP_CONFIG } from '@/utils/env';
import Link from 'next/link';
import { propertiesService, PropertyPostRequest, uploadService } from '@/services';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { CITIES, PROPERTY_TYPES, LISTING_TYPES, BEDROOM_OPTIONS, BATHROOM_OPTIONS, LEGAL_STATUS } from '@/constants';
import { wardsService } from '@/services/wards';

const { TextArea } = Input;
const { Option } = Select;

const PostPropertyPage: React.FC = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [wards, setWards] = useState<any[]>([]);
  const [loadingWards, setLoadingWards] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { message } = App.useApp();
  const editId = useMemo(() => searchParams.get('id') || undefined, [searchParams]);
  const isEditMode = Boolean(editId);

  // Initialize wards when component mounts
  React.useEffect(() => {
    const initialCity = form.getFieldValue('city');
    if (initialCity) {
      setSelectedCity(initialCity);
      loadWardsByCity(initialCity);
    }
  }, [form]);

  // Load property in edit mode
  React.useEffect(() => {
    const loadForEdit = async () => {
      if (!isEditMode || !editId) return;
      try {
        const res = await propertiesService.getPropertyById(editId);
        if (!res.success || !res.data) {
          message.error(res.message || 'Không thể tải dữ liệu tin đăng');
          return;
        }

        const p = res.data;
        // Load wards for the city
        if (p.city) {
          setSelectedCity(p.city);
          await loadWardsByCity(p.city);
        }

        // Split address to detailed part if possible
        let detailedAddress = '';
        if (p.address) {
          const parts = p.address.split(',').map(s => s.trim());
          // Remove ward, district, city if present
          const filtered = parts.filter(part => part !== p.ward && part !== p.district && part !== p.city);
          detailedAddress = filtered.join(', ');
        }

        // Map API fields to form fields
        form.setFieldsValue({
          title: p.title,
          postingDate: dayjs(p.created_at),
          expirationDate: p.expired_at ? dayjs(p.expired_at) : dayjs().add(7, 'day'),
          propertyType: p.property_type ? String(p.property_type) : undefined,
          listingType: p.listing_type ? String(p.listing_type) : undefined,
          price: String(p.price ?? ''),
          area: String(p.area ?? ''),
          city: p.city || undefined,
          ward: p.ward || undefined,
          detailedAddress,
          bedrooms: String(p.num_bedrooms ?? '1'),
          bathrooms: String(p.num_bathrooms ?? '1'),
          legalStatus: p.legal_status ?? 1,
          direction: p.direction,
          balconyDirection: p.balcony_direction,
          projectName: p.project_name,
          currentFloor: p.floor ? String(p.floor) : undefined,
          totalFloors: p.total_floors ? String(p.total_floors) : undefined,
          yearBuilt: p.year_built ? String(p.year_built) : undefined,
          hasElevator: p.has_elevator ? 'co' : 'khong',
          hasParking: p.has_parking ? 'co' : 'khong',
          description: p.description,
          contactName: p.user_name_social,
          contactPhone: p.phone_user,
          contactEmail: p.contact_email || undefined,
        });

        // Transform images to Upload file list format
        const transformedFiles = (p.images || []).map((url: string, idx: number) => ({
          uid: `${idx}`,
          name: `image-${idx + 1}.jpg`,
          status: 'done',
          url,
        }));
        setFileList(transformedFiles as any);
      } catch (e) {
        console.error(e);
        message.error('Không thể tải dữ liệu tin đăng');
      }
    };
    loadForEdit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditMode, editId]);


  const handleSubmit = async (values: any) => {
    if (!session?.user?.id) {
      message.error('Vui lòng đăng nhập để đăng tin');
      return;
    }

    // Check if there are files still uploading
    if (uploading) {
      message.error('Vui lòng đợi upload ảnh hoàn tất');
      return;
    }

    // Check if there are files with error status
    const hasErrorFiles = fileList.some((file: any) => file.status === 'error');
    if (hasErrorFiles) {
      message.error('Vui lòng xóa các ảnh lỗi trước khi đăng tin');
      return;
    }

    try {
      setSubmitting(true);
      
      // Convert form values to API format
      const baseData: PropertyPostRequest = {
        title: values.title,
        description: values.description,
        property_type: getPropertyTypeNumber(values.propertyType),
        listing_type: getListingTypeNumber(values.listingType),
        price: parseFloat(values.price) || 0,
        area: parseFloat(values.area) || 0,
        address: `${values.detailedAddress}, ${values.ward}, ${values.city}`,
        ward: values.ward,
        district: '', // Empty since we removed district selection
        city: values.city,
        num_bedrooms: parseInt(values.bedrooms) || 0,
        num_bathrooms: parseInt(values.bathrooms) || 0,
        legal_status: values.legalStatus || 1,
        direction: values.direction,
        balcony_direction: values.balconyDirection,
        // Only send CDN URLs that came from upload response
        images: fileList
          .filter((file: any) => file.status === 'done' && (file.url || (file.response && file.response.url)))
          .map((file: any) => file.url || file.response.url)
          .filter((url: string) => /^https?:\/\//.test(url)),
        project_name: values.projectName || undefined,
        floor: values.currentFloor ? parseInt(values.currentFloor) : undefined,
        total_floors: values.totalFloors ? parseInt(values.totalFloors) : undefined,
        year_built: values.yearBuilt ? parseInt(values.yearBuilt) : undefined,
        has_elevator: values.hasElevator === 'co',
        has_parking: values.hasParking === 'co',
        expired_at: values.expirationDate ? values.expirationDate.format('YYYY-MM-DD') : undefined,
        user_name_social: values.contactName,
        phone_user: values.contactPhone,
        contact_email: values.contactEmail
      };
      
      let response;
      if (isEditMode && editId) {
        response = await propertiesService.updateProperty(editId, baseData);
      } else {
        response = await propertiesService.postProperty(baseData);
      }
      
      if (response.success) {
        message.success(isEditMode ? 'Cập nhật tin thành công!' : 'Đăng tin thành công! Tin đăng của bạn đã được gửi để xét duyệt.');
        router.push('/account-overview/post-manager');
      } else {
        message.error(response.message || (isEditMode ? 'Có lỗi xảy ra khi cập nhật tin' : 'Có lỗi xảy ra khi đăng tin'));
      }
    } catch (error) {
      console.error('Error posting property:', error);
      message.error('Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setSubmitting(false);
    }
  };

  // Helper functions to convert form values to API numbers
  const getPropertyTypeNumber = (type: string): number => {
    return parseInt(type) || 1;
  };

  const getListingTypeNumber = (type: string): number => {
    return parseInt(type) || 1;
  };

  // Load wards by city from API
  const loadWardsByCity = async (city: string) => {
    if (!city) {
      setWards([]);
      return;
    }

    try {
      setLoadingWards(true);
      const wardsData = await wardsService.getWardsByCity(city);
      setWards(wardsData);
    } catch (error) {
      message.error('Không thể tải danh sách phường/xã');
      setWards([]);
    } finally {
      setLoadingWards(false);
    }
  };

  // Handle city change to populate wards
  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    form.setFieldsValue({ ward: '' });
    loadWardsByCity(city);
    handleFieldChange();
  };

  // Debug selectedCity
  console.log('Current selectedCity:', selectedCity);

  // Auto-generate description based on form values
  const generateDescription = () => {
    const values = form.getFieldsValue();
    let description = '';

    // Property type
    if (values.propertyType) {
      const propertyType = PROPERTY_TYPES.find(type => type.value === values.propertyType);
      description += propertyType?.label || '';
    }

    // Bedrooms
    if (values.bedrooms) {
      description += ` ${values.bedrooms}PN`;
    }

    // Bathrooms
    if (values.bathrooms) {
      description += `, ${values.bathrooms}WC`;
    }

    // Floor
    if (values.currentFloor) {
      description += `, tầng ${values.currentFloor}`;
    }

    // Price
    if (values.price) {
      const price = parseFloat(values.price);
      if (price >= 1000000000) {
        const ty = (price / 1000000000).toFixed(1);
        description += `, giá ${ty} tỷ`;
      } else if (price >= 1000000) {
        const trieu = (price / 1000000).toFixed(0);
        description += `, giá ${trieu} triệu`;
      } else {
        description += `, giá ${price.toLocaleString()} VNĐ`;
      }
    }

    // Area
    if (values.area) {
      description += `, diện tích ${values.area}m²`;
    }

    // Interior condition
    if (values.interiorCondition) {
      description += `, ${values.interiorCondition}`;
    }

    // Project name
    if (values.projectName) {
      description += `, dự án ${values.projectName}`;
    }

    // Address
    if (values.detailedAddress && values.ward && values.city) {
      description += `, ${values.detailedAddress}, ${values.ward}, ${values.city}`;
    }

    // Add common details
    if (values.hasElevator === 'co') {
      description += ', có thang máy';
    }
    if (values.hasParking === 'co') {
      description += ', có chỗ đậu xe';
    }

    return description.trim();
  };

  // Handle form field changes to auto-update description
  const handleFieldChange = () => {
    const description = generateDescription();
    if (description) {
      form.setFieldsValue({ description });
    }
  };

  // Custom upload handler
  const handleUpload = async (options: any) => {
    const { file, onSuccess, onError, onProgress } = options;
    
    try {
      setUploading(true);
      
      // Validate file
      const validation = uploadService.validateFile(file);
      if (!validation.isValid) {
        onError(new Error(validation.error));
        message.error(validation.error);
        return;
      }

      // Show progress (simulate progress for better UX)
      onProgress({ percent: 10 });
      
      // Upload file
      const response = await uploadService.uploadFile({
        file,
        fileName: file.name.split('.')[0],
        fileType: 'image',
        folderPath: 'images'
      });

      onProgress({ percent: 100 });

      // Update existing file entry with uploaded URL instead of appending new
      setFileList(prev => prev.map(item => {
        if (item.uid === file.uid) {
          return { ...item, status: 'done', url: response.url, thumbUrl: response.url, response };
        }
        // Also handle antd replacing item references: match by name+size if uid differs
        if (!item.url && item.name === file.name && (item.size === file.size || !item.size)) {
          return { ...item, status: 'done', url: response.url, thumbUrl: response.url, response };
        }
        return item;
      }));
      onSuccess(response);
      message.success('Upload thành công!');
      
    } catch (error) {
      console.error('Upload error:', error);
      onError(error);
      message.error('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  // Handle file list changes
  const handleFileListChange = ({ file, fileList: newFileList }: any) => {
    // Normalize items: if server responded, persist CDN URL into url/thumbUrl and mark done
    const normalized = newFileList.map((item: any) => {
      const resp = item?.response || file?.response;
      if (resp && resp.url) {
        return {
          ...item,
          status: 'done',
          url: resp.url,
          thumbUrl: resp.url,
          response: resp,
        };
      }
      return item;
    });
    setFileList(normalized);
  };

  // Resolve filePath from upload response or CDN URL
  const resolveFilePath = (file: any): string | undefined => {
    // Prefer server response
    const resp = file?.response;
    if (resp && typeof resp === 'object' && 'filePath' in resp && resp.filePath) {
      return resp.filePath as string;
    }

    // Fallback: derive from URL like https://cdn.prosai.vn/uploads/images/abc.jpg
    const fileUrl: string | undefined = file?.url || file?.thumbUrl;
    if (fileUrl) {
      const marker = '/uploads/';
      const idx = fileUrl.indexOf(marker);
      if (idx >= 0) {
        return fileUrl.substring(idx + marker.length);
      }
    }
    return undefined;
  };

  // Handle file removal (call delete API)
  const handleRemove = async (file: any) => {
    try {
      setUploading(true);
      const filePath = resolveFilePath(file);

      if (filePath) {
        await uploadService.deleteFile(filePath);
      }

      const newFileList = fileList.filter(item => item.uid !== file.uid);
      setFileList(newFileList);
      message.success('Đã xóa ảnh');
      return true;
    } catch (error) {
      console.error('Delete file error:', error);
      message.error('Xóa ảnh thất bại. Vui lòng thử lại.');
      return false;
    } finally {
      setUploading(false);
    }
  };

  const uploadProps = {
    fileList,
    onChange: handleFileListChange,
    customRequest: handleUpload,
    onRemove: handleRemove,
    multiple: true, // Allow multiple file selection
    accept: 'image/*', // Accept only image files
    maxCount: 10, // Maximum 10 images
    listType: 'picture-card' as const,
    showUploadList: {
      showPreviewIcon: true,
      showRemoveIcon: true,
      showDownloadIcon: false,
    },
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
          {isEditMode ? 'Cập nhật tin bất động sản' : 'Đăng tin bất động sản của bạn'}
        </h1>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{
              postingDate: dayjs(),
              expirationDate: dayjs().add(7, 'day'),
              propertyType: PROPERTY_TYPES[0].value,
              listingType: LISTING_TYPES[0].value,
              bedrooms: BEDROOM_OPTIONS[0].value,
              bathrooms: BATHROOM_OPTIONS[0].value,
              hasElevator: 'co',
              hasParking: 'co',
              legalStatus: LEGAL_STATUS[0].value,
              city: undefined,
              ward: '',
              detailedAddress: ''
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
                 <Select 
                   size="large" 
                   placeholder="Chọn loại bất động sản"
                   onChange={handleFieldChange}
                 >
                   {PROPERTY_TYPES.map(type => (
                     <Option key={type.value} value={type.value}>
                       {type.label}
                     </Option>
                   ))}
                 </Select>
               </Form.Item>

              <Form.Item
                label="Hình thức"
                name="listingType"
                rules={[{ required: true, message: 'Vui lòng chọn hình thức' }]}
                className="mb-0"
              >
                <Select size="large" placeholder="Chọn hình thức">
                  {LISTING_TYPES.map(type => (
                    <Option key={type.value} value={type.value}>
                      {type.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            {/* Location Selection - City and Ward */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Form.Item
                label="Tỉnh/Thành phố"
                name="city"
                rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố' }]}
                className="mb-0"
              >
                <Select 
                  size="large" 
                  placeholder="Chọn tỉnh/thành phố"
                  onChange={handleCityChange}
                >
                  {CITIES.map(city => (
                    <Option key={city.value} value={city.value}>
                      {city.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Phường/Xã"
                name="ward"
                rules={[{ required: true, message: 'Vui lòng chọn phường/xã' }]}
                className="mb-0"
              >
                <Select 
                  size="large" 
                  placeholder="Chọn phường/xã"
                  disabled={!selectedCity}
                  loading={loadingWards}
                  showSearch
                  allowClear
                  style={{
                    color: !selectedCity ? '#999' : 'inherit'
                  }}
                  filterOption={(input, option) =>
                    String(option?.children || '').toLowerCase().includes(input.toLowerCase())
                  }
                  notFoundContent={
                    !selectedCity 
                      ? "Vui lòng chọn tỉnh/thành phố trước" 
                      : loadingWards 
                        ? "Đang tải danh sách phường/xã..." 
                        : "Không có dữ liệu phường/xã"
                  }
                >
                  {!selectedCity && (
                    <Option value="" disabled>
                      Vui lòng chọn tỉnh/thành phố trước
                    </Option>
                  )}
                  {wards.map(ward => (
                    <Option key={ward.id} value={ward.name}>
                      {ward.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            {/* Detailed Address and Project Code */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Form.Item
                 label="Địa chỉ chi tiết"
                 name="detailedAddress"
                 rules={[{ required: true, message: 'Vui lòng nhập địa chỉ chi tiết' }]}
                 className="mb-0"
              >
                 <Input 
                   placeholder="Số nhà, tên đường, khu vực..." 
                   size="large"
                   onChange={handleFieldChange}
                 />
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
                 rules={[
                   { required: true, message: 'Vui lòng nhập giá' },
                   { pattern: /^\d+$/, message: 'Giá phải là số nguyên' }
                 ]}
                 className="mb-0"
              >
                 <Input 
                   placeholder="Nhập giá (VD: 2500000000)" 
                   size="large"
                   onChange={handleFieldChange}
                 />
               </Form.Item>

              <Form.Item
                 label="Tên dự án"
                 name="projectName"
                 className="mb-0"
              >
                 <Input 
                   placeholder="Nhập tên dự án" 
                   size="large"
                   onChange={handleFieldChange}
                 />
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
                 <Input 
                   placeholder="Nhập tầng hiện tại" 
                   size="large"
                   onChange={handleFieldChange}
                 />
               </Form.Item>
            </div>

            {/* Area and Total Floors - Two Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Form.Item
                 label="Diện tích (m²)"
                 name="area"
                 rules={[
                   { required: true, message: 'Vui lòng nhập diện tích' },
                   { pattern: /^\d+(\.\d+)?$/, message: 'Diện tích phải là số' }
                 ]}
                 className="mb-0"
              >
                 <Input 
                   placeholder="Nhập diện tích (VD: 75)" 
                   size="large"
                   onChange={handleFieldChange}
                 />
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
                 <Select 
                   size="large" 
                   placeholder="Chọn số phòng ngủ"
                   onChange={handleFieldChange}
                 >
                   {BEDROOM_OPTIONS.map(option => (
                     <Option key={option.value} value={option.value}>
                       {option.label}
                     </Option>
                   ))}
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
                 <Select 
                   size="large" 
                   placeholder="Chọn số phòng vệ sinh"
                   onChange={handleFieldChange}
                 >
                   {BATHROOM_OPTIONS.map(option => (
                     <Option key={option.value} value={option.value}>
                       {option.label}
                     </Option>
                   ))}
                 </Select>
               </Form.Item>

              <Form.Item
                 label="Có thang máy"
                 name="hasElevator"
                 className="mb-0"
              >
                 <Select 
                   size="large" 
                   placeholder="Chọn"
                   onChange={handleFieldChange}
                 >
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
                <Select size="large" placeholder="Chọn tình trạng pháp lý">
                  {LEGAL_STATUS.map(status => (
                    <Option key={status.value} value={status.value}>
                      {status.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                 label="Có chỗ đậu xe"
                 name="hasParking"
                 className="mb-0"
               >
                 <Select 
                   size="large" 
                   placeholder="Chọn"
                   onChange={handleFieldChange}
                 >
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
                 <Input 
                   placeholder="Nhập tình trạng nội thất" 
                   size="large"
                   onChange={handleFieldChange}
                 />
               </Form.Item>

              <Form.Item
                label="Mô tả nội thất"
                name="interiorDescription"
                className="mb-0"
              >
                <Input placeholder="Nhập mô tả nội thất" size="large" />
              </Form.Item>
            </div>

            {/* Direction and Balcony Direction - Two Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Form.Item
                label="Hướng nhà"
                name="direction"
                className="mb-0"
              >
                <Select size="large" placeholder="Chọn hướng nhà">
                  <Option value="Đông">Đông</Option>
                  <Option value="Tây">Tây</Option>
                  <Option value="Nam">Nam</Option>
                  <Option value="Bắc">Bắc</Option>
                  <Option value="Đông Nam">Đông Nam</Option>
                  <Option value="Đông Bắc">Đông Bắc</Option>
                  <Option value="Tây Nam">Tây Nam</Option>
                  <Option value="Tây Bắc">Tây Bắc</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Hướng ban công"
                name="balconyDirection"
                className="mb-0"
              >
                <Select size="large" placeholder="Chọn hướng ban công">
                  <Option value="Đông">Đông</Option>
                  <Option value="Tây">Tây</Option>
                  <Option value="Nam">Nam</Option>
                  <Option value="Bắc">Bắc</Option>
                  <Option value="Đông Nam">Đông Nam</Option>
                  <Option value="Đông Bắc">Đông Bắc</Option>
                  <Option value="Tây Nam">Tây Nam</Option>
                  <Option value="Tây Bắc">Tây Bắc</Option>
                </Select>
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
                   placeholder="Mô tả sẽ được tự động tạo dựa trên thông tin bạn nhập ở trên. Bạn có thể chỉnh sửa thêm nếu muốn."
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
                <Upload {...uploadProps}>
                  <Button icon={<UploadOutlined />} size="large" loading={uploading}>
                    {uploading ? 'Đang tải lên...' : 'Chọn ảnh'}
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
                loading={submitting}
                disabled={submitting || uploading}
              >
                {submitting ? (isEditMode ? 'ĐANG CẬP NHẬT...' : 'ĐANG ĐĂNG TIN...') : (isEditMode ? 'CẬP NHẬT' : 'ĐĂNG TIN')}
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
