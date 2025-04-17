import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Login Thunk
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string; }, thunkAPI) => {
    try {
      const response = await axios.post('/api/login', credentials);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Invalid Credentials!');
    }
  }
);

// Signup Thunk
export const signup = createAsyncThunk(
  'auth/signup',
  async (userData: { email: string; password: string; }, thunkAPI) => {
    try {
      const response = await axios.post('/api/signup', userData);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'User registration failed!');
    }
  }
);
