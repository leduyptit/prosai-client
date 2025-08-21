'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/buttons';
import { Breadcrumb } from '@/components/ui/navigation';
import { APP_CONFIG } from '@/utils/env';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div 
        className="relative h-[225px] overflow-hidden"
        style={{
          background: 'url(/images/header_BG@2x.png) no-repeat center center',
          backgroundSize: 'cover',
        }}
      >
        {/* Breadcrumb */}
        <div className="bg-gray-50 p-3">
          <div className="responsive-container mx-auto px-4">
            <Breadcrumb
              separator=">"
              className="text-sm"
              items={[
                {
                  title: <Link href={APP_CONFIG.homeUrl} className="text-gray-600 hover:text-blue-600">Trang chủ</Link>,
                },
                {
                  title: <span className="text-gray-900">Giới thiệu</span>,
                },
              ]}
            />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-font-medium text-white mb-4">
              Về chúng tôi
            </h1>
            <div className="w-16 h-1 bg-white mx-auto mt-2"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="responsive-container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12 items-center relative">
          {/* Left Content */}
          <div className="space-y-6 z-10 px-15 py-20 w-2/3">
            <div className="space-y-4 text-gray-700 leading-relaxed italic">
              <p className="text-base">
                <strong>Prosai là nền tảng công nghệ bất động sản thông minh dành riêng cho thị trường Việt Nam với mục tiêu tạo (AI) đầu tiên đánh giá chính xác cho người Việt.</strong>
              </p>
              
              <p className="text-base">
                Chúng tôi giúp bạn dễ dàng tìm đúng căn nhà phù hợp – dù là phòng trọ, chung cư hay nhà đất – chỉ trong vài cú nhấp chuột. Với dữ liệu từ không gian mạng và các thuật toán gợi ý thông minh, Prosai mang đến trải nghiệm tìm kiếm chính xác, nhanh chóng, và tiết kiệm thời gian. Không cần trung gian, không lo bị làm giả.
              </p>
              
              <p className="text-base">
                <strong>Không chỉ trung gian, không lo bị làm giả</strong> – thông tin hỗ trợ hoàn toàn minh bạch và mình bạch với người dùng.
              </p>
            </div>
          </div>
          <div className="w-full h-full absolute top-0 right-0"
          style={{
            background: 'url(/images/Girl+BG@2x.png) no-repeat center center',
            backgroundSize: 'cover',
          }}>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="pt-6 flex justify-center">
          <Link href="/">
              <Button 
                  size="large"
                  className="custom-button"
                  style={{
                      color: '#fff',
                  }}
              >
                VỀ TRANG CHỦ
              </Button>
          </Link>
      </div>
    </div>
  );
};

export default AboutPage;
