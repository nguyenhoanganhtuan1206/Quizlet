import { createAsyncThunk } from "@reduxjs/toolkit";
import { Folder } from "../../type";
import createApiClient from "../../hooks/useAxios";
import { useDispatch } from "react-redux";

export const fetchFolders = createAsyncThunk<Folder[], void>(
  "folder/fetchFolders",
  async () => {
    const token = localStorage.getItem("token");
    const apiClient = createApiClient({ token });

    const response = await apiClient.get("folders");

    return response.data;
  }
);
