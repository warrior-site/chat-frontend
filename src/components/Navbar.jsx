import React from 'react';
import { motion } from 'framer-motion';
import { ToastContainer, toast, Slide } from 'react-toastify';

function Navbar() {
  const handleLoginClick = () => {
    toast.info('Our Team Working so hard to get this feature avialable even without sleeping', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
      pauseOnHover: true,
      draggable: true,
      transition: Slide,
    });
  };

  return (
    <>
      <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 shadow-lg select-none">
        <h1 className="text-white font-bold text-xl tracking-wide">
          Chat App
        </h1>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleLoginClick}
          className="relative px-5 py-2 text-white font-semibold rounded-md bg-transparent border border-white
            hover:bg-white hover:text-gray-900 transition-colors duration-300
            shadow-[0_0_10px_2px_white] hover:shadow-[0_0_15px_4px_white]"
          style={{
            boxShadow:
              '0 0 8px 2px rgba(255, 255, 255, 0.7)', // subtle white glow
          }}
          aria-label="Login button"
        >
          Login
          {/* Glow pulse animation */}
          <span
            className="absolute inset-0 rounded-md"
            style={{
              boxShadow:
                '0 0 15px 4px rgba(255, 255, 255, 0.5)',
              animation: 'pulseGlow 2.5s infinite',
              zIndex: -1,
            }}
          />
        </motion.button>
      </nav>

      {/* Toast Container - place it once in your app, here for demo */}
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
          0% {
            box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.7);
          }
          50% {
            box-shadow: 0 0 20px 5px rgba(255, 255, 255, 1);
          }
          100% {
            box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.7);
          }
        }
      `}</style>
    </>
  );
}

export default Navbar;
