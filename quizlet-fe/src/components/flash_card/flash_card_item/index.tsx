import "./FlashCardTerm.scss";
import { FaRegStar } from "react-icons/fa";
import { FaPen } from "react-icons/fa";

export default function FlashCardItem() {
  return (
    <div className="flex text-white text-[1.4rem] w-full px-[24px] py-[20px] bg-[var(--gray-100-gray-700)] rounded-xl h-fit">
      <div className="flex w-[calc(100%-4.5rem)] gap-3">
        <div className="border-r-[1.5px] border-[var(--gray-200-gray-900)] pr-[12px] min-w-[120px] max-w-[200px]">
          <p className="break-words font-semibold">question</p>
        </div>
        <div className="pl-[8px] flex-1 overflow-hidden">
          <p className="break-words">
            answer
            answeransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweranswer1answeransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweranswer23answeransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweranswer3
          </p>
        </div>
      </div>
      <div className="flex items-start text-[2.2rem] text-white ml-3">
        <button className="hover:opacity-80 mr-3 transition-colors duration-200">
          <FaRegStar />
        </button>
        <button className="hover:opacity-80 transition-colors duration-200">
          <FaPen />
        </button>
      </div>
    </div>
  );
}
