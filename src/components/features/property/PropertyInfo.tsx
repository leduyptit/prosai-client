'use client';

import React from 'react';
import { AIRatingSection, PropertyDetailsGrid } from './';

interface PropertyData {
  id: string;
  title: string;
  price: string;
  area: string;
  bedrooms: number;
  bathrooms: number;
  address: string;
  type: string;
  yearBuilt?: string;
  description: string;
  rating?: number;
  reviewCount?: number;
  pricePerSquareMeter?: string;
  furnitureDescription?: string;
  elevator?: string;
  projectCode?: string;
  parking?: string;
  projectName?: string;
  propertyType?: string;
  currentFloor?: string;
  paymentMethod?: string;
  furniture_details?: string;
}

interface PropertyInfoProps {
  property?: PropertyData;
  className?: string;
}

const PropertyInfo: React.FC<PropertyInfoProps> = ({
  property = {
    id: '1',
    title: 'Căn chung cư hoa chung và sang chảy - Chất khỏi cần tìm The Nelson Private Residences',
    price: '5.2 tỷ',
    area: '85 m²',
    bedrooms: 3,
    bathrooms: 2,
    address: 'Phố Trần Duy Hưng, Ba Đình, Hà Nội',
    type: 'Chung cư',
    yearBuilt: '2023',
    description: 'Căn hộ The Nelson Private Residences tọa lạc tại trung tâm quận Ba Đình, thiết kế hiện đại với đầy đủ tiện ích...',
    rating: 4.8,
    reviewCount: 12,
    furniture_details: 'Nội thất cao cấp, View đẹp, An ninh 24/7, Hồ bơi, Gym, Parking'
  },
  className = ''
}) => {
  return (
    <div className={className}>
      {/* Description */}
      <div className="mb-6">
        <h3 className="text-lg font-font-medium text-gray-900 mb-3">Thông tin mô tả</h3>
        <p className="text-gray-700 leading-relaxed">
          {property.description}
        </p>
      </div>

      {/* Property Details */}
      <PropertyDetailsGrid
        items={[
          {
            icon: "/svgs/icon_vitri.svg",
            iconAlt: "Location",
            label: "Vị trí",
            value: property.address
          },
          {
            icon: "/svgs/icon_phaply.svg",
            iconAlt: "Legal",
            label: "Pháp lý",
            value: property.type
          },
          {
            icon: "/svgs/icon_tongsotang.svg",
            iconAlt: "Floors",
            label: "Tổng số tầng",
            value: property.yearBuilt || 'N/A'
          },
          {
            icon: "/svgs/icon_gia.svg",
            iconAlt: "Price",
            label: "Giá",
            value: property.price || 'N/A'
          },
          {
            icon: "/svgs/icon_noithat.svg",
            iconAlt: "Furniture",
            label: "Nội thất",
            value: property.furniture_details || 'N/A'
          },
          {
            icon: "/svgs/icon_namxaydung.svg",
            iconAlt: "YearBuilt",
            label: "Năm xây dựng",
            value: property.yearBuilt || 'N/A'
          },
          {
            icon: "/svgs/icon_giam2.svg",
            iconAlt: "PricePerSquareMeter",
            label: "Giá/m2",
            value: property.pricePerSquareMeter || 'N/A'
          },
          {
            icon: "/svgs/icon_mota.svg",
            iconAlt: "FurnitureDescription",
            label: "Mô tả nội thất",
            value: property.furnitureDescription || 'N/A'
          },
          {
            icon: "/svgs/icon_thangmay.svg",
            iconAlt: "Elevator",
            label: "Thang máy",
            value: property.elevator || 'N/A'
          },
          {
            icon: "/svgs/icon_dientich.svg",
            iconAlt: "Area",
            label: "Diện tích",
            value: property.area || 'N/A'
          },
          {
            icon: "/svgs/icon_maduan.svg",
            iconAlt: "ProjectCode",
            label: "Mã dự án",
            value: property.projectCode || 'N/A'
          },
          {
            icon: "/svgs/icon_chodauxe.svg",
            iconAlt: "Parking",
            label: "Chỗ đậu xe",
            value: property.parking || 'N/A'
          },
          {
            icon: "/svgs/icon_phongngu.svg",
            iconAlt: "Bedrooms",
            label: "Phòng ngủ",
            value: property.bedrooms || 'N/A'
          },
          {
            icon: "/svgs/icon_tenduan.svg",
            iconAlt: "ProjectName",
            label: "Tên dự án",
            value: property.projectName || 'N/A'
          },
          {
            icon: "/svgs/icon_loaibds.svg",
            iconAlt: "PropertyType",
            label: "Loại BĐS",
            value: property.propertyType || 'N/A'
          },
          {
            icon: "/svgs/icon_phongtam.svg",
            iconAlt: "Bathrooms",
            label: "Phòng vệ sinh, phòng tắm",
            value: property.bathrooms || 'N/A'
          },
          {
            icon: "/svgs/icon_tanghientai.svg",
            iconAlt: "CurrentFloor",
            label: "Tầng hiện tại",
            value: property.currentFloor || 'N/A'
          },
          {
            icon: "/svgs/icon_hinhthuc.svg",
            iconAlt: "PaymentMethod",
            label: "Hình thức",
            value: property.paymentMethod || 'N/A'
          }
        ]}
        columns={6}
      />

        {/* AI Review */}
        <AIRatingSection
          ratings={[
            {
              icon: "/svgs/AI_gia.svg",
              label: "Giá",
              rating: property.rating
            },
            {
              icon: "/svgs/AI_dientich.svg",
              label: "Diện tích",
              rating: property.rating
            },
            {
              icon: "/svgs/AI_phaply.svg",
              label: "Pháp lý",
              rating: property.rating
            },
            {
              icon: "/svgs/AI_noithat.svg",
              label: "Nội thất",
              rating: property.rating
            },
            {
              icon: "/svgs/AI_tienich.svg",
              label: "Tiện ích vị trí",
              rating: property.rating
            },
            {
              icon: "/svgs/AI_phuhop.svg",
              label: "Phù hợp",
              rating: property.rating
            },
            {
              icon: "/svgs/AI_cohoi.svg",
              label: "Cơ hội",
              rating: property.rating
            },
            {
              icon: "/svgs/Tong_star.svg",
              label: "Tổng",
              isTotal: true,
              totalScore: 28
            }
          ]}
        />
    </div>
  );
};

export default PropertyInfo;