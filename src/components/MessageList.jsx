import React, { useState, useRef } from 'react';
import Picker from 'emoji-picker-react';
import { useSocket } from '../context/SocketContext';
import { useAuthStore } from '../context/authContext';

function MessageList({ messages }) {
  const socket = useSocket();
  const { user } = useAuthStore();
  const [pickerIndex, setPickerIndex] = useState(null);
  const pickerRef = useRef();

  const handleEmojiClick = (emojiData, messageId) => {
    console.log('🔥 Sending reaction', messageId, emojiData.emoji);
    socket.emit('message-reaction', {
      messageId,
      emoji: emojiData.emoji,
      userId: user._id,
    });
    setPickerIndex(null);
  };

  return (
    <div className="space-y-4 py-6">
      {messages.map((msg, index) =>
        msg.system ? (
          <div
            key={msg._id || index}
            className="w-full flex justify-center my-4"
          >
            <span className="px-4 py-2 text-sm font-medium text-white bg-white/10 backdrop-blur-lg rounded-full shadow-md border border-white/20 ring-1 ring-white/10 hover:scale-105 transition-all duration-300">
              {msg.text}
            </span>
          </div>

        ) : (
          <div
            key={msg._id}
            className="relative group max-w-xl bg-gray-800 text-white p-3 rounded-xl shadow-md"
          >
            <p className="text-sm font-semibold mb-1">{msg.sender}</p>
            <p>{msg.text}</p>

            {/* Reactions with counts */}
            {msg.reactions && msg.reactions.length > 0 && (
              <div className="flex gap-2 mt-2 flex-wrap">
                {msg.reactions.map((reaction, i) => (
                  <span
                    key={i}
                    className="bg-gray-700 text-white text-sm px-2 py-1 rounded-full flex items-center gap-1"
                  >
                    <span>{reaction.emoji}</span>
                    <span>{reaction.users.length}</span>
                  </span>
                ))}
              </div>
            )}

            {/* Emoji Button */}
            <button
              className="absolute top-1 right-1 hidden group-hover:flex text-xs bg-yellow-400 text-black p-1 rounded-full shadow"
              onClick={() => setPickerIndex(index)}
            >
              🙂
            </button>

            {/* Emoji Picker */}
            {pickerIndex === index && (
              <div className="absolute z-10 top-10 right-0" ref={pickerRef}>
                <Picker
                  onEmojiClick={(emoji) => handleEmojiClick(emoji, msg._id)}
                />
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
}

export default MessageList;
