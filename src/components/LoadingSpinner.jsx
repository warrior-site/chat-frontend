import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-black">
      <motion.div
        className="w-16 h-16 border-4 border-t-transparent border-white rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        style={{
          background: 'linear-gradient(45deg, #6b46c1, #805ad5, #d53f8c)',
          WebkitMask: 'radial-gradient(circle, black 60%, transparent 61%)',
          mask: 'radial-gradient(circle, black 60%, transparent 61%)',
        }}
      />
    </div>
  );
};

export default LoadingSpinner;
