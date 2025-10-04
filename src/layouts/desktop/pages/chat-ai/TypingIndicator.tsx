'use client';

import React from 'react';
import Image from 'next/image';

interface TypingIndicatorProps {
  timestamp: Date;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ timestamp }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  return (
    <div className="flex justify-start">
      <div className="flex max-w-[80%] flex-row">
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
          <Image src="/images/prosai_ai_84.png" alt="Prosai Ai" width={84} height={84} className="rounded-full" />
        </div>

        {/* Typing Content */}
        <div className="flex flex-col items-start">
          {/* Timestamp */}
          <div className="text-xs text-gray-500 mb-1">
            {formatTime(timestamp)}
          </div>

          {/* Typing Bubble */}
          <div className="bg-gray-100 border border-gray-200 rounded-2xl px-4 py-3">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
