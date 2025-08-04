import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuthenticated, selectUser, selectToken, selectIsLoading } from '../store/features/user.reducer.js';
import { isUserLoggedIn } from '../store/features/user.actions.js';
import { useEffect, useState } from 'react';

// Hook to check if user is authenticated
export const useAuth = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const isLoading = useSelector(selectIsLoading);
  const [initialCheck, setInitialCheck] = useState(false);

  useEffect(() => {
    // Only check authentication status if we have a token and haven't done the initial check
    if (token && !initialCheck) {
      dispatch(isUserLoggedIn())
        .finally(() => {
          setInitialCheck(true);
        });
    } else if (!token) {
      // If no token, mark initial check as complete
      setInitialCheck(true);
    }
  }, [dispatch, token, initialCheck]);

  return {
    isAuthenticated,
    user,
    token,
    isGuest: !isAuthenticated,
    isLoading: isLoading || !initialCheck, // Show loading until initial check is complete
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
