'use client';

import React from 'react';
import { Layout } from 'antd';
import Link from 'next/link';

const { Footer: AntFooter } = Layout;

const MobileFooter: React.FC = () => {
  return (
    <AntFooter className="bg-gray-800 text-white text-center py-6 mb-16">
      <div className="container mx-auto px-4">
        {/* Logo */}
        <div className="mb-4">
          <img src="/svgs/footer_logo.svg" alt="logo" className="h-8 mx-auto mb-2" />
          <p className="text-sm text-gray-400">
            Nền tảng bất động sản hàng đầu Việt Nam
          </p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <Link href="/about" className="text-gray-400 hover:text-white block py-1">
              Giới thiệu
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-white block py-1">
              Liên hệ
            </Link>
          </div>
          <div>
            <Link href="/terms" className="text-gray-400 hover:text-white block py-1">
              Điều khoản
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-white block py-1">
              Bảo mật
            </Link>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-4 mb-4">
          <Link href="#" className="text-gray-400 hover:text-white">
            <img src="/svgs/social_fb.svg" alt="facebook" className="w-6 h-6" />
          </Link>
          <Link href="#" className="text-gray-400 hover:text-white">
            <img src="/svgs/social_zalo.svg" alt="zalo" className="w-6 h-6" />
          </Link>
          <Link href="#" className="text-gray-400 hover:text-white">
            <img src="/svgs/social_tiktok.svg" alt="tiktok" className="w-6 h-6" />
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-xs text-gray-500 border-t border-gray-700 pt-4">
          © 2024 ProSai Client. All rights reserved.
        </div>
      </div>
    </AntFooter>
  );
};

export default MobileFooter;