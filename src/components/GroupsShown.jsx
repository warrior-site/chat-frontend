import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useAuthStore } from '../context/authContext';
import { Link } from 'react-router-dom';

function GroupsShown() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore()

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await axios.post('https://chat-backend-knw6.onrender.com/api/user/groups', { user }); // ✅ Replace with your endpoint
        setGroups(res.data);
        console.log(groups)
      } catch (err) {
        console.error('Failed to fetch groups:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  return (
    <div className="w-full max-w-md mx-auto p-4 rounded-xl bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 shadow-xl text-white">
      <h2 className="text-xl font-semibold mb-4">👥 Your Groups</h2>
      <div className="space-y-3">
        {loading
          ? [...Array(5)].map((_, i) => (
            <div key={i} className="h-6 w-3/4 bg-slate-600 rounded animate-pulse"></div>
          ))
          : groups.map((group, index) => (
            <Link to={`/chat/group/${group._id}`} key={group._id}>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3 px-4 py-2 bg-slate-700 rounded-md hover:bg-slate-600 transition cursor-pointer"
              >
                <img
                  src={group.avatar}
                  alt={group.groupName}
                  className="w-8 h-8 rounded-full object-cover border border-white"
                />
                <span className="text-white text-sm">{group.groupName}</span>
              </motion.div>
            </Link>
          ))
        }
      </div>
    </div>
  );
}

export default GroupsShown;
