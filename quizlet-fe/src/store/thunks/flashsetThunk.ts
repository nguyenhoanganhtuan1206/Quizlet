import { createAsyncThunk } from '@reduxjs/toolkit';

import { FlashSetSummaryDTO } from '../../type';
import { pause } from '../../utils';
import { useAxios } from '../../hooks';

export const fetchFlashSets = createAsyncThunk<FlashSetSummaryDTO[], string>(
  'flashsets/fetchFlashSets',
  async (userId: string) => {
    if (!userId) {
      console.error(
        'Something went wrong when fetch all the flash sets! {flashSetThunk | fetchFlashSet}'
      );
      throw new Error('Something went wrong when fetch all the flash sets');
    }

    await pause(600);
    const response = await useAxios().get(`flashsets/${userId}/users`);

    return response.data;
  }
);
