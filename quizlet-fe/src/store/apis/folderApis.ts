import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithToken } from "./baseQueryWithToken";
import { Folder, FolderCreateUpdateRequestDTO, FolderSummaryDTO } from "@/type";

export const folderApis = createApi({
  reducerPath: "folders",
  baseQuery: baseQueryWithToken,
  tagTypes: ["Folders", "FolderFlashSets"],
  endpoints: (builder) => ({
    fetchFolderById: builder.query<
      FolderSummaryDTO, // Return types
      string // Argument
    >({
      query: (folderId) => {
        return {
          url: `folders/${folderId}`,
          method: "GET",
        };
      },
      providesTags: (result) => [
        { type: "Folders", id: result ? result.id : "LIST" }, // Specific folder ID
      ],
    }),
    createFolder: builder.mutation<
      Folder, // Return types
      FolderCreateUpdateRequestDTO // Argument
    >({
      query: (data) => {
        return {
          url: "folders",
          body: data,
          method: "POST",
        };
      },
    }),
  }),
});

export const { useFetchFolderByIdQuery, useCreateFolderMutation } = folderApis;
