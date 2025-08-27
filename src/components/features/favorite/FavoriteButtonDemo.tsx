'use client';

import React from 'react';
import { FavoriteButton } from './index';

// Demo component to show different ways to use FavoriteButton
const FavoriteButtonDemo: React.FC = () => {
  const demoProperty = {
    propertyId: 'h-rsR5cBA3hQ-A2y0JWb',
    title: 'Bán đất 62m2 mặt tiền 5,4m tại Phố Gia Lộc',
    description: 'CHÍNH CHỦ CẦN BÁN ĐẤT - PHỐ GIA LỘC, PHƯỜNG QUẢNG THỊNH, TP. THANH HÓA',
    images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
    price: 990000000,
    area: 62,
    address: 'Phố Gia Lộc, Phường Quảng Thịnh, TP. Thanh Hóa',
    city: 'Thanh Hóa',
    district: 'Thanh Hóa',
    ward: 'Quảng Thịnh'
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">FavoriteButton Demo</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Default Button (Icon only)</h3>
          <FavoriteButton
            propertyId={demoProperty.propertyId}
            title={demoProperty.title}
            description={demoProperty.description}
            images={demoProperty.images}
            price={demoProperty.price}
            area={demoProperty.area}
            address={demoProperty.address}
            city={demoProperty.city}
            district={demoProperty.district}
            ward={demoProperty.ward}
            className="h-10 w-10 rounded-full"
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Button with Text</h3>
          <FavoriteButton
            propertyId={demoProperty.propertyId}
            title={demoProperty.title}
            description={demoProperty.description}
            images={demoProperty.images}
            price={demoProperty.price}
            area={demoProperty.area}
            address={demoProperty.address}
            city={demoProperty.city}
            district={demoProperty.district}
            ward={demoProperty.ward}
            showText={true}
            className="px-4 py-2"
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Small Button</h3>
          <FavoriteButton
            propertyId={demoProperty.propertyId}
            title={demoProperty.title}
            description={demoProperty.description}
            images={demoProperty.images}
            price={demoProperty.price}
            area={demoProperty.area}
            address={demoProperty.address}
            city={demoProperty.city}
            district={demoProperty.district}
            ward={demoProperty.ward}
            size="small"
            className="h-8 w-8 rounded-full"
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Large Button</h3>
          <FavoriteButton
            propertyId={demoProperty.propertyId}
            title={demoProperty.title}
            description={demoProperty.description}
            images={demoProperty.images}
            price={demoProperty.price}
            area={demoProperty.area}
            address={demoProperty.address}
            city={demoProperty.city}
            district={demoProperty.district}
            ward={demoProperty.ward}
            size="large"
            showText={true}
            className="px-6 py-3 text-lg"
          />
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Usage Instructions:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Click the button to add/remove from favorites</li>
          <li>Button automatically checks favorite status on mount</li>
          <li>Shows loading state during API calls</li>
          <li>Handles 201 (created), 409 (already exists), and error cases</li>
          <li>Requires user to be logged in</li>
          <li>Supports custom styling via className prop</li>
        </ul>
      </div>
    </div>
  );
};

export default FavoriteButtonDemo;
