import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { useAuthStore } from '../context/authContext';

function SearcUserGroup() {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('user'); // 'user' or 'group'
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const {user} =useAuthStore()

  const fetchResults = debounce(async (q, type) => {
    if (!q.trim()) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/user/search?type=${type}&q=${q}`, {
        withCredentials: true,
      });

      setResults(res.data);
      setShowDropdown(true);
    } catch (err) {
      console.error('Search failed', err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, 400);

  useEffect(() => {
    fetchResults(query, searchType);
    return () => fetchResults.cancel();
  }, [query, searchType]);

  const handleAction = async (itemId) => {
    try {
      if (searchType === 'user') {
        const res = await axios.post(
          `https://chat-backend-knw6.onrender.com/api/user/send-friend-request`,
          { targetUserId: itemId, user },
          { withCredentials: true }
        );
        toast.success(res.data.message || 'Friend request sent!');
      } else {
        const res = await axios.post(
          `https://chat-backend-knw6.onrender.com/api/user/join-group`,
          { groupId: itemId,user },
          { withCredentials: true }
        );
        toast.success(res.data.message || 'Group join request sent!');
      }
    } catch (err) {
      console.error('Action failed:', err);
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto relative z-10">
      <div className="flex gap-2 p-4 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 rounded-xl shadow-md text-white">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="w-36 px-3 py-2 bg-slate-900 border border-slate-600 text-white rounded-md"
        >
          <option value="user">🔍 Users</option>
          <option value="group">👥 Groups</option>
        </select>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${searchType}s...`}
          className="flex-1 px-4 py-2 bg-slate-900 border border-slate-600 text-white rounded-md"
        />
      </div>

      {/* Animated Dropdown */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            key="dropdown"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute w-full mt-1 bg-slate-900 border border-slate-700 rounded-md max-h-72 overflow-y-auto p-3 shadow-xl space-y-2"
          >
            {loading ? (
              <div className="space-y-3 animate-pulse">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-6 bg-slate-700 rounded w-3/4 mx-auto"></div>
                ))}
              </div>
            ) : results.length > 0 ? (
              results.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between px-3 py-2 bg-slate-800 rounded hover:bg-slate-700 transition"
                >
                  <span className="text-white text-sm">
                    {searchType === 'user' ? item.username : item.groupName}
                  </span>
                  <button
                    onClick={() => handleAction(item._id)}
                    className="px-3 py-1 text-xs font-semibold rounded bg-indigo-600 hover:bg-indigo-700 text-white transition"
                  >
                    {searchType === 'user' ? 'Add Friend' : 'Join Group'}
                  </button>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-sm text-gray-400 italic">No {searchType}s found.</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SearcUserGroup;
