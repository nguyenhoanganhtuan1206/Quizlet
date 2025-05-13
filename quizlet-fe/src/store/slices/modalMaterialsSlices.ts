import { FlashSetSummaryDTO, FolderSummaryDTO } from "@/type";
import { createSlice } from "@reduxjs/toolkit";

export enum TypeMaterialsSelection {
  FLASHSETCARD = "FLASHSETCARD",
  FOLDER = "FOLDER",
}

interface MaterialsState {
  listFolders: FolderSummaryDTO[];
  listFlashSets: FlashSetSummaryDTO[];
  materialTypeSelected: TypeMaterialsSelection;
  isShowModalMaterials: boolean;
}

const initialState: MaterialsState = {
  isShowModalMaterials: false,
  materialTypeSelected: TypeMaterialsSelection.FLASHSETCARD,
  listFlashSets: [],
  listFolders: [],
};

export const materialsModalSlice = createSlice({
  name: "modalMaterialSlices",
  initialState,
  reducers: {
    setIsShowModalMaterials: (state, action) => {
      state.isShowModalMaterials = action.payload;
    },
    setMaterialType: (state, action) => {
      state.materialTypeSelected = action.payload;
    },
  },
});

export const { setMaterialType, setIsShowModalMaterials } =
  materialsModalSlice.actions;
export const materialsModalReducer = materialsModalSlice.reducer;
