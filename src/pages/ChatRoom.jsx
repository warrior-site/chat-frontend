import React, { useState, useEffect } from 'react';
import { useSocket } from '../context/SocketContext';
import Navbar from '../components/Navbar';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import UserBadge from '../components/UserBadge';
import LoadingSpinner from '../components/LoadingSpinner';
import '../index.css';
import { useAuthStore } from '../context/authContext';

function ChatRoom() {
  const socket = useSocket();
  const { user } = useAuthStore();
  const name = user?.username;
  const userId = user?._id;

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔽 Fetch messages from DB
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch('https://chat-backend-knw6.onrender.com/api/messages/all');
        const data = await res.json();

        const formatted = data.map((msg) => ({
          text: msg.content,
          sender: msg.sender?.username || 'Unknown',
          timestamp: msg.timestamp,
          system: false,
        }));

        setMessages(formatted);
      } catch (err) {
        console.error("❌ Failed to fetch messages:", err);
      } finally {
        setLoading(false);
      }
    };

    if (socket && name) {
      socket.emit('join', name);
      fetchMessages();

      socket.on('chat-message', (msg) => {
        setMessages((prev) => [...prev, { ...msg, system: false }]);
      });

      socket.on('user-joined', (username) => {
        setMessages((prev) => [
          ...prev,
          {
            system: true,
            sender: '',
            text: `${username} joined the chat.`,
            timestamp: new Date().toISOString(),
          },
        ]);
      });
    }

    return () => {
      socket?.off('chat-message');
      socket?.off('user-joined');
    };
  }, [socket, name]);

  // 🔼 Emit new message
  const sendMessage = (text) => {
    const msg = {
      sender: name || 'Guest',
      text,
      userId: userId,
      timestamp: new Date().toISOString(),
    };
    socket.emit('chat-message', msg);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-x-hidden">
      <Navbar />
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-700 bg-gray-900">
        <UserBadge username={name} />
      </div>

      <div className="chat-mid flex-1 overflow-y-auto px-4 sm:px-6 md:px-8">
        {loading ? <LoadingSpinner /> : <MessageList messages={messages} />}
      </div>

      <div className="px-4 py-3 border-t border-gray-700 bg-gray-900">
        <MessageInput onSend={sendMessage} />
      </div>
    </div>
  );
}

export default ChatRoom;
