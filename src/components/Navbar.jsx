import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuthStore } from '../context/authContext';

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [friendRequests, setFriendRequests] = useState([]);
  const [groupRequests, setGroupRequests] = useState([]);
  const dropdownRef = useRef(null);
  const { user } = useAuthStore();

  useEffect(() => {
    if (dropdownOpen) {
      axios.post('https://chat-backend-knw6.onrender.com/api/user/get-friend-requests', { user }, { withCredentials: true })
        .then(res => setFriendRequests(res.data))
        .catch(err => toast.error('Failed to load friend requests'));

      axios.post('https://chat-backend-knw6.onrender.com/api/user/get-group-requests', { user }, { withCredentials: true })
        .then(res => setGroupRequests(res.data))
        .catch(err => toast.error('Failed to load group requests'));
    }
  }, [dropdownOpen]);

  const handleAccept = async (senderId) => {
    try {
      const res = await axios.post('https://chat-backend-knw6.onrender.com/api/user/accept', {
        senderId,
        user,
      }, { withCredentials: true });
      toast.success(res.data.message);
      setFriendRequests(prev => prev.filter(r => r._id !== senderId));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to accept');
    }
  };

  const handleAcceptGroupRequest = async (groupId, userId) => {
    try {
      await axios.post(
        "https://chat-backend-knw6.onrender.com/api/user/accept-group-request",
        { groupId, userId, adminId: user._id },
        { withCredentials: true }
      );
      toast.success("User added to group");
      setGroupRequests(prev => prev.filter(r => r._id !== userId));
    } catch (err) {
      toast.error(err.response?.data?.message || "Error accepting user");
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 shadow-lg select-none relative">
        <h1 className="text-white font-bold text-xl tracking-wide">Chatify</h1>

        <div className="flex gap-4 items-center">
          <button
            onClick={() => setDropdownOpen(prev => !prev)}
            className="relative text-white bg-transparent border border-white px-4 py-2 rounded-md hover:bg-white hover:text-black transition shadow-[0_0_10px_2px_white] hover:shadow-[0_0_15px_4px_white]"
            style={{ boxShadow: '0 0 8px 2px rgba(255, 255, 255, 0.7)' }}
          >
            Inbox
            {friendRequests.length > 0 && (
              <span className="ml-2 px-2 py-0.5 text-xs bg-red-600 rounded-full">
                {friendRequests.length}
              </span>
            )}
          </button>

          <Link to="/dashboard">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="relative px-5 py-2 text-white font-semibold rounded-md bg-transparent border border-white
              hover:bg-white hover:text-gray-900 transition-colors duration-300
              shadow-[0_0_10px_2px_white] hover:shadow-[0_0_15px_4px_white]"
              style={{ boxShadow: '0 0 8px 2px rgba(255, 255, 255, 0.7)' }}
              aria-label="Dashboard button"
            >
              Dashboard
              <span
                className="absolute inset-0 rounded-md"
                style={{
                  boxShadow: '0 0 15px 4px rgba(255, 255, 255, 0.5)',
                  animation: 'pulseGlow 2.5s infinite',
                  zIndex: -1,
                }}
              />
            </motion.button>
          </Link>
        </div>

        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              ref={dropdownRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-6 top-16 w-72 bg-gray-800/30 border border-gray-500 rounded-md shadow-lg z-50 backdrop-blur-md backdrop-saturate-150"
            >
              <div className="p-3">
                <h2 className="text-white font-semibold text-sm mb-2">Friend Requests</h2>
                {friendRequests.length === 0 ? (
                  <p className="text-sm text-gray-400">No new requests</p>
                ) : (
                  friendRequests.map((fr) => (
                    <div key={fr._id} className="flex justify-between items-center bg-gray-700 p-2 rounded mt-2">
                      <span className="text-white text-sm">{fr.username}</span>
                      <button
                        onClick={() => handleAccept(fr._id)}
                        className="text-xs px-2 py-1 rounded bg-green-600 hover:bg-green-700 text-white"
                      >
                        Accept
                      </button>
                    </div>
                  ))
                )}

                {groupRequests.length > 0 && (
                  <>
                    <h2 className="text-white font-semibold text-sm mt-4 mb-2">Group Join Requests</h2>
                    {groupRequests.map((req) => (
                      <div key={req._id} className="flex items-center justify-between px-3 py-2 bg-slate-800 rounded mb-2">
                        <span className="text-white text-sm">
                          {req.username} wants to join <strong>{req.groupName}</strong>
                        </span>
                        <button
                          className="bg-green-600 text-white px-2 py-1 rounded text-sm"
                          onClick={() => handleAcceptGroupRequest(req.groupId, req._id)}
                        >
                          Accept
                        </button>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <ToastContainer
        limit={1}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <style jsx>{`
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.7); }
          50% { box-shadow: 0 0 20px 5px rgba(255, 255, 255, 1); }
          100% { box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.7); }
        }
      `}</style>
    </>
  );
}

export default Navbar;
