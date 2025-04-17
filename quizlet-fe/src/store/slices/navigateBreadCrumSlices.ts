import { createSlice } from "@reduxjs/toolkit";

type BreadcrumbNavigationItem = {
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
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    initialNavigationBreadCrumb: (state, action) => {
      state.allPages = action.payload;
    },
    addMorePage: (state, action) => {
      state.allPages.push(action.payload);
    },
  },
});

export const navigateBreadCrumbReducer = navigateBreadCrumbSlice.reducer;
export const { addMorePage, setCurrentPage, initialNavigationBreadCrumb } =
  navigateBreadCrumbSlice.actions;
