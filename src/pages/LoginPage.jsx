import React, { useState } from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../context/authContext";

const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { isLoading, login } = useAuthStore();

  const handleFormLogin = async (e) => {
    e.preventDefault();

    try {
      await login(userId, password);
      toast.success("✅ Login successful");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message || "Login failed");
    }
  };

  // const handleGoogleLogin = () => {
  //   alert("Google login coming soon!");
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4">
      <ToastContainer />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm bg-gray-900 bg-opacity-80 rounded-lg p-8 shadow-xl"
      >
        <h2 className="text-white text-2xl font-bold text-center mb-6">
          Login to Continue
        </h2>

        <form onSubmit={handleFormLogin} className="space-y-5">
          <div>
            <label className="block text-gray-300 mb-1">User ID</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600"
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-purple-600 text-white rounded-md flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </motion.button>
        </form>

        <div className="mt-6 relative text-center text-gray-400">
          <span className="bg-gray-800 px-2 z-10 relative">OR</span>
          <hr className="absolute top-2 left-0 w-full border-gray-700" />
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleGoogleLogin}
          className="mt-6 w-full flex items-center justify-center py-2 bg-white text-gray-800 rounded-md"
        >
          <FcGoogle className="mr-2" />
          Login with Google
        </motion.button>

        <div className="text-center mt-6">
          <p className="text-white">
            Don't have an account?{" "}
            <Link to="/signup" className="underline">
              Signup
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
