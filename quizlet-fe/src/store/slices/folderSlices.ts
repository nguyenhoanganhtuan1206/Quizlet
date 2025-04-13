import { createSlice } from "@reduxjs/toolkit";

import { fetchFolders } from "../thunks/folderThunk";
import { ThunkState } from "../../type";
import { FolderSummaryDTO } from "../../type/";

type FolderSummaryState = ThunkState<FolderSummaryDTO>;

const initialState: FolderSummaryState = {
  data: [],
  error: null,
  isLoading: false,
};

export const folderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFolders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFolders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchFolders.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const folderReducer = folderSlice.reducer;
