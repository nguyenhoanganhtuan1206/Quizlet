import { configureStore } from "@reduxjs/toolkit";

import {
  libraryFiltersReducer,
  libraryFiltersSlice,
  folderSlice,
  flashSetReducer,
  flashSetSlice,
  authProviderSlice,
  authReducer,
  navigateBreadCrumbReducer,
  navigateBreadCrumbSlice,
  materialsModalSlice,
  materialsModalReducer,
} from "./slices/";
import { authApis, folderApis } from "./apis";

const store = configureStore({
  reducer: {
    [authProviderSlice.reducerPath]: authReducer,
    [libraryFiltersSlice.reducerPath]: libraryFiltersReducer,
    [flashSetSlice.reducerPath]: flashSetReducer,
    [folderSlice.reducerPath]: folderSlice.reducer,
    [authApis.reducerPath]: authApis.reducer,
    [folderApis.reducerPath]: folderApis.reducer,
    [navigateBreadCrumbSlice.reducerPath]: navigateBreadCrumbReducer,
    [materialsModalSlice.reducerPath]: materialsModalReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(authApis.middleware)
      .concat(folderApis.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export {
  logout,
  setCredentials,
  selectFilterLibraryItem,
  addMorePage,
  authProviderSlice,
  flashSetReducer,
  setMaterialType,
  setIsShowModalMaterials,
  TypeMaterialsSelection,
} from "./slices";
export {
  useLoginMutation,
  useRegisterMutation,
  useFetchFolderByIdQuery,
  useCreateFolderMutation,
} from "./apis";

export {
  fetchFolders,
  fetchParentFolders,
  fetchFlashSets,
  doRefreshToken,
} from "./thunks/";

export default store;
