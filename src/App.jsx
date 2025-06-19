import React from 'react'
import HomePage from './pages/HomePage'
import ChatRoom from './pages/ChatRoom'
import 'react-toastify/dist/ReactToastify.css';
import Routing from './routes/Routing';
import { BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from './context/authContext';
import LoadingSpinner from './components/LoadingSpinner';

function App() {


const{ user, isAuthenticated, isCheckingAuth, checkAuth } = useAuthStore();


  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth) return <LoadingSpinner />;
  console.log("User:", user);
  console.log("isAuthenticated:", isAuthenticated);
  return (

    <Routing />


  )
}

export default App