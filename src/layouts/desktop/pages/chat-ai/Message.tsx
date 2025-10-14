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

  const renderContent = (raw: string) => {
    // Detect URL at start, possibly prefixed by '@'
    const urlMatch = raw.match(/@?(https?:\/\/[^\s]+)/i);
    if (!urlMatch) {
      // Also prettify lines starting with '- ' by splitting to list
      if (raw.includes('\n- ')) {
        const [firstLine, ...rest] = raw.split('\n');
        return (
          <div className="space-y-2">
            <p className="text-sm leading-relaxed whitespace-pre-line">{firstLine}</p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {rest.map((line, idx) => (
                <li key={idx}>{line.replace(/^\-\s*/, '')}</li>
              ))}
            </ul>
          </div>
        );
      }
      return <p className="text-sm leading-relaxed whitespace-pre-line">{raw}</p>;
    }

    const rawUrl = urlMatch[1];
    let prettyUrl = rawUrl;
    try {
      // Decode percent-encoded for display
      prettyUrl = decodeURI(rawUrl);
    } catch {}

    let paramsView: React.ReactNode = null;
    try {
      const u = new URL(rawUrl);
      const labelMap: Record<string, string> = {
        city: 'Thành phố',
        property_type: 'Loại BĐS',
        listing_type: 'Hình thức',
        from_price: 'Giá từ',
        to_price: 'Giá đến',
        area_from: 'Diện tích từ',
        area_to: 'Diện tích đến',
        bedrooms: 'Phòng ngủ',
        bathrooms: 'Phòng tắm',
        district: 'Quận/Huyện',
        ward: 'Phường/Xã',
      };

      const entries = Array.from(u.searchParams.entries())
        .filter(([_, v]) => v != null && v !== '')
        .map(([k, v]) => ({ key: k, value: decodeURIComponent(v) }));

      if (entries.length > 0) {
        paramsView = (
          <div className="mt-2 grid grid-cols-1 gap-1">
            {entries.map(({ key, value }, idx) => (
              <div key={idx} className="text-[13px] text-gray-700">
                <span className="font-medium">{labelMap[key] || key}:</span> {value}
              </div>
            ))}
          </div>
        );
      }
    } catch {
      // ignore URL parse errors
    }

    // Also render the remaining description after the URL as a list if provided
    const afterUrl = raw.slice(urlMatch.index! + urlMatch[0].length).trim();
    const descriptionBlock = afterUrl
      ? (
          <div className="mt-2">
            {afterUrl.includes('\n- ')
              ? (
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {afterUrl.split('\n').filter(Boolean).map((line, i) => (
                    <li key={i}>{line.replace(/^\-\s*/, '')}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm whitespace-pre-line">{afterUrl}</p>
              )}
          </div>
        )
      : null;

    return (
      <div>
        <a
          href={rawUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 break-all hover:underline"
        >
          {prettyUrl}
        </a>
        {paramsView}
        {descriptionBlock}
      </div>
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
            {renderContent(content)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
