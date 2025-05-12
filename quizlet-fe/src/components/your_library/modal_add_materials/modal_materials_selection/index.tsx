import { Button, PopperWrapper } from "@/shared/components";
import { RootState } from "@/store";
import { TypeMaterialsSelection } from "@/store/slices/modalMaterialsSlices";
import classNames from "classnames";
import { FaPlus } from "react-icons/fa";
import { MdFilterList } from "react-icons/md";
import { PiCards } from "react-icons/pi";
import { useSelector } from "react-redux";
import { TiTick } from "react-icons/ti";

export default function ModalMaterialsActions() {
  const modalMaterialsType = useSelector(
    (rootState: RootState) => rootState.modalMaterialSlices
  );

  console.log(
    "modalMaterialsType.materialTypeSelection",
    modalMaterialsType.materialTypeSelection
  );

  return (
    <div className="flex items-center justify-between mt-[25px] mb-10">
      <div className="relative flex items-center text-[1.25rem] text-white px-6 py-3 border-2 border-transparent font-bold rounded-[50px] text-[var(--ref-color-twilight300)] cursor-pointer hover:text-white hover:bg-[var(--color-text-blacklight)] hover:border-[var(--ref-color-twilight300)] duration-200">
        <span>Flashcard Sets</span>
        <MdFilterList className="translate-y-[-2px] ml-3" />

        <PopperWrapper
          className="absolute top-full w-[240px] py-[8px] border border-[var(--gray-300-gray-600)]"
          isActive
        >
          <div
            className={classNames(
              "flex items-center px-[24px] py-[8px] hover:bg-[var(--color-text-blacklight)]",
              modalMaterialsType.materialTypeSelection ===
                TypeMaterialsSelection.FLASHSETCARD,
              "text-[var(--border-color)]"
            )}
          >
            <PiCards className="text-[1.6rem] translate-y-[-2px] mr-3" />
            <span className="flex-[2]">Flashcard sets</span>

            {modalMaterialsType.materialTypeSelection ===
              TypeMaterialsSelection.FLASHSETCARD && (
              <TiTick className="flex-none translate-y-[-2px] text-[2rem]" />
            )}
          </div>

          <div
            className={classNames(
              "flex items-center px-[24px] py-[8px] hover:bg-[var(--color-text-blacklight)]",
              modalMaterialsType.materialTypeSelection ===
                TypeMaterialsSelection.FOLDER,
              "text-[var(--border-color)]"
            )}
          >
            <PiCards className="text-[1.6rem] translate-y-[-2px] mr-3" />
            <span className="flex-[2]">Folders</span>

            {modalMaterialsType.materialTypeSelection ===
              TypeMaterialsSelection.FOLDER && (
              <TiTick className="flex-none translate-y-[-2px] text-[2rem]" />
            )}
          </div>
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
