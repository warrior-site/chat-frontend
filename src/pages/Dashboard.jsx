import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { useAuthStore } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuthStore();
  const [profilePic, setProfilePic] = useState(user?.profilePicture);
  const [language, setLanguage] = useState('');
  const [purpose, setPurpose] = useState('');
  const [game, setGame] = useState('');
  const { isLoading, logout } = useAuthStore();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login"); // Redirect to home after logout
    } catch (error) {
      console.error('Logout error:', error);
      alert('Logout failed. Please try again.');
    }
  }




  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  console.log(user);
  const handleSave = () => {
    console.log({
      language,
      purpose,
      game: purpose === 'Gaming' ? game : null,
    });
    // TODO: Send preferences to backend
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1e1e2f] via-[#2c2c54] to-[#0f0f1c] text-white px-4">
      <motion.div
        className="w-full max-w-3xl bg-gradient-to-tr from-[#282a36] to-[#1e1e2f] p-8 rounded-xl shadow-2xl"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
          🌌 Welcome to Your Dashboard
        </h1>

        <div className="flex flex-col items-center gap-4">
          <img
            src={profilePic || 'https://api.dicebear.com/7.x/bottts-neutral/svg'}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-purple-600 shadow-lg"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="text-sm text-gray-300"
          />
        </div>

        <div className="mt-8 space-y-4">
          <motion.div className="bg-[#1f1f2e] rounded-lg px-6 py-4 shadow-md">
            <strong>👤 Username:</strong> {user?.username}
          </motion.div>

          <motion.div className="bg-[#1f1f2e] rounded-lg px-6 py-4 shadow-md">
            <strong>📧 Gmail:</strong> {user?.email}
          </motion.div>

          <motion.div className="bg-[#1f1f2e] rounded-lg px-6 py-4 shadow-md">
            <strong>✅ Status:</strong>{' '}
            {user?.isVerified ? (
              <span className="text-green-400">Verified</span>
            ) : (
              <span className="text-red-400">Unverified</span>
            )}
          </motion.div>

          <motion.div className="bg-[#1f1f2e] rounded-lg px-6 py-4 shadow-md">
            <strong>📆 Member Since:</strong>{' '}
            {new Date(user?.createdAt).toLocaleDateString()}
          </motion.div>

          {/* LANGUAGE SELECT */}
          <motion.div className="bg-[#1f1f2e] rounded-lg px-6 py-4 shadow-md">
            <label className="block text-sm mb-2 font-semibold">🌐 Preferred Language:</label>
            <select
              className="w-full p-2 rounded bg-[#2b2c3b] text-white"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="">Select Language</option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Spanish">Spanish</option>
              <option value="Tamil">Tamil</option>
            </select>
          </motion.div>

          {/* PURPOSE SELECT */}
          <motion.div className="bg-[#1f1f2e] rounded-lg px-6 py-4 shadow-md">
            <label className="block text-sm mb-2 font-semibold">🎯 Purpose:</label>
            <select
              className="w-full p-2 rounded bg-[#2b2c3b] text-white"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            >
              <option value="">Select Purpose</option>
              <option value="Normal Use">Normal Use</option>
              <option value="Gaming">Gaming</option>
            </select>
          </motion.div>

          {/* GAME SELECT (conditional) */}
          {purpose === 'Gaming' && (
            <motion.div className="bg-[#1f1f2e] rounded-lg px-6 py-4 shadow-md">
              <label className="block text-sm mb-2 font-semibold">🎮 Choose Game:</label>
              <select
                className="w-full p-2 rounded bg-[#2b2c3b] text-white"
                value={game}
                onChange={(e) => setGame(e.target.value)}
              >
                <option value="">Select Game</option>
                <option value="BGMI">BGMI</option>
                <option value="Free Fire">Free Fire</option>
                <option value="Clash Royale">Clash Royale</option>
                <option value="Clash of Clans">Clash of Clans</option>
              </select>
            </motion.div>
          )}
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleSave}
            className="w-1/2  py-3 mt-2 rounded-md text-black font-semibold bg-white bg-opacity-10 hover:bg-opacity-20 shadow-lg transition-all duration-200 border border-white relative
                     before:absolute before:inset-0 before:rounded-md before:shadow-[0_0_20px_2px_white] before:opacity-0 hover:before:opacity-100 before:transition-opacity"
          >
            💾 Save Preferences
          </button>
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={() => navigate('/')}
            className="w-1/2  py-3 mt-2 rounded-md text-black font-semibold bg-white bg-opacity-10 hover:bg-opacity-20 shadow-lg transition-all duration-200 border border-white relative
                     before:absolute before:inset-0 before:rounded-md before:shadow-[0_0_20px_2px_white] before:opacity-0 hover:before:opacity-100 before:transition-opacity"
          >
            🏠 Go to Home Page
          </button>
        </div>
        <div className="flex justify-center mt-4">


          <button
            onClick={handleLogout}
            disabled={isLoading}
            className="w-1/2  py-3 mt-2 rounded-md text-black font-semibold bg-white bg-opacity-10 hover:bg-opacity-20 shadow-lg transition-all duration-200 border border-white relative
                     before:absolute before:inset-0 before:rounded-md before:shadow-[0_0_20px_2px_white] before:opacity-0 hover:before:opacity-100 before:transition-opacity"
          >
            {isLoading ? 'loging out...' : 'logout'}
          </button>
        </div>

      </motion.div>

    </div>
  );
};

export default Dashboard;
