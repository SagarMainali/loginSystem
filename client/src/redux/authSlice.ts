import { createSlice } from '@reduxjs/toolkit';

import { login, signup, deleteUser } from './authThunks';

interface AuthState {
  token: string | null; // to validate access to protected routes
  user: string | null; // shown to dashboard after user registration
  loading: boolean;
  error: string | null;
  modal: {
    message: string | null;
    settings: boolean;
    deletion: boolean;
  },
  userDelete: boolean
}

interface SavedAuthData {
  token: string;
  user: string
}

const savedData = localStorage.getItem('authData');
const parsedData: SavedAuthData = savedData ? JSON.parse(savedData) : { user: null, token: null };

const savedUser = parsedData.user;
const savedToken = parsedData.token;

const initialState: AuthState = {
  user: savedUser,
  token: savedToken,
  loading: false,
  error: null,
  modal: {
    message: null,
    settings: false,
    deletion: false,
  },
  userDelete: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.clear();
      state.user = null;
      state.token = null;
      state.modal.settings = false;
    },
    resetModal: (state) => {
      state.modal.message = null;
    },
    toggleSetting: (state) => {
      state.modal.settings = !state.modal.settings
    },
    toggleDelete: (state) => {
      state.modal.deletion = !state.modal.deletion
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
        const authData = {
          user: action.payload.email,
          token: action.payload.token
        };
        localStorage.setItem('authData', JSON.stringify(authData));

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
        state.modal.message = action.payload.message;
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
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        localStorage.clear();
        state.user = null;
        state.token = null;
        state.modal.settings = false;
        state.modal.message = action.payload.message;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { logout, clearError, resetModal, toggleSetting, toggleDelete } = authSlice.actions;
export default authSlice.reducer;
