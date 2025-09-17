'use client';

import React from 'react';
import { Layout, Row, Col, Typography, Space, Divider } from 'antd';
// Removed unused imports

const { Footer: AntFooter } = Layout;
const { Text, Link } = Typography;

const DesktopFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <AntFooter className="prosai-footer bg-[#F7F7F7] border-t border-[#E0E0E0] px-8 py-12">
      <div className="max-w-7xl mx-auto pt-1">
        <Row gutter={[32, 24]}>
          {/* Company Info */}
          <Col xs={24} sm={12} md={12}>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 pb-5">
                <img src="/svgs/footer_logo.svg" alt="logo" className="w-40" />
              </div>
              <Text className="text-gray-600 text-sm leading-relaxed font-lexend font-bold">
                Nền tảng tìm kiếm bất động sản ứng dụng AI đầu tiên cho người Việt
              </Text>
              
              {/* Contact Information */}
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <Text className="text-gray-600 text-sm">
                    Địa chỉ: Tòa nhà Việt Á, Số 9 Duy Tân, Cầu Giấy, Hà Nội.
                  </Text>
                </div>
                <div className="flex items-center space-x-2">
                  <Text className="text-gray-600 text-sm">
                    Email: <a href="mailto:support@prosai.vn">support@prosai.vn</a>
                  </Text> 
                  <span className="text-gray-600 text-sm">|</span>
                  <Text className="text-gray-600 text-sm">
                    Hotline: <a href="tel:1900888888">1900 888 888</a>
                  </Text>
                </div>
              </div>

              <Divider className="my-4" />

              {/* Social Media */}
              <div>
                <h4 className="text-sm font-font-medium text-gray-900 mb-3">Kết nối với chúng tôi</h4>
                <Space size="middle">
                  <div className="w-8 h-8 flex-center">
                    <Link href="#" target="_blank"><img src="/svgs/social_fb.svg" alt="facebook" className="w-10" /></Link>
                  </div>
                  <div className="w-8 h-8 flex-center">
                    <Link href="#" target="_blank"><img src="/svgs/social_zalo.svg" alt="zalo" className="w-10" /></Link>
                  </div>
                  <div className="w-8 h-8 flex-center">
                    <Link href="#" target="_blank"><img src="/svgs/social_tiktok.svg" alt="tiktok" className="w-10" /></Link>
                  </div>
                </Space>
              </div>
            </div>
          </Col>

          {/* First Column Links */}
          <Col xs={24} sm={12} md={6}>
            <div className="space-y-4 pt-19">
              <ul className="space-y-2">
                <li className="mb-5">
                  <Link href="#" className="text-gray-700 hover:text-blue-600 text-sm flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#1565C0] rounded-full"></div>
                    <span>Giới thiệu</span>
                  </Link>
                </li>
                <li className="mb-5">
                  <Link href="#" className="text-gray-700 hover:text-blue-600 text-sm flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#1565C0] rounded-full"></div>
                    <span>Chính sách</span>
                  </Link>
                </li>
                <li className="mb-5">
                  <Link href="#" className="text-gray-700 hover:text-blue-600 text-sm flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#1565C0] rounded-full"></div>
                    <span>Quy chế</span>
                  </Link>
                </li>
                <li className="mb-5">
                  <Link href="#" className="text-gray-700 hover:text-blue-600 text-sm flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#1565C0] rounded-full"></div>
                    <span>Giải quyết tranh chấp</span>
                  </Link>
                </li>
                <li className="mb-5">
                  <Link href="#" className="text-gray-700 hover:text-blue-600 text-sm flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#1565C0] rounded-full"></div>
                    <span>Thỏa thuận người dùng</span>
                  </Link>
                </li>
              </ul>
            </div>
          </Col>

          {/* Second Column Links */}
          <Col xs={24} sm={12} md={6}>
            <div className="space-y-4 pt-19">
              <ul className="space-y-2">
                <li className="mb-5">
                  <Link href="#" className="text-gray-700 hover:text-blue-600 text-sm flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#1565C0] rounded-full"></div>
                    <span>Bảo mật</span>
                  </Link>
                </li>
                <li className="mb-5">
                  <Link href="#" className="text-gray-700 hover:text-blue-600 text-sm flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#1565C0] rounded-full"></div>
                    <span>FAQ</span>
                  </Link>
                </li>
                <li className="mb-5">
                  <Link href="#" className="text-gray-700 hover:text-blue-600 text-sm flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#1565C0] rounded-full"></div>
                    <span>Blog</span>
                  </Link>
                </li>
                <li className="mb-5">
                  <Link href="#" className="text-gray-700 hover:text-blue-600 text-sm flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#1565C0] rounded-full"></div>
                    <span>Hỏi & Đáp</span>
                  </Link>
                </li>
                <li className="mb-5">
                  <Link href="#" className="text-gray-700 hover:text-blue-600 text-sm flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#1565C0] rounded-full"></div>
                    <span>Sitemap</span>
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
        </Row>

        {/* Bottom Section */}
        <div className="text-center mt-20">
          <Text className="text-[#8D8DA1] text-sm">
            Prosai.vn © {currentYear} - Kết nối bất động sản bằng AI cho người Việt
          </Text>
        </div>
      </div>
    </AntFooter>
  );
};

export default DesktopFooter; 