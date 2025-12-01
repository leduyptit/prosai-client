'use client';

import React, { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { Layout } from 'antd';
import useDevice from '@/hooks/useDevice';
import { useTokenAuth } from '@/hooks/useTokenAuth';

import DesktopHeader from '../desktop/Header';
import DesktopFooter from '../desktop/Footer';
import MobileHeader from '../mobile/Header';
import MobileBottomNav from '../mobile/BottomNav';
import MobileFooter from '../mobile/Footer';

const { Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

// Component that uses useTokenAuth (which uses useSearchParams)
const TokenAuthWrapper = () => {
  useTokenAuth();
  return null;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isDesktop } = useDevice();
  const pathname = usePathname();
  const isMapSearch = pathname?.startsWith('/map-search');
  
  // Handle token authentication globally - wrapped in Suspense for useSearchParams
  const tokenAuthComponent = (
    <Suspense fallback={null}>
      <TokenAuthWrapper />
    </Suspense>
  );

  // Desktop Layout
  if (isDesktop) {
    return (
      <>
        {tokenAuthComponent}
        <Layout className={isMapSearch ? 'h-screen' : 'min-h-screen'}>
          <DesktopHeader />
          <Content className={isMapSearch ? 'full-width p-0 overflow-hidden' : 'full-width'} style={isMapSearch ? { height: 'calc(100vh - 64px)' } : undefined}>
              {children}
          </Content>
          {!isMapSearch && <DesktopFooter />}
        </Layout>
      </>
    );
  }

  // Mobile/Tablet Layout
  return (
    <>
      {tokenAuthComponent}
      <Layout className={isMapSearch ? 'h-screen' : 'min-h-screen'}>
        <MobileHeader />
        <Content className={isMapSearch ? 'p-0 overflow-hidden' : 'p-4 pb-20'} style={isMapSearch ? { height: 'calc(100vh - 56px)' } : undefined}>
          {children}
        </Content>
        {!isMapSearch && <MobileFooter />}
        {!isMapSearch && <MobileBottomNav />}
      </Layout>
    </>
  );
};

export default MainLayout; 