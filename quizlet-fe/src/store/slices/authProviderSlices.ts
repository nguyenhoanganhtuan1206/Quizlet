import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthResponseDTO, JwtPayload } from "../../type/Auth/authTypes";
import { getAndValidateToken } from "../../utils";

interface AuthProviderState {
  jwtInfo: JwtPayload | null;
  isAuthenticated: boolean;
}

const initialState: AuthProviderState = {
  jwtInfo: null,
  isAuthenticated: !!localStorage.getItem("token"),
};

export const authProviderSlice = createSlice({
  name: "authProvider",
  initialState,
  reducers: {
    /**
     * Sets the authentication tokens and updates the state
     * @param state - The current auth state
     * @param action - The action containing the token and refresh token
     * */
    setCredentials: (state, action: PayloadAction<AuthResponseDTO>) => {
      state.isAuthenticated = !!action.payload.token;
      state.jwtInfo = getAndValidateToken(action.payload.token);
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.jwtInfo = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, logout } = authProviderSlice.actions;
export const authReducer = authProviderSlice.reducer;
