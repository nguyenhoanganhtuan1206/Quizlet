import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithToken } from "./baseQueryWithToken";
import { FolderFlashSet } from "@/type/folder_flashset/FolderFlashSetTypes";

export interface AddFlashSetToFolderPayload {
  folderId: string;
  flashSetId: string;
}

export const folderFlashSetApi = createApi({
  reducerPath: "folderFlashSetApi", // Unique key for the reducer
  baseQuery: baseQueryWithToken, // Base query with token handling
  tagTypes: ["FolderFlashSets", "Folders"], // Define tags for cache invalidation
  endpoints: (builder) => ({
    // Mutation to add a Flash set to a Folder
    addFlashSetToFolder: builder.mutation<
      FolderFlashSet, // Return type
      AddFlashSetToFolderPayload // Arg
    >({
      query: ({ folderId, flashSetId }) => ({
        url: `folder_flashsets/${flashSetId}/update_material/${folderId}`,
        method: "POST",
      }),
      invalidatesTags: (result) => [
        { type: "Folders", id: result ? result.folderId : "LIST" }, // Invalidate specific folder
      ],
    }),
    // Mutation to remove FlashSet from a Folder
    removeFlashSetFromFolder: builder.mutation<
      FolderFlashSet, // Return type
      AddFlashSetToFolderPayload // Arg
    >({
      query: ({ folderId, flashSetId }) => ({
        url: `folder_flashsets/${flashSetId}/update_material/${folderId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) => [
        { type: "FolderFlashSets", id: "LIST" },
        { type: "Folders", id: result ? result.id : "LIST" }, // Invalidate specific folder
      ],
    }),
  }),
});

export const {
  useAddFlashSetToFolderMutation,
  useRemoveFlashSetFromFolderMutation,
} = folderFlashSetApi;
