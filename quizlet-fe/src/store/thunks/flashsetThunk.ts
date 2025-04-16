import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../hooks/useAxios";

import { FlashSetSummaryDTO } from "../../type";
import { pause } from "../../utils";
import { AxiosError } from "axios";

export const fetchFlashSets = createAsyncThunk<FlashSetSummaryDTO[], string>(
  "flashsets/fetchFlashSets",
  async (userId: string, { rejectWithValue }) => {
    try {
      await pause(600);

      const response = await axiosInstance.get(`flashsets/${userId}/users`);      

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(
        "Error while calling {flashSetThunk || fetchFlashSets}: ",
        error
      );

      return rejectWithValue(axiosError);
    }
  }
);
