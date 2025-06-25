import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuthStore } from '../context/authContext';


function CreateGroupForm({ onClose }) {
  const [groupData, setGroupData] = useState({
    groupName: '',
    visibility: 'public',
    description: '',
    allowMedia: true,
    allowMentions: true,
    avatar: '',
  });
  const{user}=useAuthStore();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setGroupData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAvatarUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    setGroupData((prev) => ({
      ...prev,
      avatarFile: file, // store File object for FormData
      avatar: URL.createObjectURL(file), // for preview
    }));
  }
};


 const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();

  formData.append('groupName', groupData.groupName);
  formData.append('description', groupData.description);
  formData.append('isPrivate', groupData.visibility === 'private');
  formData.append('allowMedia', groupData.allowMedia);
  formData.append('allowMentions', groupData.allowMentions);
  formData.append('userId',user._id );
  if (groupData.avatarFile) {
    formData.append('avatar', groupData.avatarFile); // append the actual File
  }

  try {
    console.log('Submitting to:', 'https://chat-backend-knw6.onrender.com/api/user/create-group');

    const res = await axios.post('https://chat-backend-knw6.onrender.com/api/user/create-group', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true,
    });
    toast.success('✅ Group created successfully!');
    onClose();
  } catch (error) {
    const msg = error.response?.data?.message || 'Something went wrong!';
    toast.error(`❌ ${msg}`);
  }
};




  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      >
        <motion.form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 shadow-xl text-white space-y-4 relative"
        >
          {/* Close Icon */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 text-white hover:text-red-400 transition"
          >
            <X size={20} />
          </button>

          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
            Create New Group
          </h2>

          {/* Avatar Upload */}
          <div>
            <label className="block text-sm mb-1">Group Avatar (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="w-full text-sm text-white"
            />
            {groupData.avatar && (
              <img
                src={groupData.avatar}
                alt="preview"
                className="mt-2 w-20 h-20 object-cover rounded-full border border-white/20"
              />
            )}
          </div>

          {/* Group Name */}
          <input
            type="text"
            name="groupName"
            placeholder="Group Name"
            value={groupData.groupName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded bg-gray-900/60 border border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          {/* Visibility */}
          <div className="flex gap-4 items-center">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="visibility"
                value="public"
                checked={groupData.visibility === 'public'}
                onChange={handleChange}
                className="accent-indigo-500"
              />
              Public
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="visibility"
                value="private"
                checked={groupData.visibility === 'private'}
                onChange={handleChange}
                className="accent-indigo-500"
              />
              Private
            </label>
          </div>

          {/* Description */}
          <textarea
            name="description"
            rows="3"
            placeholder="Group Description"
            value={groupData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-900/60 border border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
          />

          {/* Toggles */}
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="allowMedia"
                checked={groupData.allowMedia}
                onChange={handleChange}
                className="accent-indigo-500"
              />
              Allow Media Sharing
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="allowMentions"
                checked={groupData.allowMentions}
                onChange={handleChange}
                className="accent-indigo-500"
              />
              Allow @Mentions
            </label>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileTap={{ scale: 0.95 }}
            className="w-full py-2 rounded bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 font-semibold shadow-md"
          >
            Create Group
          </motion.button>
        </motion.form>
      </motion.div>
    </AnimatePresence>
  );
}

export default CreateGroupForm;
