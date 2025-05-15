import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithToken } from "./baseQueryWithToken";
import { Folder, FolderCreateUpdateRequestDTO, FolderSummaryDTO } from "@/type";
import { FolderFlashSet } from "@/type/folder_flashset/FolderFlashSetTypes";

export interface AddFlashSetToFolderPayload {
  folderId: string;
  flashSetId: string;
}

export const folderApis = createApi({
  reducerPath: "folderApis",
  baseQuery: baseQueryWithToken,
  tagTypes: ["Folders"],
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
      providesTags: () => ["Folders"],
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

    // Mutation to add a Flash set to a Folder
    addFlashSetToFolder: builder.mutation<
      FolderFlashSet, // Return type
      AddFlashSetToFolderPayload // Arg
    >({
      query: ({ folderId, flashSetId }) => ({
        url: `folder_flashsets/${flashSetId}/update_material/${folderId}`,
        method: "POST",
      }),
      invalidatesTags: () => {
        console.log("Invalidating Folders tag");
        return ["Folders"];
      },
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
      invalidatesTags: () => {
        console.log("Invalidating Folders tag");
        return ["Folders"];
      },
    }),
  }),
});

export const {
  useFetchFolderByIdQuery,
  useCreateFolderMutation,
  useAddFlashSetToFolderMutation,
  useRemoveFlashSetFromFolderMutation,
} = folderApis;
