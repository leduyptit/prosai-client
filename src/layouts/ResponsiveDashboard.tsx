'use client';

import React from 'react';
import useDevice from '@/hooks/useDevice';
import DesktopDashboard from './desktop/Dashboard';
import MobileDashboard from './mobile/Dashboard';
import { Loading } from '@/components/ui/feedback';

const ResponsiveDashboard: React.FC = () => {
  const { isDesktop, isMobile, isTablet, isLoading } = useDevice();

  // Show loading while detecting device
  if (isLoading) {
    return <Loading text="Loading..." />;
  }

  // Desktop Dashboard
  if (isDesktop) {
    return <DesktopDashboard />;
  }
  
  // Mobile/Tablet Dashboard
  return <MobileDashboard />;
};

export default ResponsiveDashboard; 