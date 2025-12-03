'use client';

import React from 'react';
import ChatAiLayout from '@/layouts/desktop/pages/chat-ai';
import { ProtectedRoute } from '@/components/shared';

const ChatAiPage: React.FC = () => {
  return (
    <ProtectedRoute>
      <ChatAiLayout />
    </ProtectedRoute>
  );
};

export default ChatAiPage;
