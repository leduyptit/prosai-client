'use client';

import React from 'react';
import Image from 'next/image';

interface MessageProps {
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const Message: React.FC<MessageProps> = ({ type, content, timestamp }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const isUser = type === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        {!isUser && (
          <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
            <Image src="/images/prosai_ai_84.png" alt="Prosai Ai" width={84} height={84} className="rounded-full" />
          </div>
        )}

        {/* Message Content */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          {/* Timestamp */}
          <div className="text-xs text-gray-500 mb-1">
            {formatTime(timestamp)}
          </div>

          {/* Message Bubble */}
          <div
            className={`px-4 py-3 rounded-2xl ${
              isUser
                ? 'bg-blue-500 text-white'
                : 'bg-white border border-gray-200 text-gray-900'
            }`}
          >
            <p className="text-sm leading-relaxed">{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
