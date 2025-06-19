import React, { useState } from 'react';
import { useAuthStore } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const [code, setCode] = useState('');
  const{isLoading,verifyEmail,error}= useAuthStore();
  const navigate = useNavigate();
  
  const handleClick = async (e) => {
    e.preventDefault();
    if (code.length !== 6) {
      alert('Please enter a valid 6-digit code');
      return;
    }
    
    try {
      await verifyEmail(code);
      navigate('/dashboard'); // Redirect to dashboard on success
    } catch (err) {
      console.error('Verification failed:', err);
    }
  }
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 p-4">
      <div className="bg-gray-900 text-white p-8 rounded-xl shadow-xl max-w-md w-full space-y-6">
        <h2 className="text-3xl font-bold text-center">Verify Your Email</h2>

        <input
          type="text"
          maxLength="6"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full text-center text-2xl tracking-widest p-3 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Enter 6-digit code"
        />

        <button
        onClick={handleClick}
          disabled={isLoading}
          className="w-full py-3 mt-2 rounded-md text-black font-semibold bg-white bg-opacity-10 hover:bg-opacity-20 shadow-lg transition-all duration-200 border border-white relative
                     before:absolute before:inset-0 before:rounded-md before:shadow-[0_0_20px_2px_white] before:opacity-0 hover:before:opacity-100 before:transition-opacity"
        >
          {isLoading ? 'Verifying...' : 'Verify'}
        </button>

        {error && (
          <p className="text-center mt-4 text-sm text-gray-300">{error}</p>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
