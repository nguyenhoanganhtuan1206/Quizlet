import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithToken } from "./baseQueryWithToken";
import {
  Folder,
  FolderCreateUpdateRequestDTO,
  FolderSummaryDTO,
} from "@/type";

export const folderApis = createApi({
  reducerPath: "folders",
  baseQuery: baseQueryWithToken,
  endpoints: (builder) => ({
    fetchFolderById: builder.query<FolderSummaryDTO, string>({
      query: (folderId) => {
        return {
          url: `folders/${folderId}`,
          method: "GET",
        };
      },
    }),
    createFolder: builder.mutation<Folder, FolderCreateUpdateRequestDTO>({
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
