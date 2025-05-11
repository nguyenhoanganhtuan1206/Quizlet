import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthResponseDTO } from "../../type";
import axios, { AxiosError } from "axios";
import { getCurrentRefreshToken, pause } from "../../utils";

export const doRefreshToken = createAsyncThunk<AuthResponseDTO, void>(
  "auths/refreshToken",
  async (_, { rejectWithValue }) => {
    const currentRefreshToken = getCurrentRefreshToken();

    await pause(600);
    try {
      const response = await axios.post<AuthResponseDTO>(
        `${import.meta.env.VITE_API_ENDPOINT}/auths/refresh-token`,
        { refreshToken: currentRefreshToken }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Failed to refresh token {refreshTokenThunk | doRefreshToken}:",
        error
      );
      return rejectWithValue(error);
    }
  }
);
