'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Xin chào! Tôi có thể giúp gì cho bạn hôm nay?',
      timestamp: new Date('2024-01-01T10:00:00'),
    },
    {
      id: '2',
      type: 'user',
      content: 'Xin chào! Tôi muốn tìm các thông tin về giá BĐS xung quanh khu vực Long Biên, Hà Nội',
      timestamp: new Date('2024-01-01T10:01:00'),
    },
    {
      id: '3',
      type: 'ai',
      content: '',
      timestamp: new Date('2024-01-01T10:03:00'),
      isTyping: true,
    },
  ]);

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'Cảm ơn bạn đã hỏi! Tôi đang tìm kiếm thông tin về giá bất động sản tại khu vực Long Biên, Hà Nội. Để tôi cung cấp cho bạn thông tin chi tiết nhất...',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
    }, 2000);
  };

  return (
  <div className="bg-white rounded-lg border border-[#2B88E5] shadow-sm h-full flex flex-col">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-[#2B88E5] to-[#005EBC] rounded-t-lg px-6 py-4 flex items-center">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mr-3">
          <Image src="/images/prosai_ai_84.png" alt="Prosai Ai" width={84} height={84} className="rounded-full" />
        </div>
        <div>
          <p className="text-white text-sm">Chat với</p>
          <p className="text-white font-bold text-lg">Prosai Ai</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6">
        <MessageList messages={messages} />
      </div>

      {/* Message Input */}
      <div className="border-t border-[#2B88E5] p-2">
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatInterface;
