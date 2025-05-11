import { Button, PopperWrapper } from "@/shared/components";
import { FaPlus } from "react-icons/fa";
import { MdFilterList } from "react-icons/md";

export default function ModalMaterialsActions() {
  return (
    <div className="flex items-center justify-between mt-[25px] mb-10">
      <div className="flex items-center text-[1.25rem] text-white px-6 py-3 border-2 border-transparent font-bold rounded-[50px] text-[var(--ref-color-twilight300)] cursor-pointer hover:text-white hover:bg-[var(--color-text-blacklight)] hover:border-[var(--ref-color-twilight300)] duration-200">
        <span>Flashcard Sets</span>
        <MdFilterList className="translate-y-[-2px] ml-3" />

        <PopperWrapper>
          <div>Flashcard sets</div>
          <div>Flashcard sets</div>
          <div>Flashcard sets</div>
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
