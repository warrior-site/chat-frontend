import React from 'react';
import { motion } from 'framer-motion';
import { ToastContainer, toast, Slide } from 'react-toastify';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';

function Navbar() {


  const handleLoginClick = () => {
    toast.info('Our Team Working so hard to get this feature available even without sleeping', {
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
          Chatify
        </h1>
        <div className="flex gap-4 items-center">
        <Link to="/dashboard">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleLoginClick}
            className="relative px-5 py-2 text-white font-semibold rounded-md bg-transparent border border-white
              hover:bg-white hover:text-gray-900 transition-colors duration-300
              shadow-[0_0_10px_2px_white] hover:shadow-[0_0_15px_4px_white]"
            style={{
              boxShadow: '0 0 8px 2px rgba(255, 255, 255, 0.7)',
            }}
            aria-label="Login button"
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



        {/* <Link to="/signup">
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="relative px-5 py-2 text-white font-semibold rounded-md bg-transparent border border-white
                hover:bg-white hover:text-gray-900 transition-colors duration-300
                shadow-[0_0_10px_2px_white] hover:shadow-[0_0_15px_4px_white]"
                style={{
                  boxShadow: '0 0 8px 2px rgba(255, 255, 255, 0.7)',
                }}
                aria-label="Signup button"
              >
                Signup
                <span
                  className="absolute inset-0 rounded-md"
                  style={{
                    boxShadow: '0 0 15px 4px rgba(255, 255, 255, 0.5)',
                    animation: 'pulseGlow 2.5s infinite',
                    zIndex: -1,
                  }}
                />
              </motion.button>
            </Link> */}
      </div>

    </nav >

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
