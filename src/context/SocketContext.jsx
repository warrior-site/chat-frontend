// context/SocketContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // ⛔ Avoid https in development
    const SOCKET_URL ="https://chat-backend-knw6.onrender.com"

    const newSocket = io(SOCKET_URL, {
      transports: ['websocket'],
      withCredentials: true,
    });

    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
