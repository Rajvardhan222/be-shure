import React from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { useDispatch } from 'react-redux';
import { logout } from '../store/features/user.reducer.js';

// Example component showing how to use Redux user state
function Navbar() {
  const { isAuthenticated, user } = useAuth();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Be Shure</h1>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <span>Welcome, {user?.name || user?.username || 'User'}!</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="space-x-2">
              <a href="/login" className="hover:underline">Login</a>
              <a href="/register" className="hover:underline">Register</a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
