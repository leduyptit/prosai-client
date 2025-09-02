import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { App } from 'antd';
import { apiClient } from '@/services/api';

export interface UserPackageInfo {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  duration: number;
  is_premium: boolean;
  premium_start_date: string | null;
  premium_end_date: string | null;
  max_posts: number;
  features: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
}

interface UserProfileResponse {
  id: string;
  email: string;
  full_name: string | null;
  username: string;
  avatar_url: string | null;
  phone: string;
  is_active: boolean;
  is_verified: boolean;
  is_deleted: boolean;
  is_premium: boolean;
  balance: string;
  is_admin: boolean;
  role: string;
  premium_start_date: string | null;
  premium_end_date: string | null;
  package_id: string;
  package: {
    id: string;
    created_at: string;
    updated_at: string | null;
    name: string;
    slug: string;
    description: string;
    price: string;
    duration: number;
    is_active: boolean;
    is_recurring: boolean;
    discount_percentage: number;
    discount_amount: number;
    discount_duration: number;
    image: string;
    features: string[];
  };
}

const useUserPackage = () => {
  const [packageInfo, setPackageInfo] = useState<UserPackageInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session, status } = useSession();
  const { message } = App.useApp();

  const fetchPackageInfo = useCallback(async () => {
    if (!session?.accessToken) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await apiClient.get('/auth/profile');
      const result: UserProfileResponse = response.data;
      
      if (result.package) {
        // Transform API response to UserPackageInfo format
        const packageData: UserPackageInfo = {
          id: result.package.id,
          name: result.package.name,
          slug: result.package.slug,
          description: result.package.description,
          price: result.package.price,
          duration: result.package.duration,
          is_premium: result.is_premium,
          premium_start_date: result.premium_start_date,
          premium_end_date: result.premium_end_date,
          max_posts: 5, // Default value, can be updated based on package type
          features: result.package.features,
          is_active: result.package.is_active,
          created_at: result.package.created_at,
          updated_at: result.package.updated_at
        };
        setPackageInfo(packageData);
      } else {
        throw new Error('Không thể tải thông tin gói hội viên');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải thông tin gói hội viên';
      setError(errorMessage);
      message.error(errorMessage);
      console.error('Error fetching package info:', err);
    } finally {
      setLoading(false);
    }
  }, [message, session?.accessToken]);

  // Auto-fetch when session changes
  useEffect(() => {
    if (status === 'authenticated' && session?.accessToken) {
      fetchPackageInfo();
    } else if (status === 'unauthenticated') {
      setPackageInfo(null);
      setLoading(false);
      setError(null);
    }
  }, [status, session?.accessToken, fetchPackageInfo]);

  // Function to refresh package info (useful after upgrade)
  const refreshPackageInfo = useCallback(() => {
    fetchPackageInfo();
  }, [fetchPackageInfo]);

  // Check if user has active premium package
  const isPremiumActive = useCallback(() => {
    if (!packageInfo) return false;
    
    if (!packageInfo.is_premium) return false;
    
    if (packageInfo.premium_end_date) {
      const endDate = new Date(packageInfo.premium_end_date);
      const now = new Date();
      return endDate > now;
    }
    
    return packageInfo.is_premium;
  }, [packageInfo]);

  // Check if package is expired
  const isPackageExpired = useCallback(() => {
    if (!packageInfo || !packageInfo.premium_end_date) return false;
    
    const endDate = new Date(packageInfo.premium_end_date);
    const now = new Date();
    return endDate <= now;
  }, [packageInfo]);

  // Get remaining days
  const getRemainingDays = useCallback(() => {
    if (!packageInfo?.premium_end_date) return 0;
    
    const endDate = new Date(packageInfo.premium_end_date);
    const now = new Date();
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return Math.max(0, diffDays);
  }, [packageInfo]);

  return {
    packageInfo,
    loading,
    error,
    refreshPackageInfo,
    isPremiumActive: isPremiumActive(),
    isPackageExpired: isPackageExpired(),
    remainingDays: getRemainingDays(),
    refetch: fetchPackageInfo,
  };
};

export default useUserPackage;
