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
import { authApis, flashSetItemApis, folderApis } from "./apis";

const store = configureStore({
  reducer: {
    [authProviderSlice.reducerPath]: authReducer,
    [libraryFiltersSlice.reducerPath]: libraryFiltersReducer,
    [flashSetSlice.reducerPath]: flashSetReducer,
    [folderSlice.reducerPath]: folderSlice.reducer,
    [navigateBreadCrumbSlice.reducerPath]: navigateBreadCrumbReducer,
    [materialsModalSlice.reducerPath]: materialsModalReducer,
    [authApis.reducerPath]: authApis.reducer,
    [folderApis.reducerPath]: folderApis.reducer,
    [flashSetItemApis.reducerPath]: flashSetItemApis.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(authApis.middleware)
      .concat(folderApis.middleware)
      .concat(flashSetItemApis.middleware);
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
  useFetchByUserIdAndNotFolderIdQuery,
  useCreateFolderMutation,
  useUpdateFolderMutation,
  useDeleteFolderMutation,
  useAddFlashSetToFolderMutation,
  useRemoveFlashSetFromFolderMutation,
  useAddFolderChildToFolderMutation,
  useRemoveFolderChildFromFolderMutation,
  useCreateFlashSetItemMutation,
  useFetchFlashSetItemByIdQuery,
} from "./apis";

export {
  fetchFolders,
  fetchParentFolders,
  fetchFlashSets,
  doRefreshToken,
} from "./thunks/";

export default store;
