import { createSlice } from '@reduxjs/toolkit';

type TabFilterTags = '#folder' | '#flashset';

export interface TabFilter {
  id: number;
  title: string;
  isSelected: boolean;
  tags: TabFilterTags;
}

interface LibraryFilterState {
  filters: TabFilter[];
  currentLibrary: number | null;
}

export const initialState: LibraryFilterState = {
  filters: [
    {
      id: 1,
      title: 'Flashcard sets',
      isSelected: true,
      tags: '#flashset',
    },
    {
      id: 2,
      title: 'Folders',
      isSelected: false,
      tags: '#folder',
    },
  ],
  currentLibrary: 1,
};

export const libraryFiltersSlice = createSlice({
  name: 'libraryFilters',
  initialState,
  reducers: {
    selectFilterLibraryItem: (state, action) => {
      state.filters.forEach((item) => {
        if (item.id === action.payload) {
          item.isSelected = true;
        } else {
          item.isSelected = false;
        }
      });

      state.currentLibrary = action.payload;
    },
  },
});

export const libraryFiltersReducer = libraryFiltersSlice.reducer;
export const { selectFilterLibraryItem } = libraryFiltersSlice.actions;
