import { apiClient } from './api';
import { API_ENDPOINTS } from '@/constants';

export interface ConversationHistoryItem {
  id: string;
  title: string;
  user_id: string;
  created_at: string;
  updated_at: string | null;
}

export interface ConversationMessageItem {
  id: string;
  conversation_id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  created_at: string; // ISO or unix seconds as string
}

class ConversationService {
  // Get conversation history
  async getConversationHistory(params: {
    page?: number;
    limit?: number;
  } = {}): Promise<ConversationHistoryItem[]> {
    const response = await apiClient.get<ConversationHistoryItem[]>(
      API_ENDPOINTS.CONVERSATION.HISTORY,
      { params }
    );  
    return response.data || [];
  }

  // Get messages for a conversation
  async getConversationMessages(conversationId: string, params: {
    page?: number;
    limit?: number;
  } = {}): Promise<ConversationMessageItem[]> {
    const url = `${API_ENDPOINTS.CONVERSATION.MESSAGES}/${conversationId}/messages`;
    const response = await apiClient.get<ConversationMessageItem[]>(url, { params });
    return response.data || [];
  }
}

export const conversationService = new ConversationService();
