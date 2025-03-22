import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthProviderState {
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthProviderState = {
  token: localStorage.getItem('token') ?? null,
  isAuthenticated: !!localStorage.getItem('token'),
};

export const authProviderSlice = createSlice({
  name: 'authProvider',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload);
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
});

export const { setCredentials, logout } = authProviderSlice.actions;
export const authReducer = authProviderSlice.reducer;
