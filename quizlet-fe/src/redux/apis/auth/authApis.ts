import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { FormLoginValues } from '../../../schemas/authSchemas';
import { AuthResponseDTO } from '../../../type/Auth/authTypes';
import pause from '../../../utils/timeout_api';

export const authApis = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_ENDPOINT,
    fetchFn: async (...args) => {
      await pause(600);
      return fetch(...args);
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponseDTO, FormLoginValues>({
      query: (data) => {
        return {
          url: '/auths/login',
          body: data,
          method: 'POST',
        };
      },
    }),
  }),
});

export const { useLoginMutation } = authApis;
