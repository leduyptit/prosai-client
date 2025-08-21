'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const AboutSection: React.FC = () => {
  return (
    <div className="about-home">
      <div className="full-width bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        {/* Background with bokeh effect */}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'url(/images/about_BG@2x.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}></div>
        
        <div className="responsive-container relative z-10">
          <div className="grid grid-cols-12 gap-8 items-center py-30">
            {/* Left Content */}
            <div className="col-span-6">
              <div className="text-white space-y-6">
                {/* Logo and Tagline */}
                <div className="flex items-center gap-3 mb-20">
                  <Image src="/images/about_logo@2x.png" alt="about-logo" width={200} height={100} />
                </div>
                
                {/* Main Heading */}
                <h2 className="text-2xl font-medium text-white mb-4 border-l-5 border-white pl-4">
                  Về doanh nghiệp
                </h2>
                
                {/* Description */}
                <p className="text-xl leading-relaxed">
                  <span className="font-normal">Prosai - nền tảng AI giúp người Việt tìm nhà hiệu quả. </span>
                  <span className="font-normal">Hợp tác với chúng tôi ngay hôm nay!</span>
                </p>
                
                {/* CTA Button */}
                <div className="flex justify-end">
                  <Link
                    href="/about"
                    className="border-none flex items-center gap-2 text-white"
                    style={{
                      color: '#FFFFFF',
                    }}
                  >
                    Xem thêm <Image src="/svgs/viewmore.svg" alt="arrow-right" width={30} height={30} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
