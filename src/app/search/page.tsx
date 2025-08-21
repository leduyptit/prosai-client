'use client';

import React, { Suspense } from 'react';
import { SearchLayout } from '@/layouts/desktop/pages/search';
import { Loading } from '@/components/ui/feedback';

const SearchPage: React.FC = () => {
  return (
    <Suspense fallback={<Loading size="large" text="Đang tải..." />}>
      <SearchLayout />
    </Suspense>
  );
};

export default SearchPage;
