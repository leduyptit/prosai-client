'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button, Input, Radio, Slider } from 'antd';
import { PRICE_RANGES } from '@/constants';

interface PriceRangeSelectProps {
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  size?: 'small' | 'middle' | 'large';
}

const PriceRangeSelect: React.FC<PriceRangeSelectProps> = ({
  placeholder = 'Mức giá',
  value,
  onChange,
  className = '',
  size = 'small'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customFrom, setCustomFrom] = useState('');
  const [customTo, setCustomTo] = useState('');
  const [selectedRange, setSelectedRange] = useState('all');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Parse value when component mounts or value changes
  useEffect(() => {
    if (value && value !== 'all') {
      if (value.includes('-')) {
        const [from, to] = value.split('-');
        setCustomFrom(from);
        setCustomTo(to);
        setSelectedRange('custom');
      } else if (value.includes('+')) {
        const from = value.replace('+', '');
        setCustomFrom(from);
        setCustomTo('');
        setSelectedRange('custom');
      } else {
        setSelectedRange(value);
      }
    } else {
      setSelectedRange('all');
      setCustomFrom('');
      setCustomTo('');
    }
  }, [value]);

  // Helper function to format price range display
  const formatPriceRangeDisplay = (priceRange?: string) => {
    if (!priceRange || priceRange === 'all') {
      return placeholder;
    }
    
    const range = PRICE_RANGES.find(r => r.value === priceRange);
    if (range) {
      return range.label;
    }
    
    // Handle custom ranges
    if (priceRange.includes('-')) {
      const [from, to] = priceRange.split('-');
      return `${from} - ${to} triệu`;
    } else if (priceRange.includes('+')) {
      const from = priceRange.replace('+', '');
      return `Trên ${from} triệu`;
    }
    
    return placeholder;
  };

  const handleRangeSelect = (rangeValue: string) => {
    setSelectedRange(rangeValue);
    
    if (rangeValue === 'all') {
      setCustomFrom('');
      setCustomTo('');
    } else if (rangeValue !== 'custom') {
      const range = PRICE_RANGES.find(r => r.value === rangeValue);
      if (range) {
        if (range.value.includes('-')) {
          const [from, to] = range.value.split('-');
          setCustomFrom(from);
          setCustomTo(to);
        } else if (range.value.includes('+')) {
          const from = range.value.replace('+', '');
          setCustomFrom(from);
          setCustomTo('');
        }
      }
    }
  };

  const handleApply = () => {
    let result = 'all';
    
    if (selectedRange === 'custom') {
      if (customFrom && customTo) {
        result = `${customFrom}-${customTo}`;
      } else if (customFrom && !customTo) {
        result = `${customFrom}+`;
      } else if (!customFrom && customTo) {
        result = `0-${customTo}`;
      }
    } else if (selectedRange !== 'all') {
      result = selectedRange;
    }
    
    onChange(result);
    setIsOpen(false);
  };

  const handleReset = () => {
    setSelectedRange('all');
    setCustomFrom('');
    setCustomTo('');
    onChange('all');
    setIsOpen(false);
  };

  const getButtonHeight = () => {
    switch (size) {
      case 'small': return '32px';
      case 'middle': return '40px';
      case 'large': return '48px';
      default: return '32px';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Button */}
      <Button
        size={size}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between bg-white border-[#C3C3C3] rounded-lg hover:border-blue-500 hover:shadow-sm focus:border-blue-500 focus:shadow-sm focus:outline-none transition-all duration-200 ${
          value && value !== 'all' ? 'text-black' : 'text-[#8D8DA1]'
        } ${className}`}
        style={{
          height: getButtonHeight(),
          textAlign: 'left'
        }}
      >
        <span className="flex-1 text-left">{formatPriceRangeDisplay(value)}</span>
        <img 
          src="/svgs/Group 11548.svg" 
          className="w-2.5 h-2.5" 
          alt="down"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease'
          }}
        />
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#C3C3C3] rounded-lg shadow-lg z-50 w-80">
          <div>
            {/* Header */}
            <div className="flex justify-between items-center border-b border-[#F2F2F2] p-4">
              <h3 className="text-lg font-medium">Mức giá</h3>
              <Button
                type="text"
                size="small"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </Button>
            </div>

            {/* Custom Price Input Fields */}
            <div className="p-4">
              <div className="flex items-center gap-4 mb-3">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">
                    Từ:
                  </label>
                  <Input
                    placeholder="800"
                    value={customFrom}
                    onChange={(e) => {
                      setCustomFrom(e.target.value);
                      setSelectedRange('custom');
                    }}
                    suffix="triệu"
                    size="small"
                    className="w-full"
                  />
                </div>
                <div className="flex items-center justify-center mt-6">
                  <div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-4 border-b-gray-400"></div>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">
                    Đến:
                  </label>
                  <Input
                    placeholder="1000"
                    value={customTo}
                    onChange={(e) => {
                      setCustomTo(e.target.value);
                      setSelectedRange('custom');
                    }}
                    suffix="triệu"
                    size="small"
                    className="w-full"
                  />
                </div>
              </div>
              
              {/* Price Slider */}
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">
                  Khoảng giá (triệu):
                </label>
                <Slider
                  range
                  min={0}
                  max={10000}
                  step={50}
                  value={[parseInt(customFrom) || 0, parseInt(customTo) || 1000]}
                  onChange={(values) => {
                    setCustomFrom(values[0].toString());
                    setCustomTo(values[1].toString());
                    setSelectedRange('custom');
                  }}
                  tooltip={{
                    formatter: (value) => `${value} triệu`
                  }}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs">
                  <span>0 triệu</span>
                  <span>10 tỷ</span>
                </div>
              </div>
            </div>

            {/* Predefined Ranges */}
            <div className="mb-4 max-h-48 border-b border-[#F2F2F2] px-4 pb-4">
              <Radio.Group
                value={selectedRange}
                onChange={(e) => handleRangeSelect(e.target.value)}
                className="w-full"
              >
                <div className="space-y-2">
                  <Radio value="all" className="w-full">
                    Tất cả mức giá
                  </Radio>
                  {PRICE_RANGES.map((range) => (
                    <Radio key={range.value} value={range.value} className="w-full">
                      {range.label}
                    </Radio>
                  ))}
                </div>
              </Radio.Group>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 px-4 pb-4">
              <Button
                onClick={handleReset}
                className="flex-1"
              >
                Đặt lại
              </Button>
              <Button
                onClick={handleApply}
                className="flex-1"
                type="primary"
              >
                Áp dụng
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceRangeSelect;
