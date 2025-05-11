import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../hooks/useAxios";

import { FlashSetSummaryDTO } from "../../type";
import { pause } from "../../utils";

export const fetchFlashSets = createAsyncThunk<FlashSetSummaryDTO[], void>(
  "flashsets/fetchFlashSets",
  async (_, { rejectWithValue }) => {
    try {
      await pause(600);

      const response = await axiosInstance.get("flashsets");
      console.log("response.data", response.data);

      return response.data;
    } catch (error) {
      console.error(
        "Error while calling {flashSetThunk || fetchFlashSets}: ",
        error
      );

      return rejectWithValue(error);
    }
  }
);
