import { createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser as registerUserAPI, loginUser as loginUserAPI } from '../../api/user/user.api.js';

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  'user/register',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await registerUserAPI(username, password);
      
      if (response.error) {
        return rejectWithValue(response.error);
      }
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Registration failed');
    }
  }
);

// Async thunk for user login
export const loginUser = createAsyncThunk(
  'user/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await loginUserAPI(username, password);
      console.log('How response looks like inside thunk:', response);
      
      if (response.error) {
        return rejectWithValue(response.error);
      }
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

// Async thunk for logout (if you have a logout API)
export const logoutUser = createAsyncThunk(
  'user/logout',
  async () => {
    // If you have a logout API endpoint, call it here
    // await logoutUserAPI();
    return true;
  }
);
