import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthResponseDTO, JwtPayload } from '../../type/Auth/authTypes';
import { getAndValidateToken } from '../../utils';
import { doRefreshToken } from '../thunks/refreshTokenThunk';

interface AuthProviderState {
  isLoading: boolean;
  isError: boolean;
  token: string | null;
  refreshToken: string | null;
  jwtInfo: JwtPayload | null;
  isAuthenticated: boolean;
}

const initialState: AuthProviderState = {
  isLoading: false,
  isError: false,
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
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.jwtInfo = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(doRefreshToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(doRefreshToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jwtInfo = getAndValidateToken(action.payload.token);
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(doRefreshToken.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
        state.token = null;
        state.isAuthenticated = false;
        state.jwtInfo = null;
        localStorage.clear();
      });
  },
});

export const { setCredentials, logout } = authProviderSlice.actions;
export const authReducer = authProviderSlice.reducer;
