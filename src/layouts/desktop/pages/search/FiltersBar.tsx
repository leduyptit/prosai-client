'use client';

import React from 'react';
import { Input, Button } from 'antd';
import Select from '@/components/ui/forms/Select';
import { HeartOutlined } from '@ant-design/icons';

interface FiltersBarProps {
  onSearch?: () => void;
}

const iconClass = 'inline-block align-middle';

const LocationIcon = () => (
  <svg className={iconClass} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const MapIcon = () => (
  <svg className={iconClass} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="1 6 8 3 16 6 23 3 23 18 16 21 8 18 1 21 1 6" />
    <line x1="8" y1="3" x2="8" y2="18" />
    <line x1="16" y1="6" x2="16" y2="21" />
  </svg>
);

const FiltersBar: React.FC<FiltersBarProps> = ({ onSearch }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
      {/* Row 1 */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 flex-1 border border-gray-200 rounded-lg h-10 text-gray-700 min-w-[160px]">
          {/* Location */}
          <div className="flex items-center gap-2 rounded-lg px-3 h-10 text-gray-700 min-w-[160px]">
            <img src="/svgs/address.svg" alt="location" className="h-4 w-4" />
            <Select
              size="small"
              className="w-[120px]"
              variant="borderless"
              defaultValue="hn"
              options={[
                { value: 'hn', label: 'Hà Nội' },
                { value: 'hcm', label: 'TP. HCM' },
                { value: 'dn', label: 'Đà Nẵng' },
              ]}
              popupMatchSelectWidth={160}
            />
        </div>
        
        {/* Keyword + Search */}
        <div className="flex items-stretch flex-1 min-w-[320px]">
          <Input
            allowClear
            placeholder="Nhập địa điểm, dự án, quận, huyện..."
            variant="borderless"
          />
          <Button
            type="primary"
            className="rounded-l-none bg-blue-600 hover:bg-blue-700 text-white m-1"
            size="small"
            onClick={onSearch}
          >
            <span className="font-medium">Tìm kiếm</span>
          </Button>
        </div>
        </div>

        {/* Save filter */}
        <Button className="h-10 px-4 border-gray-300 flex items-center gap-2" size="middle">
          <HeartOutlined />
          <span className="font-medium">Lưu bộ lọc</span>
        </Button>

        {/* View map */}
        <Button className="h-10 px-4 bg-orange-500 hover:bg-orange-600 text-white border-none flex items-center gap-2 map-button" size="middle">
          <img src="/svgs/icon_map.svg" alt="map" className="h-4 w-4" />
          <span className="font-medium" >Xem bản đồ</span>
        </Button>
      </div>

      {/* Row 2 */}
      <div className="mt-3 grid grid-cols-2 md:grid-cols-6 gap-3">
        <Select size="small" placeholder="Loại hình" className="w-full" variant="outlined" options={[
          { value: 'all', label: 'Loại hình' },
        ]} />
        <Select size="small" placeholder="Nhà riêng" className="w-full" variant="outlined" options={[
          { value: 'house', label: 'Nhà riêng' },
          { value: 'apartment', label: 'Chung cư' },
          { value: 'street', label: 'Nhà mặt tiền' },
        ]} />
        <Select size="small" placeholder="Dưới 3 tỷ" className="w-full" variant="outlined" options={[
          { value: '3ty', label: 'Dưới 3 tỷ' },
          { value: '5ty', label: 'Dưới 5 tỷ' },
          { value: '10ty', label: 'Dưới 10 tỷ' },
        ]} />
        <Select size="small" placeholder="Dưới 50 m2" className="w-full" variant="outlined" options={[
          { value: '50', label: 'Dưới 50 m2' },
          { value: '80', label: 'Dưới 80 m2' },
          { value: '100', label: 'Dưới 100 m2' },
        ]} />
        <Select size="small" placeholder="Số phòng ngủ" className="w-full" variant="outlined" options={[
          { value: 1, label: '1 phòng ngủ' },
          { value: 2, label: '2 phòng ngủ' },
          { value: 3, label: '3 phòng ngủ' },
        ]} />
        <Select size="small" placeholder="Pháp lý" className="w-full" options={[
          { value: 'sổ đỏ', label: 'Sổ đỏ' },
          { value: 'hđmb', label: 'HĐMB' },
          { value: 'khác', label: 'Khác' },
        ]} />
      </div>
    </div>
  );
};

export default FiltersBar;
