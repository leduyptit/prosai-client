'use client';

import { useState, useEffect } from 'react';

type DeviceType = 'desktop' | 'mobile' | 'tablet';

interface UseDeviceReturn {
  deviceType: DeviceType;
  isDesktop: boolean;
  isMobile: boolean;
  isTablet: boolean;
  screenWidth: number;
  screenHeight: number;
  isLoading: boolean;
}

const useDevice = (): UseDeviceReturn => {
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const updateDeviceType = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setScreenWidth(width);
      setScreenHeight(height);

      if (width < 768) {
        setDeviceType('mobile');
      } else if (width >= 768 && width < 1280) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    // Initial check
    updateDeviceType();
    
    // Set loading to false after initial check
    setIsLoading(false);

    // Add event listener
    window.addEventListener('resize', updateDeviceType);

    // Cleanup
    return () => window.removeEventListener('resize', updateDeviceType);
  }, []);

  return {
    deviceType,
    isDesktop: deviceType === 'desktop',
    isMobile: deviceType === 'mobile',
    isTablet: deviceType === 'tablet',
    screenWidth,
    screenHeight,
    isLoading,
  };
};

export default useDevice; 