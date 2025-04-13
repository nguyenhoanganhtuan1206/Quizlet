import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithToken } from "./baseQueryWithToken";
import { FolderFlashSetItemDetailsResponse } from "../../type";

export const folderApis = createApi({
  reducerPath: "folders",
  baseQuery: baseQueryWithToken,
  endpoints: (builder) => ({
    fetchFolderById: builder.query<FolderFlashSetItemDetailsResponse[], string>(
      {
        query: (folderId) => {
          return {
            url: `folders/${folderId}`,
            method: "GET",
          };
        },
      }
    ),
  }),
});

export const { useFetchFolderByIdQuery } = folderApis;
