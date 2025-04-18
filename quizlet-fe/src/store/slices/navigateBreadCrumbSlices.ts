import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type BreadcrumbNavigationItem = {
  title: string;
  path: string;
};

interface BreadcrumbNavigationState {
  currentPage: BreadcrumbNavigationItem;
  allPages: BreadcrumbNavigationItem[];
  isLoading?: boolean;
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
      const titlePayload = action.payload.title.toLowerCase();
      const pathPayload = action.payload.path.toLowerCase();

      const positionPage = state.allPages.findIndex(
        (page) =>
          page.title.toLocaleLowerCase() === titlePayload &&
          pathPayload === page.path.toLocaleLowerCase()
      );

      if (positionPage !== -1) {
        state.allPages = state.allPages.slice(0, positionPage + 1);
      } else {
        state.allPages = [...state.allPages, action.payload];
      }
    },
  },
});

export const navigateBreadCrumbReducer = navigateBreadCrumbSlice.reducer;
export const { addMorePage } = navigateBreadCrumbSlice.actions;
