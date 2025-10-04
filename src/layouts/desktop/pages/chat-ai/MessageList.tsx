'use client';

import React from 'react';
import Message from './Message';
import TypingIndicator from './TypingIndicator';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div key={message.id}>
          {message.isTyping ? (
            <TypingIndicator timestamp={message.timestamp} />
          ) : (
            <Message
              type={message.type}
              content={message.content}
              timestamp={message.timestamp}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
