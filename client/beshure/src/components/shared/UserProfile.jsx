import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectUser, 
  selectIsAuthenticated, 
  logout 
} from '../store/features/user.reducer.js';

function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="p-4 bg-gray-100 rounded-lg">
        <p className="text-gray-600">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      
      <div className="space-y-3">
        <div>
          <span className="font-semibold">Name: </span>
          <span>{user.name || user.fullname || user.username || 'N/A'}</span>
        </div>
        
        {user.email && (
          <div>
            <span className="font-semibold">Email: </span>
            <span>{user.email}</span>
          </div>
        )}
        
        {user.phone && (
          <div>
            <span className="font-semibold">Phone: </span>
            <span>{user.phone}</span>
          </div>
        )}
        
        <div>
          <span className="font-semibold">ID: </span>
          <span>{user.id}</span>
        </div>
      </div>
      
      <button
        onClick={handleLogout}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
      >
        Logout
      </button>
    </div>
  );
}

export default UserProfile;
