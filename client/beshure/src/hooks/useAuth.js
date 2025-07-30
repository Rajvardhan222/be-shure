import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUser, selectToken } from '../store/features/user.reducer.js';

// Hook to check if user is authenticated
export const useAuth = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  return {
    isAuthenticated,
    user,
    token,
    isGuest: !isAuthenticated,
  };
};

// Hook to get user data
export const useUser = () => {
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return {
    user,
    isLoggedIn: isAuthenticated,
  };
};
