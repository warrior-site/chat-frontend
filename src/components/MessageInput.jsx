import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useSocket } from '../context/SocketContext';
import { useAuthStore } from '../context/authContext';

function MessageInput({ onSend, toggleAI }) {
  const [text, setText] = useState('');
  const socket = useSocket();
  const { user } = useAuthStore(); 
  const typingTimeoutRef = useRef(null);

  const handleSend = () => {
    if (text.trim()) {
      onSend(text.trim());
      setText('');
      socket.emit('stop-typing'); // Stop typing on send
    }
  };

  const handleAI = () => {
    if (typeof toggleAI === 'function') toggleAI();
  };

  const handleTyping = () => {
    if (!socket || !user) return;
    socket.emit('typing', user.username);

    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit('stop-typing');
    }, 2000);
  };

  return (
    <div className="w-full flex flex-wrap sm:flex-nowrap items-center gap-2">
      <input
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          handleTyping();
        }}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        placeholder="Type your message..."
        className="flex-1 min-w-[200px] px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {/* AI Icon */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleAI}
        className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition flex items-center justify-center"
        title="AI Assist"
      >
        <Sparkles className="w-5 h-5" />
      </motion.button>

      {/* Send Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleSend}
        className="px-5 py-2 rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:opacity-90 transition whitespace-nowrap"
      >
        Send
      </motion.button>
    </div>
  );
}

export default MessageInput;
