'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProjectList } from '@/components/features/projects';
import { PROJECT_SORT, PROJECT_SORT_OPTIONS } from '@/constants';
import { Input } from 'antd';
import { Select } from '@/components/ui/forms';
import { SearchOutlined } from '@ant-design/icons';

export default function ProjectsPage() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    city: searchParams.get('city') || '',
    sort_type: searchParams.get('sort_type') || PROJECT_SORT.LATEST
  });

  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white">
        <div className="responsive-container mx-auto py-6">
          <h1 className="text-3xl font-medium text-[#1D1D44] mb-2">Dự án bất động sản</h1>
          <p className="text-gray-600 mt-2">Khám phá các dự án bất động sản mới nhất và uy tín nhất</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white">
        <div className="responsive-container mx-auto py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center lg:items-center rounded-lg border border-gray-200 p-4">
            {/* Search Input */}
            <div className="flex-1 max-w-md">
              <Input
                placeholder="Tìm kiếm dự án..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                prefix={<SearchOutlined className="text-gray-400" />}
                className="w-full"
              />
            </div>
            {/* Desktop Filters */}
            <div className="hidden lg:flex gap-4 items-center">
              <Select
                placeholder="Sắp xếp"
                value={filters.sort_type}
                onChange={(value) => handleFilterChange('sort_type', value)}
                className="w-40"
              >
                {PROJECT_SORT_OPTIONS.map((option: { value: string; label: string }) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>

            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="space-y-4">


                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sắp xếp
                  </label>
                  <Select
                    placeholder="Chọn cách sắp xếp"
                    value={filters.sort_type}
                    onChange={(value) => handleFilterChange('sort_type', value)}
                    className="w-full"
                  >
                    {PROJECT_SORT_OPTIONS.map((option: { value: string; label: string }) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Projects List */}
      <div className="responsive-container mx-auto py-8">
        <ProjectList
          initialParams={filters}
          itemsPerPage={12}
        />
      </div>
    </div>
  );
}
