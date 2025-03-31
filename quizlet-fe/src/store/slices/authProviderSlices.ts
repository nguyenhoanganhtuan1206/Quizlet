import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthResponseDTO, JwtPayload } from '../../type/Auth/authTypes';
import { getAndValidateToken } from '../../utils';

interface AuthProviderState {
  token: string | null;
  refreshToken: string | null;
  jwtInfo: JwtPayload | null;
  isAuthenticated: boolean;
}

const initialState: AuthProviderState = {
  token: localStorage.getItem('token') ?? null,
  refreshToken: localStorage.getItem('refreshToken') ?? null,
  jwtInfo: null,
  isAuthenticated: !!localStorage.getItem('token'),
};

export const authProviderSlice = createSlice({
  name: 'authProvider',
  initialState,
  reducers: {
    /**
     * Sets the authentication tokens and updates the state
     * @param state - The current auth state
     * @param action - The action containing the token and refresh token
     * */
    setCredentials: (state, action: PayloadAction<AuthResponseDTO>) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = !!action.payload.token;
      state.jwtInfo = getAndValidateToken(state.token);
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    },
    updateAccessToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.jwtInfo = null;
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    },
  },
});

export const { setCredentials, logout, updateAccessToken } =
  authProviderSlice.actions;
export const authReducer = authProviderSlice.reducer;
