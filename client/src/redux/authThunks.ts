import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

// login thunk
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string; }, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login/', credentials);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Invalid Credentials!');
    }
  }
);

// signup thunk
export const signup = createAsyncThunk(
  'auth/signup',
  async (credentials: { email: string; password: string; }, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup/', credentials);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'User registration failed!');
    }
  }
);

// delete user thunk
export const deleteUser = createAsyncThunk(
  'auth/deleteUser',
  async (credentials: { email: string; password: string; }, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/deleteUser/', credentials);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'User deletion failed!');
    }
  }
)

// search user
export const searchUser = createAsyncThunk(
  'auth/searchUser',
  async (email: string, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/searchUser/', {email});
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'User not found!');
    }
  }
)

// change password thunk
export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (credentials: { email: string; password: string; }, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/changePassword/', credentials);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Password update failed!');
    }
  }
)