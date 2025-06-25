import React from 'react';

function UserBadge({ username, profilePicture }) {
  return (
    <div className="flex items-center gap-2 bg-gray-800 text-sm px-3 py-1 rounded-full shadow-md">
      {profilePicture ? (
        <img
          src={profilePicture}
          alt={username}
          className="w-6 h-6 rounded-full object-cover"
        />
      ) : (
        <div className="w-6 h-6 rounded-full bg-gray-600 text-white flex items-center justify-center text-xs uppercase">
          {username?.[0] || '?'}
        </div>
      )}
      <span className="text-white font-medium truncate max-w-[120px]">{username}</span>
    </div>
  );
}

export default UserBadge;
