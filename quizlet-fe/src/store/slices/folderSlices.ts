import { createSlice } from '@reduxjs/toolkit';
import { FolderCreationRequestDTO } from '../../type/';

const initialState: FolderCreationRequestDTO = {
  name: '',
  description: '',
};

export const folderSlice = createSlice({
  name: 'folder',
  initialState,
  extraReducers: (builder) => {},
});
