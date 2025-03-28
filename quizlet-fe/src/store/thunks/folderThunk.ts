import { createAsyncThunk } from '@reduxjs/toolkit';

import { FolderSummaryDTO } from '../../type/folder/folderType';
import { getJwtPayload, pause } from '../../utils';
import { createApiClient } from '../../hooks/useAxios';

export const fetchFolders = createAsyncThunk<FolderSummaryDTO[], void>(
  'folder/fetchFolders',
  async () => {
    const apiClient = await createApiClient();

    await pause(600);
    const decoded = getJwtPayload();
    const response = await apiClient.get(`folders/${decoded?.user_id}/users`);

    return response.data;
  }
);
