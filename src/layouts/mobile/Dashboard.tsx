'use client';

import React, { useState } from 'react';
import { Select, Input, Button, Card } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const MobileDashboard: React.FC = () => {
  const [searchForm, setSearchForm] = useState({
    location: 'hn',
    keyword: '',
    propertyType: undefined,
    priceRange: undefined,
  });

  const handleSearch = () => {
    console.log('Search:', searchForm);
    // Navigate to search results
  };

  const handleInputChange = (field: string, value: string) => {
    setSearchForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative h-64 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/images/imgdemo_new@2x.png)'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            <h1 className="text-2xl font-bold mb-2">Tìm kiếm BĐS</h1>
            <p className="text-sm opacity-90">Nền tảng bất động sản hàng đầu</p>
          </div>
        </div>
      </div>

      {/* Search Form */}
      <div className="px-4 -mt-8 relative z-20">
        <Card className="rounded-lg shadow-lg">
          <div className="space-y-3">
            {/* Location & Keyword */}
            <div className="flex gap-2">
              <Select
                value={searchForm.location}
                onChange={(value) => handleInputChange('location', value)}
                className="w-24"
                options={[
                  { value: 'hn', label: 'Hà Nội' },
                  { value: 'hcm', label: 'TP. HCM' },
                  { value: 'dn', label: 'Đà Nẵng' },
                ]}
              />
              <Input
                placeholder="Nhập địa điểm..."
                value={searchForm.keyword}
                onChange={(e) => handleInputChange('keyword', e.target.value)}
                className="flex-1"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-2 gap-2">
              <Select
                placeholder="Loại hình"
                value={searchForm.propertyType}
                onChange={(value) => handleInputChange('propertyType', value || '')}
                className="w-full"
                options={[
                  { value: 'apartment', label: 'Chung cư' },
                  { value: 'house', label: 'Nhà riêng' },
                  { value: 'villa', label: 'Biệt thự' },
                ]}
              />
              <Select
                placeholder="Mức giá"
                value={searchForm.priceRange}
                onChange={(value) => handleInputChange('priceRange', value || '')}
                className="w-full"
                options={[
                  { value: 'under-3', label: 'Dưới 3 tỷ' },
                  { value: '3-5', label: '3-5 tỷ' },
                  { value: 'over-5', label: 'Trên 5 tỷ' },
                ]}
              />
            </div>

            {/* Search Button */}
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={handleSearch}
              className="w-full bg-blue-600 hover:bg-blue-700"
              size="large"
            >
              Tìm kiếm
            </Button>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mt-6">
        <div className="grid grid-cols-2 gap-4">
          <Button
            size="large"
            className="bg-orange-500 hover:bg-orange-600 text-white border-none h-12"
          >
            <img src="/svgs/icon_post.svg" alt="post" className="w-5 h-5 mr-2" />
            Đăng tin bán
          </Button>
          <Button
            size="large"
            className="bg-blue-600 hover:bg-blue-700 text-white border-none h-12"
          >
            <img src="/svgs/icon_ai.svg" alt="ai" className="w-5 h-5 mr-2" />
            Tư vấn AI
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 mt-6">
        <Card className="bg-blue-600 text-white">
          <div className="text-center">
            <h3 className="text-lg font-medium mb-4">
              Thị trường nhà đất hôm nay
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-2xl font-bold text-yellow-300">1 triệu</div>
                <div>Tin rao bán</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-300">100K</div>
                <div>Khách hàng</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MobileDashboard;