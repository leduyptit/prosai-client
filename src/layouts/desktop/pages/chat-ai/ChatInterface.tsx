'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useSocket } from '@/hooks/useSocket';
import { conversationService, ConversationMessageItem } from '@/services/conversation';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface ChatInterfaceProps {
  selectedConversationId?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ selectedConversationId }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-message',
      type: 'ai',
      content: 'Xin chào! \nTôi có thể giúp gì bạn hôm nay?',
      timestamp: new Date(),
    },
  ]);
  const [currentConversationId, setCurrentConversationId] = useState<string>('');
  const [isTyping, setIsTyping] = useState(false);
  const { socket, isConnected, sendMessage, joinConversation } = useSocket();

  // Listen for incoming messages
  useEffect(() => {
    if (!socket) return;

    const parseTimestamp = (ts: string | number | Date): Date => {
      if (ts instanceof Date) return ts;
      if (typeof ts === 'number') {
        // Assume seconds if it's a 10-digit number
        return ts < 1e12 ? new Date(ts * 1000) : new Date(ts);
      }
      if (/^\d+$/.test(String(ts))) {
        const n = Number(ts);
        return n < 1e12 ? new Date(n * 1000) : new Date(n);
      }
      const d = new Date(ts as string);
      return isNaN(d.getTime()) ? new Date() : d;
    };

    const handleMessage = (msg: any) => {
      const newMessage: Message = {
        id: msg.id,
        type: msg.role === 'user' ? 'user' : 'ai',
        content: msg.content,
        timestamp: parseTimestamp(msg.created_at),
      };

      setMessages(prev => {
        // Check if message already exists to avoid duplicates
        const exists = prev.some(m => m.id === newMessage.id);
        if (exists) {
          return prev;
        }

        // If this is a user message, replace the temporary one
        if (newMessage.type === 'user') {
          const tempMessageIndex = prev.findIndex(m => m.id.startsWith('temp-'));
          if (tempMessageIndex !== -1) {
            // Replace temporary message with real one
            const updatedMessages = [...prev];
            updatedMessages[tempMessageIndex] = newMessage;
            return updatedMessages;
          }
        }

        return [...prev, newMessage];
      });
      setIsTyping(false);
    };

    socket.on('message', handleMessage);

    return () => {
      socket.off('message', handleMessage);
    };
  }, [socket]);

  // Load conversation history when selectedConversationId changes
  const lastLoadedIdRef = useRef<string>('');

  useEffect(() => {
    const loadHistory = async () => {
      if (!selectedConversationId) return;
      if (selectedConversationId === lastLoadedIdRef.current) return;

      try {
        const msgs = await conversationService.getConversationMessages(selectedConversationId, { limit: 100 });
        const mapped: Message[] = msgs.map((m: ConversationMessageItem) => ({
          id: m.id,
          type: (m.role === 'user' ? 'user' : 'ai') as 'user' | 'ai',
          content: m.content,
          timestamp: (/^\d+$/.test(String(m.created_at))
            ? new Date(Number(m.created_at) * 1000)
            : (isNaN(new Date(m.created_at).getTime()) ? new Date() : new Date(m.created_at))),
        }));

        setMessages(prev => {
          // keep welcome message at top, then history
          const welcome = prev.find(m => m.id === 'welcome-message');
          const base: Message[] = welcome ? [welcome] : [];
          return [...base, ...mapped];
        });
        setCurrentConversationId(selectedConversationId);
        joinConversation(selectedConversationId);
        lastLoadedIdRef.current = selectedConversationId;
      } catch {
      }
    };

    loadHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedConversationId]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || !isConnected) return;

    // Hiển thị tin nhắn user ngay lập tức
    const userMessage: Message = {
      id: `temp-${Date.now()}`,
      type: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const conversationId = await sendMessage(content.trim(), currentConversationId || selectedConversationId || '');
      
      if (conversationId && conversationId !== currentConversationId) {
        setCurrentConversationId(conversationId);
        joinConversation(conversationId);
        if (typeof window !== 'undefined') {
          window.location.hash = conversationId;
        }

        // Immediately load full history for the newly created conversation
        try {
          const msgs = await conversationService.getConversationMessages(conversationId, { limit: 100 });
          const mapped: Message[] = msgs.map((m: ConversationMessageItem) => ({
            id: m.id,
            type: (m.role === 'user' ? 'user' : 'ai') as 'user' | 'ai',
            content: m.content,
            timestamp: (/^\d+$/.test(String(m.created_at))
              ? new Date(Number(m.created_at) * 1000)
              : (isNaN(new Date(m.created_at).getTime()) ? new Date() : new Date(m.created_at))),
          }));
          setMessages(prev => {
            const welcome = prev.find(m => m.id === 'welcome-message');
            const base: Message[] = welcome ? [welcome] : [];
            return [...base, ...mapped];
          });
          lastLoadedIdRef.current = conversationId;
        } catch {
        }
      }
    } catch {
      setIsTyping(false);
      
      // Remove temporary user message on error
      setMessages(prev => prev.filter(msg => msg.id !== userMessage.id));
      
      // Show error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'Xin lỗi, có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  return (
  <div className="bg-white rounded-lg border border-[#2B88E5] shadow-sm h-full flex flex-col">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-[#2B88E5] to-[#005EBC] rounded-t-lg px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mr-3">
            <Image src="/images/prosai_ai_84.png" alt="Prosai Ai" width={84} height={84} className="rounded-full" />
          </div>
          <div>
            <p className="text-white text-sm">Chat với</p>
            <p className="text-white font-bold text-lg">Prosai Ai</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-2 ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
          <span className="text-white text-sm">
            {isConnected ? 'Đã kết nối' : 'Đang kết nối...'}
          </span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-6 max-h-[calc(100vh-320px)] overflow-y-auto">
        <MessageList messages={messages} />
        {isTyping && (
          <div className="flex items-center space-x-2 text-gray-500 text-sm">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span>Prosai Ai đang trả lời...</span>
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="border-t border-[#2B88E5] p-2">
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatInterface;
