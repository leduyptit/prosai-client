'use client';

import React from 'react';
import { Layout } from 'antd';
import useDevice from '@/hooks/useDevice';

import DesktopHeader from '../desktop/Header';
import DesktopFooter from '../desktop/Footer';
import MobileHeader from '../mobile/Header';
import MobileBottomNav from '../mobile/BottomNav';
import MobileFooter from '../mobile/Footer';

const { Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isDesktop, isMobile, isTablet } = useDevice();

  // Desktop Layout
  if (isDesktop) {
    return (
      <Layout className="min-h-screen">
        <DesktopHeader />
        <Content className="full-width">
            {children}
        </Content>
        <DesktopFooter />
      </Layout>
    );
  }

  // Mobile/Tablet Layout
  return (
    <Layout className="min-h-screen">
      <MobileHeader />
      <Content className="p-4 pb-20">
        {children}
      </Content>
      <MobileFooter />
      <MobileBottomNav />
    </Layout>
  );
};

export default MainLayout; 