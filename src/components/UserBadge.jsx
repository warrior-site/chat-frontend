import React from 'react';
import { useAuthStore } from '../context/authContext';

function UserBadge({ username }) {
  const {user}=useAuthStore()
  return (
    <div className="bg-gray-800 text-sm px-3 py-1 rounded-full">
      Logged in as: <strong> {user?.username}</strong>
    </div>
  );
}

export default UserBadge;
