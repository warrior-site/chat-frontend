import React, { useState, useEffect, useRef } from 'react';
import { useSocket } from '../context/SocketContext';
import Navbar from '../components/Navbar';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import UserBadge from '../components/UserBadge';
import AIChat from '../components/AIChat';
import '../index.css';
import { useAuthStore } from '../context/authContext';
import { useParams } from 'react-router-dom';

function ChatRoom() {
  const socket = useSocket();
  const { user } = useAuthStore();
  const name = user?.username;
  const userId = user?._id;
  const { chatType, targetId } = useParams();

  const sendSoundRef = useRef(null);
  const receiveSoundRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAI, setShowAI] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState('');
  const [chatInfo, setChatInfo] = useState(null);

  const theme = user?.theme || 'from-gray-900 via-gray-800 to-black';
  const font = user?.font || '';
  const textSize = user?.textSize || '';
  const backgroundImage = user?.chatBackgroundImage;

  useEffect(() => {
    sendSoundRef.current = new Audio('/sounds/send.mp3');
    receiveSoundRef.current = new Audio('/sounds/receive.mp3');
  }, []);

  useEffect(() => {
    console.log('💡 Debug: userId, chatType, targetId =>', userId, chatType, targetId);

    if (!socket || !userId || !chatType || !targetId) return;

    const fetchMessages = async () => {
      try {
        const res = await fetch('https://chat-backend-knw6.onrender.com/api/messages/fetch', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, chatType, targetId }),
        });

        const data = await res.json();
        const formatted = data.map((msg) => ({
          _id: msg._id,
          text: msg.content,
          userName: msg.sender?.username || 'Unknown', 
          timestamp: msg.timestamp,
          system: false,
          delivered: true,
          reactions: msg.reactions || [],
        }));

        setMessages(formatted);
      } catch (err) {
        console.error('❌ Failed to fetch messages:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    const fetchChatInfo = async () => {
      try {
        const res = await fetch(`https://chat-backend-knw6.onrender.com/api/user/chat-info/${chatType}/${targetId}`);
        const data = await res.json();
        setChatInfo(data);
      } catch (err) {
        console.error('❌ Failed to load chat info:', err);
      }
    };

    if (socket && userId && targetId && chatType) {
      socket.emit('join-room', { chatType, roomId: targetId });

      fetchMessages();
      fetchChatInfo();

      socket.on('chat-message', (msg) => {
        const isFriendMsg =
          chatType === 'friend' &&
          ((msg.sender === targetId && msg.receiver === userId) ||
            (msg.sender === userId && msg.receiver === targetId));

        const isGroupMsg = chatType === 'group' && msg.group === targetId;

        if (isFriendMsg || isGroupMsg) {
          receiveSoundRef.current?.play();
          setMessages((prev) => [...prev, { ...msg, system: false, delivered: true }]);
        }
      });

      socket.on('delivered', (msg) => {
        setMessages((prev) =>
          prev.map((m) =>
            m.timestamp === msg.timestamp && m.sender === msg.sender
              ? { ...m, delivered: true }
              : m
          )
        );
      });

      socket.on('user-joined', (username) => {
        setMessages((prev) => [
          ...prev,
          {
            system: true,
            sender: '',
            text: `${username} joined the chat.`,
            timestamp: new Date().toISOString(),
          },
        ]);
      });

      socket.on('typing', (username) => {
        if (username !== user?.username) {
          setTypingUser(username);
          setIsTyping(true);
        }
      });

      socket.on('stop-typing', () => {
        setIsTyping(false);
        setTypingUser('');
      });

      socket.on('reaction-updated', ({ messageId, reactions }) => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg._id === messageId ? { ...msg, reactions } : msg
          )
        );
      });
    }

    return () => {
      socket?.off('chat-message');
      socket?.off('user-joined');
      socket?.off('typing');
      socket?.off('stop-typing');
      socket?.off('delivered');
      socket?.off('reaction-updated');
    };
  }, [socket, userId, chatType, targetId, user?.username]);
  //simone steele
  const sendMessage = (text) => {
    const msg = {
      sender: userId,
      userName:name,
      text,
      timestamp: new Date().toISOString(),
      delivered: false,
      chatType, // "friend" or "group"
      targetId,
    };


    if (chatType === 'friend') {
      msg.receiver = targetId;
    } else if (chatType === 'group') {
      msg.group = targetId;
    }

    sendSoundRef.current?.play();
    socket.emit('chat-message', msg);
  };

  return (
    <div
      className={`flex flex-col min-h-screen text-white overflow-x-hidden ${font} ${textSize}`}
      style={
        backgroundImage
          ? {
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }
          : {
            backgroundImage: 'linear-gradient(to bottom right, #1f2937, #111827)',
          }
      }
    >
      <Navbar />

      <div className={`flex justify-between items-center px-4 py-2 border-gray-700 ${backgroundImage ? 'bg-opacity-80 bg-black/30 backdrop-blur-lg' : 'bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0b1120] animated-gradient'}`}>
        <UserBadge
          username={chatInfo?.type === 'group' ? chatInfo?.groupName : chatInfo?.username}
          profilePicture={chatInfo?.type === 'group' ? chatInfo?.avatar : chatInfo?.profilePicture}
        />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="chat-mid flex-1 overflow-y-auto max-h-[calc(100vh-180px)] px-4 sm:px-6 md:px-8 backdrop-blur-lg bg-black/20 rounded-2xl shadow-inner border border-white/10">
          {loading ? (
            <div className="space-y-4 py-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-3/4 max-w-sm bg-white/10 backdrop-blur-md rounded-lg p-4 animate-pulse shadow-md"
                >
                  <div className="h-4 bg-white/30 rounded w-1/3 mb-2"></div>
                  <div className="h-3 bg-white/20 rounded w-full mb-1"></div>
                  <div className="h-3 bg-white/20 rounded w-5/6"></div>
                </div>
              ))}
            </div>
          ) : (
            <MessageList messages={messages} />
          )}
        </div>

        {showAI && (
          <div className="h-[calc(100vh-180px)] w-full sm:w-[350px] md:w-[400px] flex flex-col border-l border-gray-800 bg-black bg-opacity-70 backdrop-blur-md">
            <AIChat />
          </div>
        )}
      </div>

      <div className={`px-4 py-3 border-gray-700 ${backgroundImage ? 'bg-opacity-80 bg-black/30 backdrop-blur-lg' : 'bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0b1120] animated-gradient'}`}>
        {isTyping && (
          <div className="flex items-center gap-2 px-4 pb-1">
            <div className="flex items-center space-x-1">
              <span className="text-sm text-purple-300 font-medium">
                {typingUser} is typing
              </span>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>
        )}

        <MessageInput onSend={sendMessage} toggleAI={() => setShowAI((prev) => !prev)} />
      </div>
    </div>
  );
}

export default ChatRoom;
