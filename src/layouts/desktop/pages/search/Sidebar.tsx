'use client';

import React, { useState, useEffect } from 'react';
import { Card, Slider, Space } from 'antd';
import { PRICE_SLIDER_CONFIG, AREA_SLIDER_CONFIG } from '@/constants';
import Link from 'next/link';
import { searchService, type TopTopicItem } from '@/services';

const pillClass = 'inline-block px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700 border border-gray-200';

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
  const [priceRange, setPriceRange] = useState<[number, number]>(PRICE_SLIDER_CONFIG.DEFAULT_RANGE);
  const [areaRange, setAreaRange] = useState<[number, number]>(AREA_SLIDER_CONFIG.DEFAULT_RANGE);
  const [topTopics, setTopTopics] = useState<TopTopicItem[]>([]);

  // Parse price range from prop
  useEffect(() => {
    if (priceRangeProp && priceRangeProp !== 'all') {
      if (priceRangeProp.includes('-')) {
        const [from, to] = priceRangeProp.split('-');
        setPriceRange([parseInt(from) || 0, parseInt(to) || PRICE_SLIDER_CONFIG.MAX]);
      } else if (priceRangeProp.includes('+')) {
        const from = priceRangeProp.replace('+', '');
        setPriceRange([parseInt(from) || 0, PRICE_SLIDER_CONFIG.MAX]);
      }
    } else {
      setPriceRange(PRICE_SLIDER_CONFIG.DEFAULT_RANGE);
    }
  }, [priceRangeProp]);

  // Parse area range from prop
  useEffect(() => {
    if (areaRangeProp && areaRangeProp !== 'all') {
      if (areaRangeProp.includes('-')) {
        const [from, to] = areaRangeProp.split('-');
        setAreaRange([parseInt(from) || 0, parseInt(to) || AREA_SLIDER_CONFIG.MAX]);
      } else if (areaRangeProp.includes('+')) {
        const from = areaRangeProp.replace('+', '');
        setAreaRange([parseInt(from) || 0, AREA_SLIDER_CONFIG.MAX]);
      }
    } else {
      setAreaRange(AREA_SLIDER_CONFIG.DEFAULT_RANGE);
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
  const handlePriceChange = (values: [number, number]) => {
    setPriceRange(values);
    let result = 'all';
    
    if (values[0] === PRICE_SLIDER_CONFIG.MIN && values[1] === PRICE_SLIDER_CONFIG.MAX) {
      result = 'all';
    } else if (values[1] === PRICE_SLIDER_CONFIG.MAX) {
      result = `${values[0]}+`;
    } else {
      result = `${values[0]}-${values[1]}`;
    }
    
    onPriceChange?.(result);
  };

  // Handle area range change
  const handleAreaChange = (values: [number, number]) => {
    setAreaRange(values);
    let result = 'all';
    
    if (values[0] === AREA_SLIDER_CONFIG.MIN && values[1] === AREA_SLIDER_CONFIG.MAX) {
      result = 'all';
    } else if (values[1] === AREA_SLIDER_CONFIG.MAX) {
      result = `${values[0]}+`;
    } else {
      result = `${values[0]}-${values[1]}`;
    }
    
    onAreaChange?.(result);
  };

  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      {/* Price range */}
      <Card title="Lọc theo khoảng giá" variant="outlined" styles={{ body: { padding: 12 } }} className="shadow-sm border-gray-200">
        <div className="px-1">
          <Slider
            range
            min={PRICE_SLIDER_CONFIG.MIN}
            max={PRICE_SLIDER_CONFIG.MAX}
            step={PRICE_SLIDER_CONFIG.STEP}
            marks={PRICE_SLIDER_CONFIG.MARKS}
            tooltip={{
              formatter: (value) => `${value} triệu`
            }}
            value={priceRange}
            onChange={(values) => handlePriceChange(values as [number, number])}
          />
          <div className="mt-2 text-sm text-gray-600">
            Giá: <span className="font-medium text-gray-800">
              {priceRange[0] === PRICE_SLIDER_CONFIG.MIN && priceRange[1] === PRICE_SLIDER_CONFIG.MAX 
                ? 'Tất cả mức giá'
                : `${priceRange[0]} - ${priceRange[1]} triệu`
              }
            </span>
          </div>
        </div>
      </Card>

      {/* Area range */}
      <Card title="Lọc theo diện tích" variant="outlined" styles={{ body: { padding: 12 } }} className="shadow-sm border-gray-200">
        <div className="px-1">
          <Slider
            range
            min={AREA_SLIDER_CONFIG.MIN}
            max={AREA_SLIDER_CONFIG.MAX}
            step={AREA_SLIDER_CONFIG.STEP}
            marks={AREA_SLIDER_CONFIG.MARKS}
            tooltip={{
              formatter: (value) => `${value}m²`
            }}
            value={areaRange}
            onChange={(values) => handleAreaChange(values as [number, number])}
          />
          <div className="mt-2 text-sm text-gray-600">
            Diện tích: <span className="font-medium text-gray-800">
              {areaRange[0] === AREA_SLIDER_CONFIG.MIN && areaRange[1] === AREA_SLIDER_CONFIG.MAX 
                ? 'Tất cả diện tích'
                : `${areaRange[0]} - ${areaRange[1]}m²`
              }
            </span>
          </div>
        </div>
      </Card>

      {/* Featured topics */}
      <Card title="Chủ đề tìm kiếm nổi bật" variant="outlined" styles={{ body: { padding: 12 } }} className="shadow-sm border-gray-200">
        <div className="flex flex-wrap gap-2">
          {topTopics.map((topic) => (
            <span key={topic.slug} className={pillClass}>
              <Link href={topic.url}>{topic.topic}</Link>
            </span>
          ))}
        </div>
      </Card>
    </Space>
  );
};

export default Sidebar;
