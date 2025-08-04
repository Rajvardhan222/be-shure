import { createSlice } from '@reduxjs/toolkit';
import { registerUser, loginUser, logoutUser, isUserLoggedIn } from './user.actions.js';

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  token: localStorage.getItem('accessToken') || null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
    
    // Update user profile
    updateUserProfile: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    
    // Set authentication status (for checking existing tokens)
    setAuthStatus: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user || null;
    },
    
    // Manual logout (clears state immediately)
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      state.error = null;
      state.isLoading = false;
      
      // Clear tokens from localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  },
  extraReducers: (builder) => {
    // Register user cases
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Login user cases
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("How action object looks like:", action);
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.data.user.id;
        state.error = null;
        
        // Handle tokens if they exist in the response
        if (action.payload.data.accessToken) {
          state.token = action.payload.data.accessToken;
          localStorage.setItem('accessToken', action.payload.data.accessToken);
        }
        if (action.payload.data.refreshToken) {
          localStorage.setItem('refreshToken', action.payload.data.refreshToken);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = action.payload;
      })
      
      // Logout user cases
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.token = null;
        state.error = null;
        state.isLoading = false;
        
        // Clear tokens from localStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      })

      .addCase(isUserLoggedIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(isUserLoggedIn.fulfilled, (state, action) => {
        console.log(action)
        state.isLoading = false;
        state.isAuthenticated = action.payload?.data?.isLoggedIn;
        state.user = action.payload.data.user || null;
        state.error = null;
      })
      .addCase(isUserLoggedIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = action.payload;
      });
}})



// Export actions
export const {
  clearError,
  updateUserProfile,
  setAuthStatus,
  logout,
} = userSlice.actions;

// Selectors
export const selectUser = (state) => state.user.user;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectIsLoading = (state) => state.user.isLoading;
export const selectError = (state) => state.user.error;
export const selectToken = (state) => state.user.token;

// Export reducer
export default userSlice.reducer;
