'use client';

import React from 'react';
import { Breadcrumb } from '@/components/ui/navigation';
import { ImageGallery } from '@/components/ui';
import { ContactSidebar, PropertyInfo, PropertyMap, PropertyDetails, ContactInfo, RelatedProperties } from '@/components/features/property';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const PropertyDetailPage: React.FC = () => {
  const params = useParams();
  const propertyId = params?.id as string;

  // Mock data - replace with actual API call
  const mockProperty = {
    date_posted: '2023-01-01',
    date_end: '2023-01-01',
    id: propertyId,
    title: 'Căn chung cư hoa chung và sang chảy - Chất khỏi cần tìm The Nelson Private Residences',
    price: '5.2 tỷ',
    area: '85 m²',
    bedrooms: 3,
    bathrooms: 2,
    address: 'Phố Trần Duy Hưng, Ba Đình, Hà Nội',
    type: 'Chung cư',
    yearBuilt: '2023',
    description: 'Căn hộ The Nelson Private Residences tọa lạc tại vị trí đắc địa trung tâm quận Ba Đình, Hà Nội. Với thiết kế hiện đại, tinh tế và đầy đủ tiện ích cao cấp, đây là lựa chọn hoàn hảo cho những gia đình trẻ muốn sống trong môi trường đẳng cấp và tiện nghi.',
    features: [
      'Nội thất cao cấp',
      'View thành phố tuyệt đẹp',
      'An ninh 24/7',
      'Hồ bơi vô cực',
      'Phòng gym hiện đại',
      'Chỗ đậu xe riêng',
      'Gần trung tâm thương mại',
      'Khu vui chơi trẻ em'
    ],
    rating: 4.8,
    reviewCount: 12
  };

  const mockImages = [
    '/images/imgdemo_new@2x.png',
    '/images/img_basic@2x.png',
    '/images/img_gold@2x.png',
    '/images/img_silver@2x.png',
    '/images/imgdemo_new@2x.png',
    '/images/img_basic@2x.png',
    '/images/img_gold@2x.png'
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
              {mockProperty.title}
            </h1>
            <div className="flex items-center gap-2 mb-3 text-[#8D8DA1]">
              <span className="font-medium">Ngày đăng: <span className="text-gray-500 font-normal">{mockProperty.date_posted}</span></span>
              <span className="text-gray-500 ">|</span>
              <span className="font-medium">Ngày hết hạn: <span className="text-gray-500 font-normal">{mockProperty.date_end}</span></span> 
            </div>
            {/* Image Gallery */}
             <ImageGallery 
               images={mockImages}
               title={mockProperty.title}
               className="mb-4"
             />

             {/* Property Details */}
             <PropertyDetails
               price={mockProperty.price}
               area={mockProperty.area}
               bedrooms={mockProperty.bedrooms}
               bathrooms={mockProperty.bathrooms}
               rating={mockProperty.rating}
               className="mb-"
             />

             {/* Property Info */}
            <div className="bg-white py-6">
              <PropertyInfo property={mockProperty} />
            </div>

            {/* Map */}
            <PropertyMap mapData={mockMapData}/>

            {/* Contact Info */}
            <div className="bg-white py-6">
              <ContactInfo />
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <div className="sticky top-6">
              <ContactSidebar 
                contactInfo={mockContact}
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