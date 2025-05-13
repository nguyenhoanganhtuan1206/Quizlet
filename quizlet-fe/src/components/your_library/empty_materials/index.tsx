import { useDispatch } from "react-redux";

import { FaFolderOpen } from "react-icons/fa";
import { LuFolderHeart } from "react-icons/lu";

import { Button, EmptyComponent } from "@/shared/components";
import { AppDispatch, setMaterialType, TypeMaterialsSelection } from "@/store";

export default function EmptyMaterials() {
  const dispatch = useDispatch<AppDispatch>();

  const handleOpenModalMaterials = () => {
    dispatch(setMaterialType(TypeMaterialsSelection.FLASHSETCARD));
  };

  return (
    <EmptyComponent className="flex-col">
      <div className="flex text-[3.4rem] mt-5 mb-7">
        <LuFolderHeart className="text-[var(--pink-100-white-600)] mr-3" />
        <FaFolderOpen className="text-[var(--color-primary)]" />
      </div>

      <p className="text-[1.6rem] text-white font-semibold my-5">
        Let’s start building your folder and flash set
      </p>

      <Button
        variant="primary"
        className="h-[55px] w-[130px] text-[1.5rem] rounded-2xl"
        onClick={handleOpenModalMaterials}
      >
        Add Materials
      </Button>
    </EmptyComponent>
  );
}
