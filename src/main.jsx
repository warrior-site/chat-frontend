import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { SocketProvider } from './context/SocketContext'
import { UserProvider } from './context/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <UserProvider>
<BrowserRouter>
  <SocketProvider>
     <StrictMode>
    
    <App />
   
    
  </StrictMode>
  </SocketProvider>
  
  </BrowserRouter>

  </UserProvider>
  
 
)
