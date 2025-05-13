import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import { TiTick } from "react-icons/ti";

import { ReactPropsChildren } from "@/type";
import {
  AppDispatch,
  fetchFlashSets,
  fetchFolders,
  RootState,
  setIsShowModalMaterials,
  setListFlashSets,
  setListFolders,
  TypeMaterialsSelection,
} from "@/store";

type MaterialSelectionItemProps = {
  title: string;
  type: TypeMaterialsSelection;
  icon: ReactPropsChildren;
  isSelected: boolean;
};

export default function MaterialSelectionItem({
  title,
  type,
  icon,
  isSelected,
}: Readonly<MaterialSelectionItemProps>) {
  const dispatch = useDispatch<AppDispatch>();
  const flashSetState = useSelector((state: RootState) => state.flashSetSlice);
  const folderState = useSelector((state: RootState) => state.folderSlice);

  const handleOnSelectMaterialOption = (type: TypeMaterialsSelection) => {
    if (type === TypeMaterialsSelection.FLASHSETCARD) {
      dispatch(fetchFlashSets());
      dispatch(setListFlashSets(flashSetState.data));
      dispatch(setIsShowModalMaterials(true));
    }

    if (type === TypeMaterialsSelection.FOLDER) {
      dispatch(fetchFolders());
      dispatch(setListFolders(folderState.data));
      dispatch(setIsShowModalMaterials(true));
    }
  };

  return (
    <div
      onClick={() => handleOnSelectMaterialOption(type)}
      className={classNames(
        "flex items-center px-[24px] py-[8px] hover:bg-[var(--color-text-blacklight)]",
        isSelected ? "text-[var(--border-color)]" : ""
      )}
    >
      {icon}
      <span className="flex-[2]">{title}</span>

      {isSelected && (
        <TiTick className="flex-none translate-y-[-2px] text-[2rem]" />
      )}
    </div>
  );
}
