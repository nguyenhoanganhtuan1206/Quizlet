import { useDispatch } from "react-redux";

import { PiCards } from "react-icons/pi";
import { CiFolderOn } from "react-icons/ci";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { GoClock } from "react-icons/go";

import { Button } from "../../../../../shared/components";
import { Folder } from "../../../../../type";
import { AppDispatch } from "../../../../../store";

type FolderDetailHeaderProps = {
  folderDetails: Folder;
  className?: string;
};

export default function FolderDetailHeader({
  folderDetails,
  className,
}: FolderDetailHeaderProps) {
  const dispatch = useDispatch<AppDispatch>();
  
  return (
    <div className={`${className} flex justify-between items-start text-white`}>
      <div>
        <h1 className="text-[3rem] font-bold">{folderDetails.name}</h1>

        {folderDetails.description && (
          <h3 className="text-[1.8rem] mt-5 font-semibold">
            Description: 
            {" "}{folderDetails.description}
          </h3>
        )}

        {folderDetails.updatedAt && (
          <p className="text-[1.4rem] mt-3 flex items-center font-semibold">
            <GoClock className="mr-2" />
            <span className="translate-y-[1px]">
              Modified at
              {folderDetails.updatedAt}
            </span>
          </p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="borderOnly"
          className="h-[40px] rounded-[5px] text-white hover:bg-[var(--twilight-100-gray-600)] duration-200"
        >
          Study
        </Button>

        <Button
          variant="borderOnly"
          className="flex items-center text-white border border-gray-500 rounded-[5px] h-[40px] hover:bg-[var(--twilight-100-gray-600)] duration-100"
        >
          <PiCards className="text-[1.8rem] mr-3" />
          <span className="text-[1.2rem]">Add Flashset</span>
        </Button>

        <Button
          variant="borderOnly"
          className="flex items-center text-white border border-gray-500 rounded-[5px] h-[40px] hover:bg-[var(--twilight-100-gray-600)] duration-100"
        >
          <CiFolderOn className="text-[1.8rem] mr-3" />
          <span className="text-[1.2rem]">Add Folder</span>
        </Button>

        <Button
          variant="borderOnly"
          className="text-white border border-gray-500 rounded-[50%] h-[40px] w-[40px] hover:bg-[var(--twilight-100-gray-600)] duration-100"
        >
          <HiOutlineDotsHorizontal />
        </Button>
      </div>
    </div>
  );
}
