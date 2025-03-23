import { createApi } from "@reduxjs/toolkit/query/react";
import { FlashSet } from "../../../type/FlashSet/flashSetTypes";

import { baseQueryWithToken } from "..";

export const flashSetApis = createApi({
  reducerPath: "flashset",
  baseQuery: baseQueryWithToken,
  endpoints: (builder) => ({
    getFlashSet: builder.query<FlashSet[], string>({
      query: (userId) => `/flashsets?userId=${userId}`,
    }),
  }),
});

export const { useGetFlashSetQuery } = flashSetApis;
