import { createApi } from "@reduxjs/toolkit/query/react";
import { FlashSet } from "../../type/flash_set/flashSetTypes";

import { baseQueryWithToken } from "./baseQueryWithToken";

export const flashSetApis = createApi({
  reducerPath: "flashset",
  baseQuery: baseQueryWithToken,
  endpoints: (builder) => ({
    getFlashSet: builder.query<FlashSet[], string>({
      query: (userId) => `/flashsets/${userId}/users`,
    }),
  }),
});

export const { useGetFlashSetQuery } = flashSetApis;
