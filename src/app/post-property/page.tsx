'use client';

import React, { useMemo, useState } from 'react';
import { Form, Input, Select, DatePicker, Button, Upload, Breadcrumb, App } from 'antd';
import { UploadOutlined, CalendarOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { APP_CONFIG } from '@/utils/env';
import Link from 'next/link';
import { propertiesService, PropertyPostRequest } from '@/services';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

const { TextArea } = Input;
const { Option } = Select;

const PostPropertyPage: React.FC = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [districts, setDistricts] = useState<string[]>([]);
  const [wards, setWards] = useState<string[]>([]);
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { message } = App.useApp();
  const editId = useMemo(() => searchParams.get('id') || undefined, [searchParams]);
  const isEditMode = Boolean(editId);

  // Initialize districts when component mounts
  React.useEffect(() => {
    const initialCity = form.getFieldValue('city');
    if (initialCity) {
      setDistricts(getDistrictsByCity(initialCity));
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
        // Prefill select lists for district/ward
        const districtsList = getDistrictsByCity(p.city || '');
        setDistricts(districtsList);
        const wardsList = getWardsByDistrict(p.district || '');
        setWards(wardsList);

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
          propertyType: mapPropertyTypeToForm(p.property_type),
          listingType: mapListingTypeToForm(p.listing_type),
          price: String(p.price ?? ''),
          area: String(p.area ?? ''),
          city: p.city || undefined,
          district: p.district || undefined,
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

  const mapPropertyTypeToForm = (value?: number) => {
    const reverseMap: { [key: number]: string } = {
      1: 'chung-cu',
      2: 'nha-rieng',
      3: 'biet-thu',
      4: 'nha-pho',
      5: 'dat-nen',
      6: 'van-phong',
      7: 'cua-hang',
    };
    return value ? reverseMap[value] : undefined;
  };

  const mapListingTypeToForm = (value?: number) => {
    const reverseMap: { [key: number]: string } = {
      1: 'mua',
      2: 'ban',
      3: 'thue',
      4: 'cho-thue',
    };
    return value ? reverseMap[value] : undefined;
  };

  const handleSubmit = async (values: any) => {
    if (!session?.user?.id) {
      message.error('Vui lòng đăng nhập để đăng tin');
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
        address: `${values.detailedAddress}, ${values.ward}, ${values.district}, ${values.city}`,
        ward: values.ward,
        district: values.district,
        city: values.city,
        num_bedrooms: parseInt(values.bedrooms) || 0,
        num_bathrooms: parseInt(values.bathrooms) || 0,
        legal_status: values.legalStatus || 1,
        direction: values.direction,
        balcony_direction: values.balconyDirection,
        images: fileList.map((file: any) => file.url || file.thumbUrl || ''),
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
    const typeMap: { [key: string]: number } = {
      'chung-cu': 1,
      'nha-rieng': 2,
      'biet-thu': 3,
      'nha-pho': 4,
      'dat-nen': 5,
      'van-phong': 6,
      'cua-hang': 7
    };
    return typeMap[type] || 1;
  };

  const getListingTypeNumber = (type: string): number => {
    const typeMap: { [key: string]: number } = {
      'mua': 1,
      'ban': 2,
      'thue': 3,
      'cho-thue': 4
    };
    return typeMap[type] || 1;
  };

  // Handle city change to populate districts
  const handleCityChange = (city: string) => {
    form.setFieldsValue({ district: '', ward: '' });
    setDistricts(getDistrictsByCity(city));
    setWards([]);
    handleFieldChange();
  };

  // Handle district change to populate wards
  const handleDistrictChange = (district: string) => {
    form.setFieldsValue({ ward: '' });
    setWards(getWardsByDistrict(district));
    handleFieldChange();
  };

  // Auto-generate description based on form values
  const generateDescription = () => {
    const values = form.getFieldsValue();
    let description = '';

    // Property type
    if (values.propertyType) {
      const propertyTypeMap: { [key: string]: string } = {
        'chung-cu': 'Căn hộ',
        'nha-rieng': 'Nhà riêng',
        'biet-thu': 'Biệt thự',
        'nha-pho': 'Nhà phố',
        'dat-nen': 'Đất nền',
        'van-phong': 'Văn phòng',
        'cua-hang': 'Cửa hàng'
      };
      description += propertyTypeMap[values.propertyType] || '';
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
    if (values.detailedAddress && values.ward && values.district && values.city) {
      description += `, ${values.detailedAddress}, ${values.ward}, ${values.district}, ${values.city}`;
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

  // Get districts based on selected city
  const getDistrictsByCity = (city: string): string[] => {
    const cityDistricts: { [key: string]: string[] } = {
      'Hà Nội': [
        'Ba Đình', 'Hoàn Kiếm', 'Tây Hồ', 'Long Biên', 'Cầu Giấy', 'Đống Đa', 
        'Hai Bà Trưng', 'Hoàng Mai', 'Thanh Xuân', 'Sóc Sơn', 'Đông Anh', 
        'Gia Lâm', 'Nam Từ Liêm', 'Thanh Trì', 'Bắc Từ Liêm', 'Mê Linh', 
        'Phú Xuyên', 'Thường Tín', 'Phúc Thọ', 'Ba Vì', 'Thạch Thất', 'Chương Mỹ', 
        'Thanh Oai', 'Thường Tín', 'Phú Xuyên', 'Ứng Hòa', 'Mỹ Đức'
      ],
      'TP. Hồ Chí Minh': [
        'Quận 1', 'Quận 2', 'Quận 3', 'Quận 4', 'Quận 5', 'Quận 6', 'Quận 7', 
        'Quận 8', 'Quận 9', 'Quận 10', 'Quận 11', 'Quận 12', 'Tân Bình', 
        'Tân Phú', 'Phú Nhuận', 'Gò Vấp', 'Bình Thạnh', 'Thủ Đức', 'Bình Tân', 
        'Củ Chi', 'Hóc Môn', 'Bình Chánh', 'Nhà Bè', 'Cần Giờ'
      ],
      'Đà Nẵng': [
        'Hải Châu', 'Thanh Khê', 'Sơn Trà', 'Ngũ Hành Sơn', 'Liên Chiểu', 
        'Cẩm Lệ', 'Hòa Vang', 'Hoàng Sa'
      ],
      'Hải Phòng': [
        'Hồng Bàng', 'Ngô Quyền', 'Lê Chân', 'Hải An', 'Kiến An', 'Đồ Sơn', 
        'Dương Kinh', 'Thủy Nguyên', 'An Dương', 'An Lão', 'Kiến Thụy', 
        'Tiên Lãng', 'Vĩnh Bảo', 'Cát Hải', 'Bạch Long Vĩ'
      ]
    };
    return cityDistricts[city] || [];
  };

  // Get wards based on selected district
  const getWardsByDistrict = (district: string): string[] => {
    const districtWards: { [key: string]: string[] } = {
      'Ba Đình': [
        'Phúc Xá', 'Trúc Bạch', 'Vĩnh Phúc', 'Cống Vị', 'Liễu Giai', 'Nguyễn Trung Trực',
        'Quán Thánh', 'Ngọc Hà', 'Điện Biên', 'Đội Cấn', 'Ngọc Khánh', 'Kim Mã',
        'Giảng Võ', 'Thành Công', 'Phúc Xá', 'Trúc Bạch', 'Vĩnh Phúc', 'Cống Vị'
      ],
      'Hoàn Kiếm': [
        'Phúc Tân', 'Đồng Xuân', 'Hàng Mã', 'Hàng Buồm', 'Hàng Đào', 'Hàng Bồ',
        'Cửa Đông', 'Lý Thái Tổ', 'Hàng Bạc', 'Hàng Gai', 'Hàng Trống', 'Chương Dương',
        'Hàng Trống', 'Cửa Nam', 'Hàng Bông', 'Tràng Tiền', 'Tràng Thi', 'Hàng Bài'
      ],
      'Quận 1': [
        'Bến Nghé', 'Bến Thành', 'Bình Thạnh', 'Cầu Kho', 'Cầu Ông Lãnh', 'Cô Giang',
        'Đa Kao', 'Nguyễn Cư Trinh', 'Nguyễn Thái Bình', 'Phạm Ngũ Lão', 'Tân Định',
        'Tân Sơn Nhì', 'Tân Thành', 'Tân Thới Hiệp', 'Thạnh Xuân', 'Thới An'
      ],
      'Quận 2': [
        'An Khánh', 'An Lợi Đông', 'An Phú', 'Bình An', 'Bình Khánh', 'Bình Trưng Đông',
        'Bình Trưng Tây', 'Cát Lái', 'Thạnh Mỹ Lợi', 'Thảo Điền', 'Thủ Thiêm'
      ]
    };
    return districtWards[district] || [];
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
              propertyType: 'chung-cu',
              listingType: 'mua',
              bedrooms: '1',
              bathrooms: '1',
              hasElevator: 'co',
              hasParking: 'co',
              legalStatus: 1,
              city: 'Hà Nội',
              district: '',
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

            {/* Location Selection - City, District, Ward */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                  <Option value="Hà Nội">Hà Nội</Option>
                  <Option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</Option>
                  <Option value="Đà Nẵng">Đà Nẵng</Option>
                  <Option value="Hải Phòng">Hải Phòng</Option>
                  <Option value="Cần Thơ">Cần Thơ</Option>
                  <Option value="Bình Dương">Bình Dương</Option>
                  <Option value="Đồng Nai">Đồng Nai</Option>
                  <Option value="Bà Rịa - Vũng Tàu">Bà Rịa - Vũng Tàu</Option>
                  <Option value="Khánh Hòa">Khánh Hòa</Option>
                  <Option value="Lâm Đồng">Lâm Đồng</Option>
                  <Option value="Thừa Thiên Huế">Thừa Thiên Huế</Option>
                  <Option value="Quảng Nam">Quảng Nam</Option>
                  <Option value="Quảng Ngãi">Quảng Ngãi</Option>
                  <Option value="Bình Định">Bình Định</Option>
                  <Option value="Phú Yên">Phú Yên</Option>
                  <Option value="Ninh Thuận">Ninh Thuận</Option>
                  <Option value="Bình Thuận">Bình Thuận</Option>
                  <Option value="Kon Tum">Kon Tum</Option>
                  <Option value="Gia Lai">Gia Lai</Option>
                  <Option value="Đắk Lắk">Đắk Lắk</Option>
                  <Option value="Đắk Nông">Đắk Nông</Option>
                  <Option value="Bình Phước">Bình Phước</Option>
                  <Option value="Tây Ninh">Tây Ninh</Option>
                  <Option value="Long An">Long An</Option>
                  <Option value="Tiền Giang">Tiền Giang</Option>
                  <Option value="Bến Tre">Bến Tre</Option>
                  <Option value="Trà Vinh">Trà Vinh</Option>
                  <Option value="Vĩnh Long">Vĩnh Long</Option>
                  <Option value="Đồng Tháp">Đồng Tháp</Option>
                  <Option value="An Giang">An Giang</Option>
                  <Option value="Kiên Giang">Kiên Giang</Option>
                  <Option value="Cà Mau">Cà Mau</Option>
                  <Option value="Bạc Liêu">Bạc Liêu</Option>
                  <Option value="Sóc Trăng">Sóc Trăng</Option>
                  <Option value="Hậu Giang">Hậu Giang</Option>
                  <Option value="Vĩnh Phúc">Vĩnh Phúc</Option>
                  <Option value="Phú Thọ">Phú Thọ</Option>
                  <Option value="Thái Nguyên">Thái Nguyên</Option>
                  <Option value="Lạng Sơn">Lạng Sơn</Option>
                  <Option value="Quảng Ninh">Quảng Ninh</Option>
                  <Option value="Bắc Giang">Bắc Giang</Option>
                  <Option value="Bắc Ninh">Bắc Ninh</Option>
                  <Option value="Hải Dương">Hải Dương</Option>
                  <Option value="Hưng Yên">Hưng Yên</Option>
                  <Option value="Hòa Bình">Hòa Bình</Option>
                  <Option value="Sơn La">Sơn La</Option>
                  <Option value="Lai Châu">Lai Châu</Option>
                  <Option value="Điện Biên">Điện Biên</Option>
                  <Option value="Yên Bái">Yên Bái</Option>
                  <Option value="Tuyên Quang">Tuyên Quang</Option>
                  <Option value="Cao Bằng">Cao Bằng</Option>
                  <Option value="Bắc Kạn">Bắc Kạn</Option>
                  <Option value="Thái Bình">Thái Bình</Option>
                  <Option value="Nam Định">Nam Định</Option>
                  <Option value="Ninh Bình">Ninh Bình</Option>
                  <Option value="Thanh Hóa">Thanh Hóa</Option>
                  <Option value="Nghệ An">Nghệ An</Option>
                  <Option value="Hà Tĩnh">Hà Tĩnh</Option>
                  <Option value="Quảng Bình">Quảng Bình</Option>
                  <Option value="Quảng Trị">Quảng Trị</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Quận/Huyện"
                name="district"
                rules={[{ required: true, message: 'Vui lòng chọn quận/huyện' }]}
                className="mb-0"
              >
                <Select 
                  size="large" 
                  placeholder="Chọn quận/huyện" 
                  disabled={!form.getFieldValue('city')}
                  onChange={handleDistrictChange}
                >
                  {districts.map(district => (
                    <Option key={district} value={district}>{district}</Option>
                  ))}
                  {districts.length === 0 && (
                    <Option value="" disabled>Vui lòng chọn tỉnh/thành phố trước</Option>
                  )}
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
                  disabled={!form.getFieldValue('district')}
                >
                  {wards.map(ward => (
                    <Option key={ward} value={ward}>{ward}</Option>
                  ))}
                  {wards.length === 0 && (
                    <Option value="" disabled>Vui lòng chọn quận/huyện trước</Option>
                  )}
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
                 <Select 
                   size="large" 
                   placeholder="Chọn số phòng vệ sinh"
                   onChange={handleFieldChange}
                 >
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
                  <Option value={1}>Sổ đỏ/Sổ hồng</Option>
                  <Option value={2}>Sổ đỏ chung</Option>
                  <Option value={3}>Giấy tờ hợp lệ</Option>
                  <Option value={4}>Đang hoàn thiện</Option>
                  <Option value={5}>Khác</Option>
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
                loading={submitting}
                disabled={submitting}
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
