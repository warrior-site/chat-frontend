import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function HomePage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden flex flex-col">
      
      {/* Top Navbar */}
      <header className="w-full">
        <Navbar />
      </header>

      {/* Centered Content */}
      <main className="flex-grow flex items-center justify-center">
        <motion.div
          className="w-full max-w-md space-y-6 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-4xl font-bold">🚀 Welcome to Chat App</h1>
          <p className="text-gray-400">Join conversations instantly</p>
          <Link to="/chat">
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              className="w-full py-3 font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-md shadow-lg hover:shadow-white/20"
            >
              Enter Chat
            </motion.button>
          </Link>
        </motion.div>
      </main>
    </div>
  );
}

export default HomePage;
