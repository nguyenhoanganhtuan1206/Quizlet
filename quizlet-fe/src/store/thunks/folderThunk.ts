import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../hooks/useAxios";

import { FolderSummaryDTO } from "../../type";

import { pause } from "../../utils";

export const fetchFolders = createAsyncThunk<FolderSummaryDTO[]>(
  "folder/fetchFoldersByUserId",
  async (_, { rejectWithValue }) => {
    try {
      await pause(600);

      const response = await axiosInstance.get("folders");

      return response.data;
    } catch (error) {
      console.error(
        "Error while calling fetchFolders {folderThunk || fetchFolders}:"
      );
      rejectWithValue(error);
    }
  }
);

export const fetchParentFolders = createAsyncThunk<FolderSummaryDTO[]>(
  "folder/fetchParentFoldersByUserId",
  async (_, { rejectWithValue }) => {
    try {
      await pause(600);

      const response = await axiosInstance.get("folders/parent");

      return response.data;
    } catch (error) {
      console.error(
        "Error while calling fetchFolders {folderThunk || fetchParentFoldersByUserId}:"
      );
      rejectWithValue(error);
    }
  }
);
