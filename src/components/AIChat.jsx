import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import '../index.css';

function AIChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollBehavior = 'smooth';

  const sendToAI = async () => {
    if (!input.trim()) return;
    const userMsg = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('https://chat-backend-knw6.onrender.com/api/ai/chat', { prompt: input });
      const aiMsg = { text: res.data.response, sender: 'ai' };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('AI request failed:', err);
      setMessages((prev) => [...prev, { text: '❌ AI failed to respond', sender: 'ai' }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: scrollBehavior });
    }
  }, [messages, loading]);

 return (
  <div className="flex flex-col h-full w-full bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] border-l border-gray-700 overflow-hidden">
    {/* Header */}
    <div className="px-3 pt-3 pb-1 shrink-0">
      <h2 className="text-lg font-semibold text-white tracking-wide">🤖 AI Assistant</h2>
    </div>

    {/* Scrollable Messages */}
    <div className="chat-scroll flex-1 overflow-y-auto px-3 space-y-2 custom-scrollbar">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`p-2 rounded-md max-w-xs ${
            msg.sender === 'user'
              ? 'bg-indigo-600 self-end text-white ml-auto'
              : 'bg-gray-800 self-start text-gray-100'
          }`}
        >
          {msg.text}
        </div>
      ))}
      {loading && (
        <div className="flex items-center gap-1 text-indigo-300 text-sm italic pl-2">
          AI is typing
          <span className="animate-bounce">.</span>
          <span className="animate-bounce delay-200">.</span>
          <span className="animate-bounce delay-400">.</span>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>

    {/* Input */}
    <div className="px-3 py-2 border-t border-gray-700 bg-black bg-opacity-40 shrink-0">
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendToAI()}
          placeholder="Ask something..."
          className="flex-1 px-3 py-2 text-sm bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={sendToAI}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition"
        >
          Send
        </motion.button>
      </div>
    </div>
  </div>
);

}

export default AIChat;
