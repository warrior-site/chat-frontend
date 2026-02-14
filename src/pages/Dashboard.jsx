import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { useAuthStore } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, isLoading, logout, verifyEmail } = useAuthStore();
  const [profilePic, setProfilePic] = useState(user?.profilePicture || '');
  const [file, setFile] = useState(null);
  const [language, setLanguage] = useState(user?.preferredLanguage || '');
  const [purpose, setPurpose] = useState(user?.usageReason || '');
  const [game, setGame] = useState(user?.game || '');
  const [isSaving, setIsSaving] = useState(false);
  const [code, setCode] = useState('');
  const navigate = useNavigate();
  const font = user?.font || '';
  const textSize = user?.textSize || '';

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error('Logout error:', error);
      alert('Logout failed. Please try again.');
    }
  };

  const handleImageUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSave = async () => {
    if (!user?.email) return alert("User email missing");

    const formData = new FormData();
    formData.append("email", user.email);
    formData.append("language", language);
    formData.append("usageReason", purpose);
    if (purpose === 'Gaming') formData.append("game", game);
    if (file) formData.append("file", file);

    setIsSaving(true);
    try {
      //https://chat-backend-knw6.onrender.com
      const res = await fetch("https://chat-backend-knw6.onrender.com/api/user/profile", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        toast.success('✅ Preferences saved!, we are working on language conversion and adding features according to usage purpose.');
        
        console.log("Response:", data);
      } else {
        throw new Error(data.message || "Update failed");
      }
    } catch (err) {
      console.error("Save error:", err);
      toast.error('❌ Failed to save preferences.');

    } finally {
      setIsSaving(false);
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  const codeHandle = async () => {
    toast.info("Email us at warhkcc@gmail.com to get verified");
  }
  const verifyHandle = async (e) => {
    e.preventDefault();
    if (code.length !== 6) {
      alert('Please enter a valid 6-digit code');
      return;
    }

    try {
      await verifyEmail(code);
      toast.success('Email verified successfully!, Refresh and Relogin ');
      navigate('/dashboard'); // Redirect to dashboard on success
    } catch (err) {
      console.error('Verification failed:', err);
    }
  };

  return (
    <div className={`min-h-screen flex  ${font} ${textSize} items-center justify-center bg-gradient-to-br from-[#1e1e2f] via-[#2c2c54] to-[#0f0f1c] text-white px-4`}>
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
            style={{ backgroundColor: '#2b2c3b', borderRadius: '0.375rem', padding: '0.5rem', textAlign: "center" }}
          />
        </div>

        <div className="mt-8 space-y-4">
          <InfoBox label="👤 Username" value={user?.username} />
          <InfoBox label="📧 Gmail" value={user?.email} />
          <InfoBox
            label="✅ Status"
            value={user?.isVerified ? (
              <span className="text-green-400">Verified</span>
            ) : (
              <>
                <span className="text-red-400">Unverified</span>
                <span className=" flex-row justify-between flex flex-wrap">
                  <span >
                    <span className='flex flex-row gap-x-2'>
                      <input
                        type="text"
                        maxLength="6"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full text-center  tracking-widest p-1 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter 6-digit code"
                      />
                      <button onClick={(e) => verifyHandle(e)}
                        className="text-blue-400 underline">Verify</button>
                    </span>
                  </span>
                  <button onClick={() => codeHandle()}
                    className="text-blue-400 underline">Get Code</button>
                </span>
              </>

            )}
          />
          <InfoBox
            label="📆 Member Since"
            value={new Date(user?.createdAt).toLocaleDateString()}
          />

          {/* Language */}
          <SelectBox label="🌐 Preferred Language" value={language} onChange={setLanguage} options={["English", "Hindi", "Spanish", "Tamil"]} />

          {/* Purpose */}
          <SelectBox label="🎯 Purpose" value={purpose} onChange={setPurpose} options={["Normal Use", "Gaming"]} />

          {/* Game (Conditional) */}
          {purpose === 'Gaming' && (
            <SelectBox label="🎮 Choose Game" value={game} onChange={setGame} options={["BGMI", "Free Fire", "Clash Royale", "Clash of Clans"]} />
          )}
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-1/2 py-3 mt-2 rounded-md text-black font-semibold bg-white bg-opacity-10 hover:bg-opacity-20 shadow-lg transition-all duration-200 border border-white relative
                     before:absolute before:inset-0 before:rounded-md before:shadow-[0_0_20px_2px_white] before:opacity-0 hover:before:opacity-100 before:transition-opacity"
          >
            {isSaving ? (
              <span className="flex justify-center items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Saving...
              </span>
            ) : (
              "💾 Save Preferences"
            )}
          </button>
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => navigate('/Personalization')}
            className="w-1/2 py-3 mt-2 rounded-md text-black font-semibold bg-white bg-opacity-10 hover:bg-opacity-20 shadow-lg transition-all duration-200 border border-white relative
                     before:absolute before:inset-0 before:rounded-md before:shadow-[0_0_20px_2px_white] before:opacity-0 hover:before:opacity-100 before:transition-opacity"
          >
            Personalization
          </button>
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={() => navigate('/')}
            className="w-1/2 py-3 mt-2 rounded-md text-black font-semibold bg-white bg-opacity-10 hover:bg-opacity-20 shadow-lg transition-all duration-200 border border-white relative
                     before:absolute before:inset-0 before:rounded-md before:shadow-[0_0_20px_2px_white] before:opacity-0 hover:before:opacity-100 before:transition-opacity"
          >
            🏠 Go to Home Page
          </button>
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className="w-1/2 py-3 mt-2 rounded-md text-black font-semibold bg-white bg-opacity-10 hover:bg-opacity-20 shadow-lg transition-all duration-200 border border-white relative
                     before:absolute before:inset-0 before:rounded-md before:shadow-[0_0_20px_2px_white] before:opacity-0 hover:before:opacity-100 before:transition-opacity"
          >
            {isLoading ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const InfoBox = ({ label, value }) => (
  <motion.div className="bg-[#1f1f2e] rounded-lg px-6 py-4 shadow-md">
    <strong>{label}:</strong> {value}
  </motion.div>
);

const SelectBox = ({ label, value, onChange, options }) => (
  <motion.div className="bg-[#1f1f2e] rounded-lg px-6 py-4 shadow-md">
    <label className="block text-sm mb-2 font-semibold">{label}</label>
    <select
      className="w-full p-2 rounded bg-[#2b2c3b] text-white"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Select</option>
      {options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </motion.div>
);

export default Dashboard;
