import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthResponseDTO } from "../../type/Auth/authTypes";

interface AuthProviderState {
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthProviderState = {
  token: localStorage.getItem("token") ?? null,
  refreshToken: localStorage.getItem("refreshToken") ?? null,
  isAuthenticated: !!localStorage.getItem("token"),
};

export const authProviderSlice = createSlice({
  name: "authProvider",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthResponseDTO>) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = !!action.payload.token;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
    },
    updateAccessToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    },
  },
});

export const { setCredentials, logout, updateAccessToken } =
  authProviderSlice.actions;
export const authReducer = authProviderSlice.reducer;
