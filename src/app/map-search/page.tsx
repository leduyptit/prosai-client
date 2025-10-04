'use client';

import React, { Suspense } from 'react';
import { MapSearchLayout } from '@/layouts/desktop/pages/map-search';
import { Loading } from '@/components/ui/feedback';

const MapSearchPage: React.FC = () => {
  return (
    <Suspense fallback={<Loading size="large" text="Đang tải..." />}>
      <MapSearchLayout />
    </Suspense>
  );
};

export default MapSearchPage;
