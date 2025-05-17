import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithToken } from "./baseQueryWithToken";

import { Folder, FolderCreateUpdateRequestDTO, FolderSummaryDTO } from "@/type";
import { FolderParents, FolderFlashSet } from "@/type/";

export interface AddFlashSetToFolderPayload {
  folderId: string;
  flashSetId: string;
}

export interface AddFolderChildToFolderParentPayload {
  parentFolderId: string;
  childFolderId: string;
}
interface UpdateFolderPayload {
  id: string;
  folderCreateDTO: FolderCreateUpdateRequestDTO;
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
      providesTags: (results) => [
        { type: "Folders", id: "LIST" },
        { type: "Folders", id: results ? results.id : "LIST" },
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
    updateFolder: builder.mutation<
      Folder, // Return type
      UpdateFolderPayload // Argument
    >({
      query: ({ id, folderCreateDTO }) => {
        return {
          url: `folders/${id}`,
          body: folderCreateDTO,
          method: "PUT",
        };
      },
      invalidatesTags: (result) => [
        { type: "Folders", id: result ? result.id : "LIST" },
      ],
    }),
    deleteFolder: builder.mutation<
      Folder, // Return type
      string
    >({
      query: (folderId) => {
        return {
          url: `folders/${folderId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result) => [
        { type: "Folders", id: result ? result.id : "LIST" },
      ],
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
      invalidatesTags: (result) => [
        { type: "Folders", id: result ? result.folderId : "LIST" },
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
        { type: "Folders", id: result ? result.folderId : "LIST" },
      ],
    }),

    // Mutation to add a Folder Child to a Folder
    addFolderChildToFolder: builder.mutation<
      FolderParents, // Return type
      AddFolderChildToFolderParentPayload // Arg
    >({
      query: ({ parentFolderId, childFolderId }) => ({
        url: `folder_parents/${childFolderId}/update_material/${parentFolderId}`,
        method: "POST",
      }),
      invalidatesTags: (result) => [
        { type: "Folders", id: result ? result.parentFolderId : "LIST" },
      ],
    }),
    removeFolderChildFromFolder: builder.mutation<
      FolderParents, // Return type
      AddFolderChildToFolderParentPayload // Arg
    >({
      query: ({ parentFolderId, childFolderId }) => ({
        url: `folder_parents/${childFolderId}/update_material/${parentFolderId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) => [
        { type: "Folders", id: result ? result.parentFolderId : "LIST" },
      ],
    }),
  }),
});

export const {
  useFetchFolderByIdQuery,
  useCreateFolderMutation,
  useAddFlashSetToFolderMutation,
  useUpdateFolderMutation,
  useDeleteFolderMutation,
  useRemoveFlashSetFromFolderMutation,
  useAddFolderChildToFolderMutation,
  useRemoveFolderChildFromFolderMutation,
} = folderApis;
