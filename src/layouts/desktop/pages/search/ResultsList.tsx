'use client';

import React, { useState } from 'react';
import ResultItem, { SearchItem } from './ResultItem';
import { Pagination } from 'antd';

interface ResultsListProps {
  items: SearchItem[];
  pageSize?: number;
  pagination?: {
    current: number;
    total: number;
    pageCount: number;
    count: number;
  };
  onPageChange?: (page: number) => void;
}

const ResultsList: React.FC<ResultsListProps> = ({ 
  items, 
  pageSize = 20, 
  pagination,
  onPageChange 
}) => {

  return (
    <div>
      <div>
        {items.map((item) => (
          <ResultItem key={item.id} item={item} />
        ))}
      </div>
      {pagination && (
        <div className="flex justify-center mt-4">
          <Pagination
            current={pagination.current}
            total={pagination.total}
            pageSize={pageSize}
            onChange={onPageChange}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
};

export default ResultsList;
