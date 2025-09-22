'use client';

import React, { useState } from 'react';
import { Rating } from '@/components/ui';

const RatingDemo: React.FC = () => {
  const [interactiveRating, setInteractiveRating] = useState<number>(3.5);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-medium text-gray-900 mb-8">Rating Component Demo</h1>
        
        <div className="space-y-8">
          {/* Basic Ratings */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-font-medium mb-4">Basic Ratings</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Default Rating (4.5 stars)</h3>
                <Rating value={4.5} />
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">With Value Display</h3>
                <Rating value={4.2} showValue />
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">With Review Count</h3>
                <Rating value={3.8} showValue showCount reviewCount={125} />
              </div>
            </div>
          </div>

          {/* Size Variants */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-font-medium mb-4">Size Variants</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Small</h3>
                <Rating value={4} size="small" showValue showCount reviewCount={50} />
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Medium (Default)</h3>
                <Rating value={4} size="medium" showValue showCount reviewCount={50} />
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Large</h3>
                <Rating value={4} size="large" showValue showCount reviewCount={50} />
              </div>
            </div>
          </div>

          {/* Color Variants */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-font-medium mb-4">Color Variants</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Default (Yellow)</h3>
                <Rating value={4} variant="default" showValue />
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Gold</h3>
                <Rating value={4} variant="gold" showValue />
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Orange</h3>
                <Rating value={4} variant="orange" showValue />
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Blue</h3>
                <Rating value={4} variant="blue" showValue />
              </div>
            </div>
          </div>

          {/* Interactive Rating */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-font-medium mb-4">Interactive Rating</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Rate this property (Current: {interactiveRating})
                </h3>
                <Rating 
                  value={interactiveRating} 
                  onChange={(value) => setInteractiveRating(value || 0)}
                  showValue
                  disabled={false}
                />
              </div>
            </div>
          </div>

          {/* Real Estate Use Cases */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-font-medium mb-4">Real Estate Use Cases</h2>
            <div className="space-y-6">
              {/* Property Card Example */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-font-medium text-gray-900 mb-2">Căn hộ 2PN tại Quận 1</h3>
                <div className="flex items-center gap-4 mb-2">
                  <Rating value={4.5} size="small" showValue showCount reviewCount={24} />
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-600">24 đánh giá</span>
                </div>
                <p className="text-lg font-medium text-blue-600">5.2 tỷ VNĐ</p>
              </div>

              {/* Agent Rating */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-font-medium text-gray-900 mb-2">Môi giới: Nguyễn Văn A</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-24">Chuyên nghiệp:</span>
                    <Rating value={4.8} size="small" showValue />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-24">Tốc độ:</span>
                    <Rating value={4.5} size="small" showValue />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-24">Tổng thể:</span>
                    <Rating value={4.6} size="small" showValue showCount reviewCount={89} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingDemo;