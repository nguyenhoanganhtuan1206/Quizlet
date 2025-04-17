import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type BreadcrumbNavigationItem = {
  title: string;
  path: string;
};

interface BreadcrumbNavigationState {
  currentPage: BreadcrumbNavigationItem;
  allPages: BreadcrumbNavigationItem[];
}

const initialState: BreadcrumbNavigationState = {
  currentPage: { title: "", path: "" },
  allPages: [],
};

export const navigateBreadCrumbSlice = createSlice({
  name: "navigationBreadCrumb",
  initialState,
  reducers: {
    addMorePage: (state, action: PayloadAction<BreadcrumbNavigationItem>) => {
      /**
       * Verify whether it's existed
       * If user selected in previous page -> Remove the latest the page.
       */
      const currentPagePos = state.allPages.findIndex((page, index) => {
        if (
          page.path === action.payload.path &&
          page.title === action.payload.title
        ) {
          return index;
        }
      });

      if (currentPagePos !== -1) {
        state.currentPage = action.payload;
        state.allPages = state.allPages.slice(0, currentPagePos + 1);
      } else {
        state.currentPage = action.payload;
        state.allPages = [...state.allPages, action.payload];
      }
    },
  },
});

export const navigateBreadCrumbReducer = navigateBreadCrumbSlice.reducer;
export const { addMorePage } = navigateBreadCrumbSlice.actions;
