import React from 'react';
import { motion } from 'framer-motion';
import { Server } from 'lucide-react'; // optional: swap with any icon lib you prefer

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-gray-950 to-black text-white relative">
      {/* Animated Glowing Ring */}
      <motion.div
        className="absolute w-32 h-32 border-4 border-t-transparent border-purple-400 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
        style={{
          boxShadow: '0 0 20px 4px rgba(139, 92, 246, 0.6)',
          WebkitMask: 'radial-gradient(circle, black 60%, transparent 61%)',
          mask: 'radial-gradient(circle, black 60%, transparent 61%)',
        }}
      />

      {/* Server Icon with Pulse */}
      <motion.div
        className="z-10 p-4 rounded-full bg-black/50 backdrop-blur-md border border-purple-500"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.9, 1, 0.9],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: 'easeInOut',
        }}
      >
        <Server className="w-10 h-10 text-purple-400 drop-shadow-lg" />
        {/* You can also replace above icon with emoji: 🌐 or 🖥️ if needed */}
      </motion.div>

      {/* Connecting Text */}
      <motion.p
        className="mt-6 text-purple-300 font-semibold text-lg"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        Connecting to server...
      </motion.p>
    </div>
  );
};

export default LoadingSpinner;
