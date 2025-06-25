import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuthStore } from '../context/authContext';
import SearchUserGroup from '../components/SearchUserGroup';
import FriendsShown from '../components/FriendsShown';
import GroupsShown from '../components/GroupsShown';
import CreateGroupForm from '../components/CreateGroupForm'; // ✅ Make sure this component exists

function HomePage() {
  const { user } = useAuthStore();
  const font = user?.font || '';
  const textSize = user?.textSize || '';
  const [showForm, setShowForm] = useState(false); // ✅ Declare toggle state

  return (
    <div
      className={`relative ${font} ${textSize} min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 text-gray-800 overflow-hidden flex flex-col`}
    >
      {/* Top Navbar */}
      <header className="w-full shadow-md z-10">
        <Navbar />
      </header>

      {/* Group Creation Form (Toggle) */}
      <div className="w-full flex justify-center mt-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => setShowForm(prev => !prev)}
          className="px-5 py-2 text-white font-medium bg-gradient-to-r from-purple-600 to-indigo-700 rounded-md shadow-md hover:shadow-lg transition"
        >
          {showForm ? 'Cancel' : '+ Create Group'}
        </motion.button>
      </div>

      {/* Group Form */}
      {showForm && (
        <div className="w-full flex justify-center mt-4 px-4">
          <CreateGroupForm onClose={() => setShowForm(false)} />
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center px-4 py-10 gap-8">
        {/* Search Bar on Top */}
        <div className="w-full max-w-2xl bg-white/70 border border-gray-300 shadow-md rounded-lg backdrop-blur-md p-4">
          <SearchUserGroup />
        </div>

        {/* Friends & Groups Section */}
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-6">
          <FriendsShown />
          <GroupsShown />
        </div>

        {/* Enter Chat Button Only */}
        <Link to="/chat">
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className="px-6 py-3 font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-md shadow-md hover:shadow-indigo-300/30 transition"
          >
            Enter Chat
          </motion.button>
        </Link>
      </main>
    </div>
  );
}

export default HomePage;
