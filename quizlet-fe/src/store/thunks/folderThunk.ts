import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../hooks/useAxios";

import {
  Folder,
  FolderCreateUpdateRequestDTO,
  FolderSummaryDTO,
} from "../../type";

import { pause } from "../../utils";

/**
 * Fetch all folders by UserID
 */
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

/**
 * Fetch folders by userId and Not Cunrret FolderID
 * @param userId
 * @param folderId
 */
export const fetchFoldersSummaries = createAsyncThunk<
  FolderSummaryDTO[],
  string
>(
  "folder/fetchFoldersByUserIdAndNotId",
  async (folderId, { rejectWithValue }) => {
    try {
      await pause(600);
      const response = await axiosInstance.get<FolderSummaryDTO[]>(
        `folder/${folderId}/summaries`
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error while calling fetchParentFolders {folderThunk || fetchFoldersSummaries}:"
      );
      return rejectWithValue(error);
    }
  }
);

/**
 * Fetch parents folder by UserID
 * @param userId
 */
export const fetchParentFolders = createAsyncThunk<FolderSummaryDTO[]>(
  "folder/fetchParentFoldersByUserId",
  async (_, { rejectWithValue }) => {
    try {
      await pause(600);

      const response = await axiosInstance.get("folders/parent");

      return response.data;
    } catch (error) {
      console.error(
        "Error while calling fetchParentFolders {folderThunk || fetchParentFoldersByUserId}:"
      );
      rejectWithValue(error);
    }
  }
);

/**
 * Fetch parents folder by UserID
 * @param userId
 */
export const updateFolder = createAsyncThunk<
  Folder, // Return Type
  FolderCreateUpdateRequestDTO // Argunmen Type
>("folder/updateFolder", async (folderUpdateData, { rejectWithValue }) => {
  try {
    await pause(600);

    const response = await axiosInstance.put(
      `folders/${folderUpdateData.id}`,
      folderUpdateData
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error while updating the Folder {folderThunk || updateFolder}:"
    );
    rejectWithValue(error);
  }
});
