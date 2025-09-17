'use client';

import React from 'react';
import ComingSoon from '@/components/shared/empty-states/items/coming-soon';
import { useRouter } from 'next/navigation';
import { APP_CONFIG } from '@/utils/env';

const ChatAiPage: React.FC = () => {
  const router = useRouter();
  return (
    <div className="bg-white flex items-center justify-center">
      <div className="responsive-container mx-auto py-20">
        <ComingSoon actionText="Quay lại" onAction={() => router.push(APP_CONFIG.homeUrl)} />
      </div>
    </div>
  );
};

export default ChatAiPage;
