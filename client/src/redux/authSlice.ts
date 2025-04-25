import { createSlice } from '@reduxjs/toolkit';

import { login, signup, deleteUser } from './authThunks';

interface AuthState {
  token: string | null; // to validate access to protected routes
  user: string | null; // shown to dashboard after user registration
  loading: boolean;
  error: string | null;
  showMessage: boolean;
  showSetting: boolean;
}

const initialState: AuthState = {
  token: localStorage.getItem("token") || null,
  user: null,
  loading: false,
  error: null,
  showMessage: false,
  showSetting: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.clear();
      state.token = null;
      state.showSetting = false;
      state.user = null;
    },
    resetUserAndModal: (state) => {
      state.user = null;
      state.showMessage = false;
    },
    toggleSetting: (state) => {
      state.showSetting = !state.showSetting
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.email;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.email;
        state.showMessage = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // deleteUser
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
        state.showMessage = true;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { logout, clearError, resetUserAndModal, toggleSetting } = authSlice.actions;
export default authSlice.reducer;
