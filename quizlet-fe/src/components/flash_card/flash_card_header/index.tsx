import "./FlashCardHeader.scss";

import { Button } from "../../../shared/components";
import { FaShareSquare } from "react-icons/fa";
import { MdOutlineSaveAlt } from "react-icons/md";
import { CiFolderOn } from "react-icons/ci";
import { HiDotsHorizontal } from "react-icons/hi";

type FlashCardHeaderProps = {
  name: string;
};

export default function FlashCardHeader({
  name,
}: Readonly<FlashCardHeaderProps>) {
  return (
    <div className="flashcard__header-container">
      <div className="flex items-center justify-between">
        <div className="flex items-center text-white font-bold text-[1.4rem]">
          <CiFolderOn className="text-[2rem] mr-3" />
          <span>IETLS Folder</span>
        </div>

        <div className="flex items-center text-white">
          <Button className="flashcard__header-btn">
            <MdOutlineSaveAlt className="mr-3" />
            Saved
          </Button>
          <Button className="flashcard__header-btn border__only">
            <FaShareSquare />
          </Button>
          <Button className="flashcard__header-btn border__only">
            <HiDotsHorizontal />
          </Button>
        </div>
      </div>

      {/*Name of the flashset */}
      <h1 className="text-[2.6rem] text-white font-bold my-5">{name}</h1>
      {/*Name of the flashset */}
    </div>
  );
}
