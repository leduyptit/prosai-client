'use client';

import React, { useState } from 'react';
import { Input, Button } from 'antd';
import Select from '@/components/ui/forms/Select';

const DesktopDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchForm, setSearchForm] = useState({
    location: 'hn',
    keyword: '',
    propertyType: undefined,
    priceRange: undefined,
    area: undefined,
    bedrooms: undefined,
    legal: undefined
  });

  const handleSearch = () => {
    console.log('Search:', searchForm);
    // Navigate to search results
  };

  const handleInputChange = (field: string, value: string | undefined) => {
    setSearchForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    // You can add logic here to update search form based on selected tab
    console.log('Selected tab:', ['Bán bán', 'Cho thuê', 'Căn hộ', 'Căn nhà', 'Chung cư'][index]);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to image if video fails
            const target = e.target as HTMLVideoElement;
            target.style.display = 'none';
            const fallbackDiv = target.nextElementSibling as HTMLDivElement;
            if (fallbackDiv) {
              fallbackDiv.style.display = 'block';
            }
          }}
        >
          <source src="/videos/bg_video.mp4" type="video/mp4" />
          <source src="/videos/bg_video.webm" type="video/webm" />
        </video>
        
        {/* Fallback Background Image */}
        <div 
          className="hidden w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/imgdemo_new@2x.png)'
          }}
        />
        
        {/* Overlay */}
        <div className="absolute w-full h-full bg-black bg-opacity-50"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        <div className="responsive-container mx-auto grid grid-cols-12 py-40 space-x-5">
          {/* Left Content - Search Form */}
          <div className="col-span-8 flex justify-center">
            <div className="w-full max-w-2xl">
              {/* Search Form Container */}
              <div className="rounded-2xl shadow-lg p-8 mb-8 bg-[#DAE3EC] border-5 border-white">
                <h2 className="text-2xl font-medium mb-6 text-left">
                  Tìm kiếm BĐS
                </h2>
                {/* Property Type Tabs */}
                 <div className="flex mb-6 border-b-2 border-white space-x-2">
                   {['Bán bán', 'Cho thuê', 'Căn hộ', 'Căn nhà', 'Chung cư'].map((type, index) => (
                     <button
                       key={type}
                       onClick={() => handleTabChange(index)}
                       className={`flex-1 py-2 px-3 font-medium rounded-t-md transition-colors text-sm ${
                         index === activeTab 
                           ? 'bg-gray-800 text-white' 
                           : 'bg-[#FFFFFF80] text-[#8D8DA1] border-t-1 border-r-1 border-l-1 border-white hover:bg-[#FFFFFFA0]'
                       }`}
                     >
                       {type}
                     </button>
                   ))}
                 </div>

                {/* Location and Search Input */}
                <div className="flex gap-3 mb-4 bg-white border border-[#C3C3C3] rounded-lg pr-1 pl-4">
                  <div className="flex items-center">
                    <img src="/svgs/address.svg" alt="location" className="w-4 h-4 mr-2" />
                    <Select
                      placeholder="Chọn vi trí"
                      value={searchForm.location}
                      onChange={(value) => handleInputChange('location', value)}
                      className="border-none bg-white w-30"
                      options={[
                        { value: 'hn', label: 'Hà Nội' },
                        { value: 'hcm', label: 'TP. HCM' },
                        { value: 'dn', label: 'Đà Nẵng' },
                      ]}
                    />
                  </div>
                  
                  <div className="flex-1 flex items-center">
                    <img src="/svgs/icon_search.svg" className="w-5 h-5 mr-2" alt="search" />
                    <Input
                      placeholder="Nhập địa điểm, dự án, quận, huyện..."
                      value={searchForm.keyword}
                      onChange={(e) => handleInputChange('keyword', e.target.value)}
                      className="flex-1 rounded-r-none border-none bg-white focus:box-shadow-none"
                      size="small"
                      style={{
                        border: 'none'
                      }}
                    />
                    <Button
                      type="primary"
                      size="small"
                      onClick={handleSearch}
                      className="rounded-l-none border-none text-white font-medium"
                    >
                      Tìm kiếm
                    </Button>
                  </div>
                </div>

                {/* Filter Options */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <Select
                    placeholder="Loại hình"
                    value={searchForm.propertyType}
                    size="small"
                    onChange={(value) => handleInputChange('propertyType', value)}
                    className="w-full placeholder:text-[#8D8DA1] bg-white border-[#C3C3C3] rounded-lg"
                    options={[
                      { value: 'apartment', label: 'Chung cư' },
                      { value: 'house', label: 'Nhà riêng' },
                      { value: 'villa', label: 'Biệt thự' },
                    ]}
                  />
                  <Select
                    placeholder="Mức giá"
                    value={searchForm.priceRange}
                    size="small"
                    onChange={(value) => handleInputChange('priceRange', value)}
                    className="w-full placeholder:text-[#8D8DA1] bg-white border-[#C3C3C3] rounded-lg"
                    options={[
                      { value: 'under-3', label: 'Dưới 3 tỷ' },
                      { value: '3-5', label: '3-5 tỷ' },
                      { value: 'over-5', label: 'Trên 5 tỷ' },
                    ]}
                  />
                  <Select
                    placeholder="Diện tích"
                    value={searchForm.area}
                    size="small"
                    onChange={(value) => handleInputChange('area', value)}
                    className="w-full placeholder:text-[#8D8DA1] bg-white border-[#C3C3C3] rounded-lg"
                    options={[
                      { value: 'under-50', label: 'Dưới 50 m²' },
                      { value: '50-80', label: '50-80 m²' },
                      { value: 'over-80', label: 'Trên 80 m²' },
                    ]}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                <Button
                  size="large"
                  className="create-post-button text-white border-none px-8 py-3 font-medium"
                  icon={<img src="/svgs/icon_post.svg" className="w-8 h-8" alt="create-post" />}
                  style={{
                    background: 'transparent linear-gradient(270deg, #FFAA22 0%, #FC7400 100%) 0% 0% no-repeat padding-box',
                    color: '#FFFFFF',
                    height: '56px',
                    minWidth: '172px',
                  }}
                >
                  Đăng tin bán
                </Button>
                <Button
                  size="large"
                  className="ai-consult-button text-white border-none px-8 py-3 font-medium"
                  icon={<img src="/svgs/icon_ai.svg" className="w-8 h-8" alt="ai-consult" />}
                  style={{
                    background: 'transparent linear-gradient(270deg, #007AFF 0%, #0056B3 100%) 0% 0% no-repeat padding-box',
                    color: '#FFFFFF',
                    height: '56px',
                    minWidth: '172px',
                  }}
                >
                  Tư vấn AI
                </Button>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Statistics */}
          <div className="col-span-4">
            <div className="rounded-xl p-5 text-white relative">
                <div className="absolute top-0 left-0 w-full h-full bg-blue-600 rounded-xl px-10 py-6 text-white border-3 border-[#0080FF] z-0" style={{
                  background: 'transparent linear-gradient(180deg, #0080FF 0%, #0056B3 100%) 0% 0% no-repeat padding-box',
                  color: '#FFFFFF',
                  opacity: 0.9,
                }}></div>
              {/* Header */}
              <div className="text-center mb-6 border-b border-[#C3C3C3] pb-6 relative z-10">
                <h3 className="text-xl font-medium mb-2">
                  Thị trường nhà đất hôm nay 19/04/2024
                </h3>
                <div className="space-y-1 text-sm text-left">
                  <div className="flex items-center justify-start gap-2">
                    <img src="/svgs/Group 11556.svg" className="w-2 h-2"/>
                    <span>Nhà bán với giá trị thực tế: <span className="font-bold text-[#FFAA22]">19,000</span></span>
                  </div>
                  <div className="flex items-center justify-start gap-2">
                    <img src="/svgs/Group 11556.svg" className="w-2 h-2"/>
                    <span>Khoảng cách giao với giá thực tế: <span className="font-bold text-[#FFAA22]">5,000</span></span>
                  </div>
                  <div className="flex items-center justify-start gap-2">
                    <img src="/svgs/Group 11556.svg" className="w-2 h-2"/>
                    <span>Mức độ quan tâm: Tăng <span className="font-bold text-[#FFAA22]">18%</span> so với hôm qua</span>
                  </div>
                </div>
              </div>

              {/* Statistics Cards */}
              <div className="mb-2 relative z-10">
                {/* Card 1 */}
                <div className="text-center mb-0">
                  <h4 className="text-lg font-medium mb-2">Các con số ấn tượng</h4>
                  <div className="grid grid-cols-2">
                    <div className="text-center p-4 border-r border-b border-dashed border-[#C3C3C3]">
                      <div className="text-xl font-medium text-[#FFAA22] mb-2">1 triệu</div>
                      <div className="text-xs">Tin mua bán/ cho thuê nhà trọ</div>
                    </div>
                    <div className="text-center p-4 border-b border-dashed border-[#C3C3C3]">
                      <div className="text-xl font-medium text-[#FFAA22] mb-2">100,000</div>
                      <div className="text-xs">Khách hàng tiềm năng</div>
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="text-center">
                  <div className="grid grid-cols-2">
                    <div className="text-center p-4 border-r border-dashed border-[#C3C3C3]">
                      <div className="text-xl font-medium text-[#FFAA22] mb-2">100%</div>
                      <div className="text-xs">Ứng dụng AI tìm nhà phù hợp theo yêu cầu</div>
                    </div>
                    <div className="text-center p-4 border-dashed border-[#C3C3C3]">
                      <div className="text-xl font-medium text-[#FFAA22] mb-2">1 giây</div>
                      <div className="text-xs">Hiển thị kết quả phù hợp với bạn</div>
                    </div>
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

export default DesktopDashboard; 