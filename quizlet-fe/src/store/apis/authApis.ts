import { createApi } from "@reduxjs/toolkit/query/react";

import {
  FormLoginValues,
  FormRegisterValues,
} from "../../schemas/auth/authSchemas";

import { AuthResponseDTO } from "../../type";
import { baseQueryWithToken } from "./baseQueryWithToken";
import { FacebookAuthRequestDTO } from "@/type/auth/authTypes";

export const authApis = createApi({
  reducerPath: "auth",
  baseQuery: baseQueryWithToken,
  endpoints: (builder) => ({
    /**
      Login by Credentials
    */
    loginByCredentials: builder.mutation<AuthResponseDTO, FormLoginValues>({
      query: (data) => {
        return {
          url: "/auths/login",
          body: data,
          method: "POST",
        };
      },
    }),
    /**
     * Login by OAuth2 Facebook
     */
    loginByFacebook: builder.mutation<AuthResponseDTO, FacebookAuthRequestDTO>({
      query: (data) => {
        return {
          url: "/auths/oauth2/facebook",
          body: data,
          method: "POST",
        };
      },
    }),
    /**
     * Login by OAuth2 Google
     */
    loginByGoogle: builder.mutation<AuthResponseDTO, string>({
      query: (accessToken) => {
        return {
          url: "/auths/oauth2/google",
          body: {
            accessToken,
          },
          method: "POST",
        };
      },
    }),
    /**
      Register
    */
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

export const {
  useLoginByCredentialsMutation,
  useLoginByFacebookMutation,
  useLoginByGoogleMutation,
  useRegisterMutation,
} = authApis;
