import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../hooks/useAxios";

import { FolderSummaryDTO } from "../../type";

import { pause } from "../../utils";

export const fetchFolders = createAsyncThunk<FolderSummaryDTO[], string>(
  "folder/fetchFolders",
  async (userId: string, { rejectWithValue }) => {
    try {
      await pause(600);

      const response = await axiosInstance.get(`folders/${userId}/users`);

      return response.data;
    } catch (error) {
      console.error(
        "Error while calling {folderThunk || fetchFolders}: ",
        error
      );

      rejectWithValue(error);
    }
  }
);

// export const fetchFolderByI
