import React, { useState } from 'react';
import { motion } from 'framer-motion';

function MessageInput({ onSend }) {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      onSend(text.trim());
      setText('');
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        placeholder="Type your message..."
        className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <motion.button
        whileTap={{ scale: 0.9 }}
        className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2 rounded-md text-white font-semibold hover:opacity-90 transition"
        onClick={handleSend}
      >
        Send
      </motion.button>
    </div>
  );
}

export default MessageInput;
