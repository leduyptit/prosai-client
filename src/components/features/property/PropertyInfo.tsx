'use client';

import React from 'react';
import { AIRatingSection, PropertyDetailsGrid } from './';
import { formatPrice } from '@/utils/format';
import { PROPERTY_TYPES, LISTING_TYPES, LEGAL_STATUS } from '@/constants';

interface PropertyData {
  id: string;
  title: string;
  price: string;
  area: string;
  bedrooms: number;
  bathrooms: number;
  address: string;
  type: string;
  year_built?: string;
  description: string;
  ranking_score?: number;
  elevator?: string;
  project_id?: string;
  has_parking?: string;
  project_name?: string;
  property_type?: string;
  floor?: string;
  furniture_details?: string;
  attribuite_score?: string;
  total_floors?: string;
  price_all?: number;
  legal_status?: string | number;
  listing_type?: string | number;
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
    year_built: '2023',
    description: 'Căn hộ The Nelson Private Residences tọa lạc tại trung tâm quận Ba Đình, thiết kế hiện đại với đầy đủ tiện ích...',
    rating: 4.8,
    reviewCount: 12,
    furniture_details: 'Nội thất cao cấp, View đẹp, An ninh 24/7, Hồ bơi, Gym, Parking'
  },
  className = ''
}) => {
  // Helper functions to convert numeric values to display labels
  const getPropertyTypeLabel = (value: string | number) => {
    const type = PROPERTY_TYPES.find(t => t.value === String(value));
    return type?.label || 'Không xác định';
  };

  const getListingTypeLabel = (value: string | number) => {
    const type = LISTING_TYPES.find(t => t.value === String(value));
    return type?.label || 'Không xác định';
  };

  const getLegalStatusLabel = (value: string | number) => {
    const status = LEGAL_STATUS.find(s => s.value === String(value));
    return status?.label || 'Không xác định';
  };
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
            value: getLegalStatusLabel(property.legal_status || '')
          },
          {
            icon: "/svgs/icon_tongsotang.svg",
            iconAlt: "Floors",
            label: "Tổng số tầng",
            value: property.total_floors || 'N/A'
          },
          {
            icon: "/svgs/icon_gia.svg",
            iconAlt: "Price",
            label: "Giá",
            value: formatPrice(property.price_all || 0) || 'N/A'
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
            value: property.year_built || 'N/A'
          },
          {
            icon: "/svgs/icon_giam2.svg",
            iconAlt: "PricePerSquareMeter",
            label: "Giá/m2",
            value: property.price || 'N/A'
          },
          {
            icon: "/svgs/icon_mota.svg",
            iconAlt: "FurnitureDescription",
            label: "Mô tả nội thất",
            value: property.furniture_details || 'N/A'
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
            value: property.project_id || 'N/A'
          },
          {
            icon: "/svgs/icon_chodauxe.svg",
            iconAlt: "Parking",
            label: "Chỗ đậu xe",
            value: property.has_parking || 'N/A'
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
            value: property.project_name || 'N/A'
          },
          {
            icon: "/svgs/icon_loaibds.svg",
            iconAlt: "PropertyType",
            label: "Loại BĐS",
            value: getPropertyTypeLabel(property.property_type || '')
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
            value: property.floor || 'N/A'
          },
          {
            icon: "/svgs/icon_hinhthuc.svg",
            iconAlt: "PaymentMethod",
            label: "Hình thức",
            value: getListingTypeLabel(property.listing_type || '')
          }
        ]}
        columns={6}
      />

        {/* AI Review */}
        <AIRatingSection
          ratings={(() => {
            try {
              // Handle both string and object formats
              let scores: Record<string, number> = {};
              if (property.attribuite_score) {
                if (typeof property.attribuite_score === 'string') {
                  scores = JSON.parse(property.attribuite_score);
                } else {
                  scores = property.attribuite_score as Record<string, number>;
                }
              }
              return [
                {
                  icon: "/svgs/AI_gia.svg",
                  label: "Giá",
                  rating: scores["giá"] || 0
                },
                {
                  icon: "/svgs/AI_dientich.svg",
                  label: "Diện tích",
                  rating: scores["diện tích"] || 0
                },
                {
                  icon: "/svgs/AI_phaply.svg",
                  label: "Pháp lý",
                  rating: scores["pháp lý"] || 0
                },
                {
                  icon: "/svgs/AI_noithat.svg",
                  label: "Nội thất",
                  rating: scores["nội thất"] || 0
                },
                {
                  icon: "/svgs/AI_tienich.svg",
                  label: "Tiện ích vị trí",
                  rating: scores["tiện ích vị trí"] || 0
                },
                {
                  icon: "/svgs/AI_phuhop.svg",
                  label: "Phù hợp",
                  rating: scores["phù hợp"] || 0
                },
                {
                  icon: "/svgs/AI_cohoi.svg",
                  label: "Cơ hội",
                  rating: scores["cơ hội"] || 0
                },
                {
                  icon: "/svgs/Tong_star.svg",
                  label: "Tổng",
                  isTotal: true,
                  totalScore: scores["tổng"] || 0
                }
              ];
            } catch (error) {
              console.error('Error parsing attribute_score:', error);
              console.log('Raw attribute_score:', property.attribuite_score);
              return [];
            }
          })()}
        />
    </div>
  );
};

export default PropertyInfo;