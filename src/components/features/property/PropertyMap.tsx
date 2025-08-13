'use client';

import React from 'react';
import { EnvironmentOutlined, CarOutlined, ShoppingOutlined, MedicineBoxOutlined, BankOutlined } from '@ant-design/icons';

interface MapData {
  address: string;
  lat?: number;
  lng?: number;
  nearbyPlaces?: Array<{
    name: string;
    type: string;
    distance: string;
    icon: React.ReactNode;
  }>;
}

interface PropertyMapProps {
  mapData?: MapData;
  className?: string;
}

const PropertyMap: React.FC<PropertyMapProps> = ({
  mapData = {
    address: 'Phố Trần Duy Hưng, Ba Đình, Hà Nội',
    lat: 21.0285,
    lng: 105.8542,
  },
  className = ''
}) => {
  return (
    <div className={`bg-white overflow-hidden ${className}`}>
      <div className="py-6">
        <h3 className="text-lg font-font-medium text-gray-900 mb-4">
          Xem trên bản đồ
        </h3>
        {/* Map Placeholder - Replace with actual map component */}
        <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center mb-4">
          <div className="text-center">
            <EnvironmentOutlined className="text-4xl text-gray-400 mb-2" />
            <p className="text-gray-500">Bản đồ vị trí</p>
            <p className="text-xs text-gray-400 mt-2">
              {mapData.lat && mapData.lng ? `${mapData.lat}, ${mapData.lng}` : 'Tọa độ không khả dụng'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyMap;