import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useSession } from 'next-auth/react';


interface UseSocketReturn {
  socket: Socket | null;
  isConnected: boolean;
  sendMessage: (content: string, conversationId?: string) => Promise<string>;
  joinConversation: (conversationId: string) => void;
  leaveConversation: (conversationId: string) => void;
}

export function useSocket(): UseSocketReturn {
  const { data: session } = useSession();
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!session?.accessToken) return;

    // Tạo socket connection
    const socket = io('https://api-v1.prosai.vn', {
      transports: ['polling', 'websocket'],
      auth: { token: session.accessToken },
      timeout: 10000,
    });

    socketRef.current = socket;

    // Event listeners
    socket.on('connect', () => {
      console.log('✅ Socket connected:', socket.id);
      setIsConnected(true);
    });

    socket.on('disconnect', (reason) => {
      console.log('🔌 Socket disconnected:', reason);
      setIsConnected(false);
    });

    socket.on('connect_error', (error) => {
      console.error('❌ Socket connection error:', error.message);
      setIsConnected(false);
    });

    // Cleanup
    return () => {
      socket.disconnect();
      socketRef.current = null;
      setIsConnected(false);
    };
  }, [session?.accessToken]);

  const sendMessage = (content: string, conversationId?: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!socketRef.current) {
        reject(new Error('Socket not connected'));
        return;
      }

      socketRef.current.emit('sendMessage', {
        conversationId: conversationId || '', // Tạo conversation mới nếu không có
        content: content
      }, (ack: { conversationId?: string }) => {
        if (ack && ack.conversationId) {
          resolve(ack.conversationId);
        } else {
          reject(new Error('Failed to send message'));
        }
      });
    });
  };

  const joinConversation = (conversationId: string) => {
    if (!socketRef.current) return;

    socketRef.current.emit('joinConversation', { conversationId }, (ack: Record<string, unknown>) => {
      console.log('🔗 Joined conversation:', ack);
    });
  };

  const leaveConversation = (conversationId: string) => {
    if (!socketRef.current) return;

    socketRef.current.emit('leaveConversation', { conversationId }, (ack: Record<string, unknown>) => {
      console.log('🔌 Left conversation:', ack);
    });
  };

  return {
    socket: socketRef.current,
    isConnected,
    sendMessage,
    joinConversation,
    leaveConversation,
  };
}
