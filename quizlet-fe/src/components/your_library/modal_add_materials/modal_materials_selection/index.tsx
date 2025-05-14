import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "@/store";

import { FaPlus } from "react-icons/fa";
import { MdFilterList } from "react-icons/md";
import { PiCards } from "react-icons/pi";
import { FaRegFolder } from "react-icons/fa6";

import MaterialSelectionItem from "./MaterialSelectionItem";
import { ReactPropsChildren } from "@/type";
import { Button, PopperWrapper } from "@/shared/components";
import { TypeMaterialsSelection } from "@/store/slices/modalMaterialsSlices";

interface MaterialOptions {
  title: string;
  icon: ReactPropsChildren;
  type: TypeMaterialsSelection;
}

export default function ModalMaterialsActions() {
  const [isShowDropdownFilter, setIsShowDropdownFilter] = useState(false);
  const modalMaterialsType = useSelector(
    (rootState: RootState) => rootState.modalMaterialSlices
  );

  const materialOptions: MaterialOptions[] = [
    {
      title: "Flashcard Sets",
      icon: <PiCards className="text-[1.6rem] -translate-y-0.5 mr-3" />,
      type: TypeMaterialsSelection.FLASHSETCARD,
    },
    {
      title: "Folders",
      icon: <FaRegFolder className="text-[1.5rem] -translate-y-0.5 mr-3" />,
      type: TypeMaterialsSelection.FOLDER,
    },
  ];

  const title = useMemo(() => {
    const option = materialOptions.find(
      (opt) => opt.type === modalMaterialsType.materialTypeSelected
    );
    return option?.title || "Select Material Type";
  }, [materialOptions]);

  return (
    <div className="flex items-center justify-between mt-[25px] mb-10">
      <div
        onClick={() => setIsShowDropdownFilter(!isShowDropdownFilter)}
        className="relative flex items-center text-[1.25rem] text-white px-6 py-3 border-2 border-transparent font-bold rounded-[50px] text-[var(--ref-color-twilight300)] cursor-pointer hover:text-white hover:bg-[var(--color-text-blacklight)] hover:border-[var(--ref-color-twilight300)] duration-200"
      >
        <span>{title}</span>
        <MdFilterList className="translate-y-[-2px] ml-3" />

        <PopperWrapper
          className="absolute top-full w-[240px] py-[8px] border border-[var(--gray-300-gray-600)]"
          isActive={isShowDropdownFilter}
        >
          {materialOptions.map((materialOption) => {
            return (
              <MaterialSelectionItem
                key={materialOption.type}
                title={materialOption.title}
                icon={materialOption.icon}
                type={materialOption.type}
                isSelected={
                  materialOption.type ===
                  modalMaterialsType.materialTypeSelected
                }
              />
            );
          })}
        </PopperWrapper>
      </div>

      <Button
        variant="borderOnly"
        className="text-[1.25rem] text-white px-6 py-3 border-2 border-transparent rounded-[50px] text-[var(--ref-color-twilight300)] hover:bg-[var(--color-text-blacklight)] hover:border-[var(--ref-color-twilight300)]"
      >
        <FaPlus className="translate-y-[-2px] mr-3" />
        <span>Create new</span>
      </Button>
    </div>
  );
}
