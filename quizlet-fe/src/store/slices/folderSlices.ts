import { createSlice } from "@reduxjs/toolkit";

import { fetchFolders } from "../thunks/folderThunk";
import { ThunkState } from "../../type";
import { FolderSummaryDTO } from "../../type/folder/folderType";

type FolderSummaryState = ThunkState<FolderSummaryDTO>;

const initialState: FolderSummaryState = {
  data: [],
  isError: false,
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
        console.log("action", action);
        
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export default folderSlice.reducer;
