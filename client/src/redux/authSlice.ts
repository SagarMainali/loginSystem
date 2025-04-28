import { createSlice } from '@reduxjs/toolkit';

import { login, signup, deleteUser } from './authThunks';

interface AuthState {
  token: string | null; // to validate access to protected routes
  user: string | null; // shown to dashboard after user registration
  loading: boolean;
  error: string | null;
  modal: {
    message: boolean;
    settings: boolean
  };
}

const initialState: AuthState = {
  token: localStorage.getItem("token") || null,
  user: null,
  loading: false,
  error: null,
  modal: {
    message: false,
    settings: false,
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.clear();
      state.token = null;
      state.user = null;
      state.modal.settings = false;
    },
    resetUserAndModal: (state) => {
      state.user = null;
      state.modal.message = false;
      // state.modal.settings = false;
    },
    toggleSetting: (state) => {
      state.modal.settings = !state.modal.settings
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
        localStorage.setItem("token", action.payload.token);
        state.user = action.payload.email;
        state.token = action.payload.token;
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
        state.modal.message = true;
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
        state.modal.message = true;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { logout, clearError, resetUserAndModal, toggleSetting } = authSlice.actions;
export default authSlice.reducer;
