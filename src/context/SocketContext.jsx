import { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const SocketContext = createContext(null)

export const useSocket = () => useContext(SocketContext)

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
  const newSocket = io('https://chat-backend-knw6.onrender.com', {
    transports: ['websocket'], // Optional: helps avoid long polling
  });
  setSocket(newSocket);

  return () => newSocket.disconnect();
}, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}
