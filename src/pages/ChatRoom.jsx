import React, { useState, useEffect } from 'react';
import { useSocket } from '../context/SocketContext';
import Navbar from '../components/Navbar';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import UserBadge from '../components/UserBadge';
import LoadingSpinner from '../components/LoadingSpinner';
import { useUser } from '../context/UserContext'
import '../index.css'
// import { motion } from 'framer-motion'; // Uncomment if you want to use animations

function ChatRoom() {
  const socket = useSocket();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser()
  const [name] = useState(user?.name);

  useEffect(() => {
    if (!socket) return;
    socket.emit('join', name);

    socket.on('chat-message', (msg) => {
      setMessages((prev) => [...prev, { ...msg, system: false }]);
    });

    socket.on('user-joined', (username) => {
      setMessages((prev) => [...prev, {
        system: true,
        sender: '',
        text: `${username} joined the chat.`,
        timestamp: new Date().toISOString()
      }]);
    });

    setTimeout(() => setLoading(false), 500);

    return () => {
      socket.off('chat-message');
      socket.off('user-joined');
    };
  }, [socket, name]);

  const sendMessage = (text) => {
    const msg = {
      sender: name,
      text,
      timestamp: new Date().toISOString(),
    };
    socket.emit('chat-message', msg);
    setMessages((prev) => [...prev, { ...msg, system: false }]);
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
