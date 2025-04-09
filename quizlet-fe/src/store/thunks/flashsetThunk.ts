import { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../hooks/useAxios";

import { FlashSetSummaryDTO } from "../../type";
import { pause } from "../../utils";
import { handleUnauthorizedError } from "../../utils/errorHandlingUtilities";

export const fetchFlashSets = createAsyncThunk<FlashSetSummaryDTO[], string>(
  "flashsets/fetchFlashSets",
  async (userId: string, { rejectWithValue, dispatch }) => {
    try {
      await pause(600);

      const response = await axiosInstance.get(`flashsets/${userId}/users`);

      return response.data;
    } catch (error) {
      console.error(
        "Error while calling {flashSetThunk || fetchFlashSets}: ",
        error
      );
      handleUnauthorizedError({ error, dispatch, rejectWithValue });
    }
  }
);
