'use client';

import React, { useState, useEffect } from 'react';
import { Breadcrumb } from '@/components/ui/navigation';
import { ImageGallery } from '@/components/ui';
import { ContactSidebar, PropertyInfo, PropertyMap, PropertyDetails, ContactInfo, RelatedProperties } from '@/components/features/property';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getPropertyById } from '@/services/property';
import { formatPrice, formatArea, formatRelativeTime, formatDateTime } from '@/utils/format';
import { Loading } from '@/components/ui/feedback';

const PropertyDetailPage: React.FC = () => {
  const params = useParams();
  const propertyId = params?.id as string;
  
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getPropertyById(propertyId);
        setProperty(data);
      } catch (err: any) {
        console.error('Error fetching property:', err);
        setError(err.message || 'Không thể tải thông tin bất động sản');
      } finally {
        setLoading(false);
      }
    };

    if (propertyId) {
      fetchProperty();
    }
  }, [propertyId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loading className="bg-white" size="large" text="Đang tải thông tin..." />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-medium text-gray-900 mb-2">Không tìm thấy thông tin</h2>
          <p className="text-gray-600 mb-4">{error || 'Bất động sản không tồn tại'}</p>
          <Link href="/search" className="text-blue-600 hover:text-blue-800">
            Quay lại tìm kiếm
          </Link>
        </div>
      </div>
    );
  }

  const mockImages = [
    '/images/imgdemo_new@2x.png',
    '/images/imgdemo_new@2x.png',
    '/images/imgdemo_new@2x.png',
    '/images/imgdemo_new@2x.png',
  ];

  const mockContact = {
    name: 'Nguyễn Văn Minh',
    phone: '0901234567',
    avatar: '',
    isAgent: true
  };

  const mockMapData = {
    address: 'Phố Trần Duy Hưng, Ba Đình, Hà Nội',
    lat: 21.0285,
    lng: 105.8542
  };

  const mockRelatedProperties = [
    {
      id: '1',
      title: 'Căn hộ Vinhomes Metropolis',
      price: '9.8 tỷ',
      area: '90m²',
      location: 'Quận Ba Đình',
      url: '/property/vinhomes-metropolis-1'
    },
    {
      id: '2',
      title: 'Căn hộ D\'. El Dorado Tây Hồ',
      price: '7.5 tỷ',
      area: '78m²',
      location: 'Quận Tây Hồ',
      url: '/property/el-dorado-tay-ho-2'
    },
    {
      id: '3',
      title: 'Chung cư Lancaster Núi Trúc',
      price: '8.9 tỷ',
      area: '85m²',
      location: 'Quận Đống Đa',
      url: '/property/lancaster-nui-truc-3'
    },
    {
      id: '4',
      title: 'Căn hộ Vinhomes Metropolis',
      price: '9.8 tỷ',
      area: '90m²',
      location: 'Quận Ba Đình',
      url: '/property/vinhomes-metropolis-4'
    },
    {
      id: '5',
      title: 'Căn hộ D\'. El Dorado Tây Hồ',
      price: '7.5 tỷ',
      area: '78m²',
      location: 'Quận Tây Hồ',
      url: '/property/el-dorado-tay-ho-5'
    },
    {
      id: '6',
      title: 'Chung cư Lancaster Núi Trúc',
      price: '8.9 tỷ',
      area: '85m²',
      location: 'Quận Đống Đa',
      url: '/property/lancaster-nui-truc-6'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 p-3">
        <div className="responsive-container mx-auto px-4">
          <Breadcrumb
            separator=">"
            className="text-sm"
            items={[
              {
                title: <Link href="/" className="text-gray-600 hover:text-blue-600">Trang chủ</Link>,
              },
              {
                title: <Link href="/search" className="text-gray-600 hover:text-blue-600">Tìm kiếm</Link>,
              },
              {
                title: <span className="text-gray-900">Chi tiết tin đăng</span>,
              },
            ]}
          />
        </div>
      </div>

      <div className="responsive-container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="col-span-12 lg:col-span-9">
            <h1 className="text-2xl md:text-3xl font-font-medium text-gray-900 mb-3 leading-tight">
              {property.title}
            </h1>
            <div className="flex items-center gap-2 mb-3 text-[#8D8DA1]">
              <span className="font-medium">Ngày đăng: <span className="text-gray-500 font-normal">{formatDateTime(property.created_at)}</span></span>
              <span className="text-gray-500 ">|</span>
              <span className="font-medium">Cập nhật: <span className="text-gray-500 font-normal">{formatDateTime(property.updated_at)}</span></span> 
            </div>
            {/* Image Gallery */}
             <ImageGallery 
               images={property.images?.length > 0 ? property.images : mockImages}
               title={property.title}
               className="mb-4"
             />

             {/* Property Details */}
             <PropertyDetails
               price={property.price ? formatPrice(property.price[0]) : 'Liên hệ'}
               area={property.area ? formatArea(property.area[0]) : 'Liên hệ'}
               bedrooms={property.bedrooms || 0}
               bathrooms={property.bathrooms || 0}
               rating={property.ranking_score || 0}
               className="mb-"
             />

             {/* Property Info */}
            <div className="bg-white py-6">
              <PropertyInfo property={{
                ...property,
                price: property.price ? formatPrice(property.price[0]) : 'Liên hệ',
                area: property.area ? formatArea(property.area[0]) : 'Liên hệ',
                description: property.description || '',
                features: [
                  `Loại BĐS: ${property.property_type || 'Không xác định'}`,
                  `Trạng thái: ${property.listing_type || 'Không xác định'}`,
                  `Pháp lý: ${property.legal_status || 'Không xác định'}`,
                  `Địa chỉ: ${property.address || 'Không xác định'}`,
                  `Quận/Huyện: ${property.district || 'Không xác định'}`,
                  `Thành phố: ${property.city || 'Không xác định'}`,
                  property.total_floors ? `Số tầng: ${property.total_floors}` : null,
                  property.year_built ? `Năm xây dựng: ${property.year_built}` : null,
                ].filter(Boolean)
              }} />
            </div>

            {/* Map */}
            <PropertyMap mapData={{
              address: property.address || '',
              lat: 21.0285, // Default coordinates for Hanoi
              lng: 105.8542
            }}/>

            {/* Contact Info */}
            <div className="bg-white py-6">
              <ContactInfo />
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <div className="sticky top-6">
              <ContactSidebar 
                contactInfo={{
                  name: property.user_name_social || 'Người đăng',
                  phone: property.phone_user || property.phone_message?.[0] || '',
                  avatar: '',
                  isAgent: true
                }}
                propertyId={propertyId}
                className="mb-6"
              />
              
              {/* Related Properties */}
              <RelatedProperties 
                className="mb-6"
                title="BĐS gợi ý tương tự"
                properties={mockRelatedProperties}
              />

              {/* Related Properties - Similar */}
              <RelatedProperties 
                title="BĐS cùng chủ sở hữu"
                properties={mockRelatedProperties.slice(0, 3)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;