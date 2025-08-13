'use client';

import React, { useState } from 'react';
import ResultItem, { SearchItem } from './ResultItem';
import { Pagination } from 'antd';

interface ResultsListProps {
  items: SearchItem[];
  pageSize?: number;
}

const ResultsList: React.FC<ResultsListProps> = ({ items, pageSize = 8 }) => {
  const [page, setPage] = useState(1);
  const start = (page - 1) * pageSize;
  const current = items.slice(start, start + pageSize);

  return (
    <div>
      <div>
        {current.map((item) => (
          <ResultItem key={item.id} item={item} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Pagination
          current={page}
          total={items.length}
          pageSize={pageSize}
          onChange={setPage}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default ResultsList;
