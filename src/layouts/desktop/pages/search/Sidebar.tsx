'use client';

import React, { useState, useEffect } from 'react';
import { Card, Space } from 'antd';
import Link from 'next/link';
import { searchService, type TopTopicItem } from '@/services';
import { AREA_RANGES } from '@/constants';

const pillClass = 'inline-block px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700 border border-gray-200';

// Predefined price ranges
const PRICE_RANGES = [
  { label: 'Dưới 500 triệu', value: '0-500' },
  { label: '500 - 800 triệu', value: '500-800' },
  { label: '800 triệu - 1 tỷ', value: '800-1000' },
  { label: '1 - 2 tỷ', value: '1000-2000' },
  { label: '2 - 3 tỷ', value: '2000-3000' },
  { label: '3 - 5 tỷ', value: '3000-5000' },
  { label: '5 - 7 tỷ', value: '5000-7000' },
  { label: '7 - 10 tỷ', value: '7000-10000' },
  { label: 'Trên 10 tỷ', value: '10000' }
];


interface SidebarProps {
  priceRange?: string;
  areaRange?: string;
  onPriceChange?: (value: string) => void;
  onAreaChange?: (value: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  priceRange: priceRangeProp, 
  areaRange: areaRangeProp,
  onPriceChange,
  onAreaChange 
}) => {
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [selectedAreaRange, setSelectedAreaRange] = useState<string>('all');
  const [topTopics, setTopTopics] = useState<TopTopicItem[]>([]);

  // Function to add action=reload to URL
  const addReloadAction = (url: string) => {
    const urlObj = new URL(url, window.location.origin);
    urlObj.searchParams.set('action', 'reload');
    return urlObj.toString();
  };

  // Parse price range from prop
  useEffect(() => {
    if (priceRangeProp && priceRangeProp !== 'all') {
      setSelectedPriceRange(priceRangeProp);
    } else {
      setSelectedPriceRange('all');
    }
  }, [priceRangeProp]);

  // Parse area range from prop
  useEffect(() => {
    if (areaRangeProp && areaRangeProp !== 'all') {
      setSelectedAreaRange(areaRangeProp);
    } else {
      setSelectedAreaRange('all');
    }
  }, [areaRangeProp]);

  // Load top topics from API to keep the same request flow as elsewhere
  useEffect(() => {
    const loadTopTopics = async () => {
      try {
        const topics = await searchService.getTopTopics();
        setTopTopics(topics);
      } catch (e) {
        setTopTopics([]);
      }
    };
    loadTopTopics();
  }, []);

  // Handle price range change
  const handlePriceRangeSelect = (value: string) => {
    setSelectedPriceRange(value);
    onPriceChange?.(value);
  };

  // Handle area range change
  const handleAreaRangeSelect = (value: string) => {
    setSelectedAreaRange(value);
    onAreaChange?.(value);
  };

  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      {/* Price range */}
      <Card title="Lọc theo khoảng giá" variant="outlined" styles={{ body: { padding: 20 } }} className="shadow-sm border-gray-200">
        <div className="space-y-1">
          <div className="flex flex-col space-y-1">
            <button
              className={`text-left py-2 px-0 text-sm transition-colors ${
                selectedPriceRange === 'all' 
                  ? 'text-blue-600 font-medium' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
              onClick={() => handlePriceRangeSelect('all')}
            >
              Tất cả mức giá
            </button>
            {PRICE_RANGES.map((range) => (
              <button
                key={range.value}
                className={`text-left py-2 px-0 text-sm transition-colors ${
                  selectedPriceRange === range.value 
                    ? 'text-blue-600 font-medium' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
                onClick={() => handlePriceRangeSelect(range.value)}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Area range */}
      <Card title="Lọc theo diện tích" variant="outlined" styles={{ body: { padding: 20 } }} className="shadow-sm border-gray-200">
        <div className="space-y-1">
          <div className="flex flex-col space-y-1">
            <button
              className={`text-left py-2 px-0 text-sm transition-colors ${
                selectedAreaRange === 'all' 
                  ? 'text-blue-600 font-medium' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
              onClick={() => handleAreaRangeSelect('all')}
            >
              Tất cả diện tích
            </button>
            {AREA_RANGES.map((range) => (
              <button
                key={range.value}
                className={`text-left py-2 px-0 text-sm transition-colors ${
                  selectedAreaRange === range.value 
                    ? 'text-blue-600 font-medium' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
                onClick={() => handleAreaRangeSelect(range.value)}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Featured topics */}
      <Card title="Chủ đề tìm kiếm nổi bật" variant="outlined" styles={{ body: { padding: 20 } }} className="shadow-sm border-gray-200">
        <div className="flex flex-wrap gap-2">
          {topTopics.map((topic) => (
            <span key={topic.slug} className={pillClass}>
              <Link href={addReloadAction(topic.url)}>{topic.topic}</Link>
            </span>
          ))}
        </div>
      </Card>
    </Space>
  );
};

export default Sidebar;
