import { createSlice } from "@reduxjs/toolkit";

import { ThunkState, FlashSetSummaryDTO } from "../../type";
import { fetchFlashSets } from "../thunks/flashsetThunk";

type FlashSetState = ThunkState<FlashSetSummaryDTO>;

const initialState: FlashSetState = {
  data: [],
  isLoading: false,
  error: null,
};

export const flashSetSlice = createSlice({
  name: "flashSetSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlashSets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFlashSets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchFlashSets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const flashSetReducer = flashSetSlice.reducer;
