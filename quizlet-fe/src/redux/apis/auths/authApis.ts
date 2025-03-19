import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { FormLoginValues } from '../../../schemas/authSchemas';
import { AuthResponseDTO } from '../../../type';

export const authApis = createApi({
  reducerPath: 'auths',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_ENDPOINT }),
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponseDTO, FormLoginValues>({
      query: (data) => ({
        url: '/auths/login',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApis;
