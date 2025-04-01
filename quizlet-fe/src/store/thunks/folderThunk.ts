import { createAsyncThunk } from '@reduxjs/toolkit';

import { FolderSummaryDTO } from '../../type';

import { pause } from '../../utils';
import createApiClient from '../../hooks/useAxios';

export const fetchFolders = createAsyncThunk<FolderSummaryDTO[], string>(
  'folder/fetchFolders',
  async (userId: string) => {
    if (!userId) {
      console.error('Invalid userId when fetching folders');
      throw new Error('Invalid userId');
    }

    await pause(600);

    const apiClient = await createApiClient();
    const response = await apiClient.get(`folders/${userId}/users`);
    return response.data;
  }
);
