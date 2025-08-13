'use client';

import React from 'react';
import FiltersBar from './FiltersBar';
import ResultsList from './ResultsList';
import Sidebar from './Sidebar';
import { mockItems } from './mockData';

const SearchLayout: React.FC = () => {
  return (
    <div className="search-layout">
      <div className="full-width bg-[#FAFAFA] py-8 mb-5">
        <div className="responsive-container">
          {/* Filters section (top) */}
          <FiltersBar />
        </div>
      </div>
      <div className="responsive-container mx-auto">
        {/* Top heading row */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-9">
            <div className="flex items-end justify-between mb-4">
              <h2 className="text-2xl font-medium text-gray-900">Kết quả tìm kiếm</h2>
              <div className="text-sm text-gray-600">Hiện có {mockItems.length} Bất động sản.</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-9">
            <ResultsList items={mockItems} />
          </div>
          <div className="col-span-12 lg:col-span-3">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchLayout;
