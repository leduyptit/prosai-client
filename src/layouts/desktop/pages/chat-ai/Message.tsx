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
      timeZone: 'Asia/Ho_Chi_Minh'
    });
  };

  const isUser = type === 'user';

  // Render raw content, but linkify any URLs (supports optional '@' prefix)
  const renderWithLinks = (raw: string) => {
    const urlRegex = /@?https?:\/\/[^\s]+/gi;
    const tokens = raw.split(/(@?https?:\/\/[^\s]+)/gi);
    return (
      <span className="whitespace-pre-wrap break-words">
        {tokens.map((part, idx) => {
          if (!part) return null;
          if (urlRegex.test(part)) {
            const href = part.replace(/^@/, '');
            let label = href;
            try { label = decodeURI(href); } catch {}
            return (
              <a
                key={`u-${idx}`}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium cursor-pointer"
                style={{ color: '#00478E'}}
              >
                {label}
              </a>
            );
          }
          return <React.Fragment key={`t-${idx}`}>{part}</React.Fragment>;
        })}
      </span>
    );
  };

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
            <div className="text-sm leading-relaxed">{renderWithLinks(content)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
