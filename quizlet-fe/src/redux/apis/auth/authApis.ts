import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { FormLoginValues } from "../../../schemas/authSchemas";
import { AuthResponseDTO } from "../../../type/Auth/authTypes";

export const authApis = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_ENDPOINT }),
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponseDTO, FormLoginValues>({
      query: (data) => {
        return {
          url: "/auth/login",
          body: data,
          method: "POST",
        };
      },
    }),
  }),
});

export const { useLoginMutation } = authApis;
