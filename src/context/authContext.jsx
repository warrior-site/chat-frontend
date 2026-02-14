import { create } from 'zustand';
import axios from 'axios';


// const API_URL = "https://chat-backend-knw6.onrender.com/api/auth"
 const API_URL = "https://chat-backend-knw6.onrender.com/api/auth"; // Use this for local development
axios.defaults.withCredentials = true; // Enable sending cookies with requests
export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message: null,
   signup: async (email, username, password) => {
  try {
    set({ isLoading: true, error: null });

    const response = await axios.post(`${API_URL}/signup`, {
      email,
      username,
      password,
    });

    set({
      user: response.data.newUser,
      isAuthenticated: true,
      isLoading: false,
      message: response.data.message,
    });

    return response.data; 
  } catch (error) {
    const msg =
      error.response?.data?.message ||
      error.message ||
      "Signup failed. Try again.";

    set({ error: msg, isLoading: false });

    throw new Error(msg); 
  }
},

    verifyEmail: async (code) => {
        try {
            set({ isLoading: true, error: null });
            const response = await axios.post(`${API_URL}/verify-email`, { code });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false, message: response.data.message });
            console.log('Email verification successful:', response.data);
        } catch (error) {
            set({ error: error.response?.data?.message || 'Email verification failed', isLoading: false });
        }
    },
    login: async (email, password) => {
  try {
    set({ isLoading: true, error: null });

    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

    set({
      user: response.data.user,
      isAuthenticated: true,
      isLoading: false,
      message: response.data.message,
    });

    return response.data; 
  } catch (error) {
    const msg =
      error.response?.data?.message ||
      error.message ||
      "Server error. Try again.";

    set({ error: msg, isLoading: false });

    throw new Error(msg); 
  }
},

    logout: async () => {
        try {
            set({ isLoading: true, error: null });
            await axios.post(`${API_URL}/logout`);
            set({ user: null, isAuthenticated: false, isLoading: false, message: 'Logged out successfully' });
            console.log('Logout successful');
        } catch (error) {
            set({ error: error.response?.data?.message || 'Logout failed', isLoading: false });
        }
    },
    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/check-auth`);
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
        } catch (error) {
            set({ error: null, isCheckingAuth: false, isAuthenticated: false });
        }
    },




}));
