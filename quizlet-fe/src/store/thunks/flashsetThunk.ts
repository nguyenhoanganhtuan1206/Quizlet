import { createAsyncThunk } from '@reduxjs/toolkit';

import { FlashSetSummaryDTO } from '../../type';
import { createApiClient } from '../../hooks/useAxios';
import { pause } from '../../utils';

export const fetchFlashSets = createAsyncThunk<FlashSetSummaryDTO[], string>(
  'flashsets/fetchFlashSets',
  async (userId: string) => {
    if (!userId) {
      console.error(
        'Something went wrong when fetch all the flash sets! {flashSetThunk | fetchFlashSet}'
      );
      throw new Error('Something went wrong when fetch all the flash sets');
    }

    const apiClient = await createApiClient();

    await pause(600);
    const response = await apiClient.get(`flashsets/${userId}/users`);

    return response.data;
  }
);
