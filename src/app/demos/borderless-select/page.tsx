'use client';

import React, { useState } from 'react';
import { Select as AntSelect } from 'antd';
import Select from '@/components/ui/forms/Select';

const BorderlessSelectDemo: React.FC = () => {
  const [value1, setValue1] = useState<string>();
  const [value2, setValue2] = useState<string>();

  const options = [
    { value: 'apartment', label: 'Chung cư' },
    { value: 'house', label: 'Nhà riêng' },
    { value: 'villa', label: 'Biệt thự' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Borderless Select Demo</h1>
        
        <div className="space-y-8">
          {/* Default Select (với border) */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-font-medium mb-4">Default Select (có border)</h3>
            <Select
              placeholder="Chọn loại hình"
              value={value1}
              onChange={setValue1}
              options={options}
              variant="default"
              className="w-full"
            />
          </div>

          {/* Borderless Select */}
          <div className="bg-blue-100 p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-font-medium mb-4">Borderless Select (không border)</h3>
            <Select
              placeholder="Chọn loại hình"
              value={value2}
              onChange={setValue2}
              options={options}
              variant="borderless"
              className="w-full"
            />
            <p className="text-sm text-gray-600 mt-2">
              ✨ Hoàn toàn không có border, background trong suốt
            </p>
          </div>

          {/* Ant Design Select so sánh */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-font-medium mb-4">Ant Design Select (mặc định)</h3>
            <AntSelect
              placeholder="Chọn loại hình"
              options={options}
              className="w-full"
            />
          </div>
        </div>

        {/* Usage */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-font-medium mb-4">Cách sử dụng</h3>
          <div className="bg-gray-100 p-4 rounded-md">
            <pre className="text-sm text-gray-800">
{`import Select from '@/components/ui/forms/Select';

// Borderless Select
<Select 
  variant="borderless" 
  placeholder="Chọn..."
  options={options}
/>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorderlessSelectDemo;
