import React from 'react';
import MessageItem from './MessageItem';
import '../index.css'

function MessageList({ messages }) {
  return (
    <div className="chat-mid flex flex-col gap-2 p-2 sm:p-4 overflow-y-auto max-h-[70vh]">
      {messages.map((msg, i) => (
        <MessageItem key={i} message={msg} />
      ))}
    </div>
  );
}

export default MessageList;
