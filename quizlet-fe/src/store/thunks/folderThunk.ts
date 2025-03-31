import { createAsyncThunk } from '@reduxjs/toolkit';

import { FolderSummaryDTO } from '../../type';
import { createApiClient } from '../../hooks/useAxios';

import { pause } from '../../utils';

export const fetchFolders = createAsyncThunk<FolderSummaryDTO[], string>(
  'folder/fetchFolders',
  async (userId: string) => {
    if (!userId) {
      console.error(
        'Something went wrong when fetch all the folders! {folderThunk | fetchFolders}'
      );
      throw new Error('Something went wrong when fetch all the folders');
    }
    const apiClient = await createApiClient();

    await pause(600);
    const response = await apiClient.get(`folders/${userId}/users`);

    return response.data;
  }
);
