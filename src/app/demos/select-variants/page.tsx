'use client';

import React, { useState } from 'react';
import Select from '@/components/ui/forms/Select';

const SelectVariantsDemo: React.FC = () => {
  const [value1, setValue1] = useState<string>();
  const [value2, setValue2] = useState<string>();
  const [value3, setValue3] = useState<string>();
  const [value4, setValue4] = useState<string>();

  const options = [
    { value: 'apartment', label: 'Chung cư' },
    { value: 'house', label: 'Nhà riêng' },
    { value: 'villa', label: 'Biệt thự' },
    { value: 'townhouse', label: 'Nhà phố' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Select Variants Demo</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Default Variant */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-font-medium mb-4">Default Variant</h3>
            <Select
              placeholder="Chọn loại hình"
              value={value1}
              onChange={setValue1}
              options={options}
              variant="default"
              className="w-full"
            />
          </div>

          {/* Outlined Variant */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-font-medium mb-4">Outlined Variant</h3>
            <Select
              placeholder="Chọn loại hình"
              value={value2}
              onChange={setValue2}
              options={options}
              variant="outlined"
              className="w-full"
            />
          </div>

          {/* Filled Variant */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-font-medium mb-4">Filled Variant</h3>
            <Select
              placeholder="Chọn loại hình"
              value={value3}
              onChange={setValue3}
              options={options}
              variant="filled"
              className="w-full"
            />
          </div>

          {/* Borderless Variant */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-font-medium mb-4">Borderless Variant</h3>
            <Select
              placeholder="Chọn loại hình"
              value={value4}
              onChange={setValue4}
              options={options}
              variant="borderless"
              className="w-full"
            />
            <p className="text-sm text-gray-600 mt-2">
              ✨ Không có border - phù hợp cho background có màu
            </p>
          </div>
        </div>

        {/* Usage Examples */}
        <div className="mt-12 bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-font-medium mb-4">Cách sử dụng</h3>
          <div className="bg-gray-100 p-4 rounded-md">
            <pre className="text-sm">
{`// Default (có border)
<Select variant="default" />

// Borderless (không border)
<Select variant="borderless" />

// Outlined (border đậm)  
<Select variant="outlined" />

// Filled (background fill)
<Select variant="filled" />`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectVariantsDemo;
