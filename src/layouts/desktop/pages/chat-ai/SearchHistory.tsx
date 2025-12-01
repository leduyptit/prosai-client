'use client';

import React, { useState, useEffect } from 'react';
import { conversationService, ConversationHistoryItem } from '@/services/conversation';
import { Spin, Alert } from 'antd';
import { EmptyData } from '@/components/shared/empty-states/items';

interface SearchHistoryProps {
  onSelectConversation?: (conversationId: string) => void;
  selectedConversationId?: string;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({ onSelectConversation, selectedConversationId }) => {
  const [conversationHistory, setConversationHistory] = useState<ConversationHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch conversation history immediately when component mounts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await conversationService.getConversationHistory();
        setConversationHistory(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchConversationHistory = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await conversationService.getConversationHistory();
      setConversationHistory(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (timestamp: string) => {
    // Convert Unix timestamp to Date
    const date = new Date(parseInt(timestamp) * 1000);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: 'Asia/Ho_Chi_Minh'
    }) + ' • ' + date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Ho_Chi_Minh'
    });
  };

  const handleConversationClick = (conversationId: string) => {
    if (typeof window !== 'undefined') {
      window.location.hash = conversationId;
    }
    if (onSelectConversation) {
      onSelectConversation(conversationId);
    }
  };

  const refetch = () => {
    fetchConversationHistory();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm h-full flex flex-col border border-gray-200">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Lịch sử cuộc trò chuyện ({conversationHistory.length})</h2>
      </div>

      {/* Search History List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <div className="px-2 py-2">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Spin size="large" />
            </div>
          ) : error ? (
            <div className="px-4 py-4">
              <Alert
                message="Lỗi tải dữ liệu"
                description={error}
                type="error"
                showIcon
                action={
                  <button
                    onClick={refetch}
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    Thử lại
                  </button>
                }
              />
            </div>
          ) : conversationHistory.length > 0 ? (
            <div className="space-y-2">
              {conversationHistory.slice(0, 20).map((item) => (
                <div key={item.id}>
                  <div
                    className={`cursor-pointer p-3 transition-all duration-200 relative group border-l-4 ${
                      item.id === selectedConversationId ? 'bg-[#F0F7FF] border-l-[#005EBC]' : 'border-l-transparent hover:bg-[#F7F7F7] hover:border-l-[#005EBC]'
                    }`}
                    onClick={() => handleConversationClick(item.id)}
                  >
                    <div className="text-xs text-gray-500 mb-2">
                      {formatDateTime(item.created_at)}
                    </div>
                    <div className="text-sm text-gray-900 leading-relaxed">
                      {item.title}
                    </div>
                  </div>
                  <div className="border-t border-gray-100"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-gray-500">
              <div className="text-center">
                <EmptyData type="default" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchHistory;
