import React from 'react';

function UserBadge({ username }) {
  return (
    <div className="bg-gray-800 text-sm px-3 py-1 rounded-full">
      Logged in as: <strong>{username}</strong>
    </div>
  );
}

export default UserBadge;
