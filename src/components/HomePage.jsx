import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext'

function HomePage({ onJoin }) {
  const [name, setname] = useState('');
  const { setUser } = useUser();

  const handleJoin = () => {
    if (!name.trim()) return
setUser({ name: name.trim() })
onJoin(name.trim())
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-x-hidden">
      <motion.div
        className="w-full max-w-xl sm:max-w-sm md:max-w-md space-y-6 text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight break-words">
          🚀 Welcome to Chat App
        </h1>
        <p className="text-gray-400 text-sm sm:text-base break-words">
          Join the conversation by entering your username
        </p>

        <input
          type="text"
          placeholder="Enter your username"
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={name}
          onChange={(e) => setname(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
          maxLength={20}
        />
        <Link to={"/chat"}>
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            onClick={handleJoin}
            className="w-full py-3 font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-md transition-all"
          >
            Join Chat
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}

export default HomePage;
