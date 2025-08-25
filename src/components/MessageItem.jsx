import React from 'react';
import { motion } from 'framer-motion';

function MessageItem({ message }) {
  const time = new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return message.system ? (
    <p className="text-center text-gray-400 italic text-sm my-1">
      {message.text} <span className="text-xs text-gray-500">{time}</span>
    </p>
  ) : (
    <motion.div 
      className="bg-gray-800 text-white p-3 rounded-md shadow max-w-[80vw] sm:max-w-[60%] md:max-w-[50%]"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-baseline mb-1">
        <span className="font-semibold text-indigo-400 ">{message.sender}</span>
        <span className="text-xs text-gray-400">{time}</span>
      </div>
      <div className="leading-relaxed">{message.text}</div>
    </motion.div>
  );
}

export default MessageItem;
