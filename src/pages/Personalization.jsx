import React, { useState } from 'react';
import { gradients, fonts, textSizes } from '../utils/personalization';
import { useAuthStore } from '../context/authContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Personalization() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [theme, setTheme] = useState(user?.theme || '');
  const [font, setFont] = useState(user?.font || '');
  const [textSize, setTextSize] = useState(user?.textSize || '');
  const [soundEnabled, setSoundEnabled] = useState(user?.soundEnabled ?? true);
  const [backgroundImage, setBackgroundImage] = useState(user?.backgroundImage || null);
  const [loading, setLoading] = useState(false); // ✅ loader state

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackgroundImage(file);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('theme', theme);
      formData.append('font', font);
      formData.append('textSize', textSize);
      formData.append('soundEnabled', soundEnabled);
      formData.append('user', user.email);
      if (backgroundImage) {
        formData.append('file', backgroundImage);
      }

      const res = await axios.post('http://localhost:5000/api/user/preferences', formData, {
        withCredentials: true,
      });

      alert("✅ Preferences saved successfully!");
      console.log("Response:", res.data);
      toast.success('✅ Preferences saved!');
    } catch (err) {
      toast.error('❌ Failed to save preferences.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 relative">
      {/* Go Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="w-full sm:w-[8rem] py-3 mt-2 rounded-md text-black font-semibold bg-white bg-opacity-10 hover:bg-opacity-20 shadow-lg transition-all duration-200 border border-white relative
                   before:absolute before:inset-0 before:rounded-md before:shadow-[0_0_20px_2px_white] before:opacity-0 hover:before:opacity-100 before:transition-opacity"
      >
        ← Go Back
      </button>

      <h1 className="text-3xl font-bold my-6 text-center">🎨 Personalize Your Experience</h1>

      {/* Theme Selection */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Choose Theme</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {gradients.map((g) => (
            <div
              key={g.id}
              onClick={() => setTheme(g.value)}
              className={`p-4 rounded-lg cursor-pointer shadow-md text-center transition-all ${
                theme === g.value ? 'ring-2 ring-white' : ''
              } bg-gradient-to-r ${g.value}`}
            >
              {g.label}
            </div>
          ))}
        </div>
      </div>

      {/* Font Selection */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Choose Font</h2>
        <div className="flex flex-wrap gap-3">
          {fonts.map((f) => (
            <button
              key={f.id}
              onClick={() => setFont(f.value)}
              className={`px-4 py-2 rounded border ${
                font === f.value ? 'bg-white text-black font-bold' : 'border-gray-500'
              } ${f.value}`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Text Size */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Text Size</h2>
        <div className="flex flex-wrap gap-3">
          {textSizes.map((s) => (
            <button
              key={s.id}
              onClick={() => setTextSize(s.value)}
              className={`px-4 py-2 rounded border ${
                textSize === s.value ? 'bg-white text-black font-bold' : 'border-gray-500'
              } ${s.value}`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sound Toggle */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Sound</h2>
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={soundEnabled}
            onChange={(e) => setSoundEnabled(e.target.checked)}
          />
          Enable message send/receive sound
        </label>
      </div>

      {/* Background Image */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Chat Background Image</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="text-sm"
        />
        {backgroundImage && typeof backgroundImage !== 'string' && (
          <img
            src={URL.createObjectURL(backgroundImage)}
            alt="Chat background preview"
            className="mt-3 max-w-xs rounded border"
          />
        )}
        {typeof backgroundImage === 'string' && (
          <img
            src={backgroundImage}
            alt="Chat background preview"
            className="mt-3 max-w-xs rounded border"
          />
        )}
      </div>

      {/* Save Button or Loader */}
      <div className="flex justify-center">
        {loading ? (
          <div className="mt-4">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <button
            onClick={handleSave}
            className="w-full sm:w-[20vw] py-3 mt-2 rounded-md text-black font-semibold bg-white bg-opacity-10 hover:bg-opacity-20 shadow-lg transition-all duration-200 border border-white relative
                       before:absolute before:inset-0 before:rounded-md before:shadow-[0_0_20px_2px_white] before:opacity-0 hover:before:opacity-100 before:transition-opacity"
          >
            💾 Save Preferences
          </button>
        )}
      </div>
    </div>
  );
}

export default Personalization;
