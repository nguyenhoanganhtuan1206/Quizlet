import { createAsyncThunk } from '@reduxjs/toolkit';

import { Folder } from '../../type';
import createApiClient from '../../hooks/useAxios';

import { validateToken } from '../../utils/jwtUtilities';

import pause from '../../utils/timeoutApiUtilities';

export const fetchFolders = createAsyncThunk<Folder[], void>(
  'folder/fetchFolders',
  async () => {
    const token = localStorage.getItem('token');

    const apiClient = createApiClient({ token });

    await pause(600);
    const decoded = validateToken();
    const response = await apiClient.get(`folders/${decoded?.user_id}/users`);

    return response.data;
  }
);
