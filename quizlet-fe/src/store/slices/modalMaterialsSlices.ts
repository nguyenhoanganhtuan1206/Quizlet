import { FlashSetSummaryDTO, FolderSummaryDTO } from "@/type";
import { createSlice } from "@reduxjs/toolkit";

interface MaterialsState {
  listFolders: FolderSummaryDTO[];
  listFlashSets: FlashSetSummaryDTO[];
  isShowModalMaterials: boolean;
}

const initialState: MaterialsState = {
  isShowModalMaterials: false,
  listFlashSets: [],
  listFolders: [],
};

export const materialsModalSlice = createSlice({
  name: "modalMaterialProvider",
  initialState,
  reducers: {
    setIsShowModalMaterials: (state, action) => {
      state.isShowModalMaterials = action.payload;
    },
    setListFlashSets: (state, action) => {
      state.listFolders = [];
      state.listFlashSets = action.payload;
    },
    setListFolders: (state, action) => {
      state.listFlashSets = [];
      state.listFolders = action.payload;
    },
  },
});

export const { setListFlashSets, setListFolders, setIsShowModalMaterials } =
  materialsModalSlice.actions;
export const materialsModalReducer = materialsModalSlice.reducer;
