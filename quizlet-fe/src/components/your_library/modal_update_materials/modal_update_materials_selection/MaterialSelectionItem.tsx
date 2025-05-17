import { useDispatch } from "react-redux";
import classNames from "classnames";

import { TiTick } from "react-icons/ti";

import { ReactPropsChildren } from "@/type";
import {
  AppDispatch,
  setIsShowModalMaterials,
  setMaterialType,
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

  const handleOnSelectMaterialOption = (type: TypeMaterialsSelection) => {
    dispatch(setMaterialType(type));
    dispatch(setIsShowModalMaterials(true));
  };

  return (
    <div
      onClick={() => handleOnSelectMaterialOption(type)}
      className={classNames(
        "flex items-center px-[24px] py-[8px] hover:bg-[var(--gray-300-gray-800)]",
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
