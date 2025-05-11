import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthResponseDTO } from "../../type/auth/authTypes";
import { doRefreshToken } from "../thunks/refreshTokenThunk";

interface AuthProviderState {
  isLoading: boolean;
  isError: boolean;
  token: string | null;
  refreshToken: string | null;
}

const initialState: AuthProviderState = {
  isLoading: false,
  isError: false,
  token: localStorage.getItem("token"),
  refreshToken: localStorage.getItem("token"),
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
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
    },
    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      localStorage.clear();

      window.location.pathname = "auth";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(doRefreshToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(doRefreshToken.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.refreshToken = action.payload.token;
      })
      .addCase(doRefreshToken.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;

        window.location.pathname = "auth";
      });
  },
});

export const { setCredentials, logout } = authProviderSlice.actions;
export const authReducer = authProviderSlice.reducer;
