import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../context/authContext';

function SignUp() {


  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLoading, signup } = useAuthStore();
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await signup(email, username, password);
      // setUsername('');
      // setEmail('');
      // setPassword('');
      navigate('/verify-email'); // Redirect to verify email page
    } catch (error) {
      console.error('Signup error:', error);
      // Handle error (e.g., show a notification)
      return;

    }


  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-sm bg-gray-900 bg-opacity-80 rounded-lg shadow-2xl p-8"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>

        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="text"
          placeholder="Username"
          className="w-full mb-4 px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 placeholder-gray-400"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 placeholder-gray-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 placeholder-gray-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isLoading &&

          (<div className="flex items-center justify-center mb-4">
            <svg
              className="animate-spin h-6 w-6 text-purple-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2.93 6.93A8.003 8.003 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3.93-1.008zM12 20a8.003 8.003 0 01-6.93-4.07l-3.93 1.008A11.95 11.95 0 0012 24v-4zm6.93-2.07A8.003 8.003 0 0120 12h4c0 3.042-1.135 5.824-3 7.938l-3.07-.938zM20 12a8.003 8.003 0 01-4.07-6.93l3.93-1.008A11.95 11.95 0 0024 12h-4z"
              ></path>
            </svg></div>)}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSignup}
          className="w-full py-3 text-white font-semibold bg-gradient-to-r from-purple-600 to-indigo-500 rounded-md shadow-md hover:shadow-lg transition-all duration-300"
          disabled={isLoading}
        >
          Create Account
        </motion.button>


        <div className="text-center mt-6">
      <p className="text-white text-lg font-semibold">
        Already have an account?{' '}
        <Link
          to="/login"
          className="underline text-white glow-text"
        >
          Login
        </Link>
      </p>
    </div>

      </motion.div>
    </div>
  );
};

export default SignUp