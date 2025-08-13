'use client';

import React, { useState } from 'react';
import { Image, Modal } from 'antd';
import { LeftOutlined, RightOutlined, EyeOutlined } from '@ant-design/icons';

interface ImageGalleryProps {
  images: string[];
  title?: string;
  className?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images = [],
  title = '',
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  if (!images || images.length === 0) {
    return (
      <div className={`bg-gray-200 rounded-lg flex items-center justify-center h-96 ${className}`}>
        <span className="text-gray-500">Không có hình ảnh</span>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Main Image */}
      <div className="relative bg-black rounded-lg overflow-hidden mb-4">
        <div className="aspect-[16/10] relative">
          <Image
            src={images[currentIndex]}
            alt={`${title} - Image ${currentIndex + 1}`}
            className="w-full h-full object-cover"
            preview={false}
          />
          
          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
              >
                <LeftOutlined className="text-lg" />
              </button>
              
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
              >
                <RightOutlined className="text-lg" />
              </button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>

          {/* View Gallery Button */}
          <button
            onClick={() => setModalVisible(true)}
            className="absolute bottom-4 left-4 bg-black bg-opacity-70 hover:bg-opacity-90 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2 transition-all duration-200"
          >
            <EyeOutlined />
            Xem tất cả ảnh
          </button>
        </div>
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`flex-shrink-0 w-16 h-12 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                index === currentIndex ? 'border-blue-500' : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                preview={false}
              />
            </button>
          ))}
        </div>
      )}

      {/* Modal Gallery */}
      <Modal
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width="90vw"
        style={{ top: 20 }}
        className="image-gallery-modal"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[80vh] overflow-y-auto">
          {images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`${title} - Image ${index + 1}`}
              className="w-full h-64 object-cover rounded-lg"
            />
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default ImageGallery;