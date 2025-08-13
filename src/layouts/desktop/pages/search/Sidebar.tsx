'use client';

import React, { useMemo, useState } from 'react';
import { Card, Slider, Space } from 'antd';

const pillClass = 'inline-block px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700 border border-gray-200';

const Sidebar: React.FC = () => {
  const [price, setPrice] = useState<number>(3); // in tỷ
  const [area, setArea] = useState<number>(100); // in m2

  const priceMarks = useMemo(
    () => ({
      1: '1tỷ',
      2: '2tỷ',
      3: '3tỷ',
      5: '5tỷ',
      10: '10tỷ',
    }),
    []
  );

  const areaMarks = useMemo(
    () => ({
      50: '50m²',
      80: '80m²',
      100: '100m²',
      150: '150m²',
    }),
    []
  );

  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      {/* Price range */}
      <Card title="Lọc theo khoảng giá" variant="outlined" styles={{ body: { padding: 12 } }} className="shadow-sm border-gray-200">
        <div className="px-1">
          <Slider
            min={1}
            max={10}
            step={null}
            marks={priceMarks}
            tooltip={{ open: false }}
            value={price}
            onChange={(v) => setPrice(Array.isArray(v) ? v[0] : (v as number))}
          />
          <div className="mt-2 text-sm text-gray-600">Giá: <span className="font-medium text-gray-800">Dưới {price} tỷ</span></div>
        </div>
      </Card>

      {/* Area range */}
      <Card title="Lọc theo diện tích" variant="outlined" styles={{ body: { padding: 12 } }} className="shadow-sm border-gray-200">
        <div className="px-1">
          <Slider
            min={50}
            max={150}
            step={null}
            marks={areaMarks}
            tooltip={{ open: false }}
            value={area}
            onChange={(v) => setArea(Array.isArray(v) ? v[0] : (v as number))}
          />
          <div className="mt-2 text-sm text-gray-600">Diện tích: <span className="font-medium text-gray-800">Dưới {area}m²</span></div>
        </div>
      </Card>

      {/* Featured topics */}
      <Card title="Chủ đề tìm kiếm nổi bật" variant="outlined" styles={{ body: { padding: 12 } }} className="shadow-sm border-gray-200">
        <div className="flex flex-wrap gap-2">
          <span className={pillClass}>Bất động sản dưới 2 tỷ</span>
          <span className={pillClass}>Gần trung tâm</span>
          <span className={pillClass}>Chung cư tiện nghi</span>
          <span className={pillClass}>Có chỗ để xe</span>
          <span className={pillClass}>Tiện ích đi kèm</span>
        </div>
      </Card>
    </Space>
  );
};

export default Sidebar;
