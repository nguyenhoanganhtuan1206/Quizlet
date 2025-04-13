import { createApi } from "@reduxjs/toolkit/query/react";

import { FormLoginValues, FormRegisterValues } from "../../schemas/authSchemas";

import { AuthResponseDTO } from "../../type";
import { baseQueryWithToken } from "./baseQueryWithToken";

export const authApis = createApi({
  reducerPath: "auth",
  baseQuery: baseQueryWithToken,
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponseDTO, FormLoginValues>({
      query: (data) => {
        return {
          url: "/auths/login",
          body: data,
          method: "POST",
        };
      },
    }),
    register: builder.mutation<void, FormRegisterValues>({
      query: (data) => {
        return {
          url: "/auths/signup",
          body: data,
          method: "POST",
        };
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApis;
