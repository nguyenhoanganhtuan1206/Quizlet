import { useDispatch } from "react-redux";

import { PiCards } from "react-icons/pi";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { GoClock } from "react-icons/go";
import { FaPencil } from "react-icons/fa6";
import { FaRegShareSquare } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";

import {
  AppDispatch,
  setIsShowModalMaterials,
  setMaterialType,
  TypeMaterialsSelection,
} from "@/store";

import { FolderSummaryDTO } from "@/type";
import { Button, PopperWrapper } from "@/shared/components";
import { useState } from "react";
import ModalHeaderActions from "./ModalHeaderActions";

type FolderDetailHeaderProps = {
  folderDetails: FolderSummaryDTO;
  className?: string;
};

type ModalHeaderActionsProps = {
  folder: FolderSummaryDTO;
  isShowModalUpdate: boolean;
  setIsShowModalUpdate: (isShowModal: boolean) => void;
  isShowModalDelete: boolean;
  setIsShowModalDelete: (isShowModal: boolean) => void;
};

/**
 * Display Folder Header Actions Edit, Share and Delete.
 * @param folder
 * @param isShowModalUpdate
 * @param setIsShowModalUpdate
 */
const DisplayHeaderActions = ({
  folder,
  isShowModalUpdate,
  setIsShowModalUpdate,
  isShowModalDelete,
  setIsShowModalDelete,
}: ModalHeaderActionsProps) => {
  const [isShowFolderActions, setIsShowModalActions] = useState(false);

  const handleOnCloseModalUpdate = () => {
    setIsShowModalUpdate(false);
  };

  const handleOnCloseModalDelete = () => {
    setIsShowModalDelete(false);
  };

  return (
    <>
      <Button
        variant="borderOnly"
        onClick={() => setIsShowModalActions(!isShowFolderActions)}
        className="relative text-white border border-gray-500 rounded-[50%] h-[40px] w-[40px] hover:bg-[var(--gray-300-gray-600)] duration-100"
      >
        <HiOutlineDotsHorizontal />

        <PopperWrapper
          variant="subPrimary"
          className="absolute top-[110%] right-0 w-[220px] py-[8px] rounded-xl border border-[var(--gray-300-gray-600)]"
          isActive={isShowFolderActions}
        >
          <div
            onClick={() => setIsShowModalUpdate(true)}
            className="flex items-center px-[24px] py-[8px] hover:bg-[var(--gray-300-gray-600)] text-left"
          >
            <FaPencil className="text-[1.8rem] translate-y-[-1px] mr-5" />
            Edit
          </div>
          <div className="flex items-center px-[24px] py-[8px] hover:bg-[var(--gray-300-gray-600)] text-left">
            <FaRegShareSquare className="text-[1.8rem] translate-y-[-1px] mr-5" />
            Share
          </div>
          <div
            onClick={() => setIsShowModalDelete(true)}
            className="flex items-center px-[24px] py-[8px] text-red-400 hover:bg-[var(--gray-300-gray-600)] text-left"
          >
            <FaRegTrashAlt className="text-[1.8rem] translate-y-[-1px] mr-5" />
            Delete
          </div>
        </PopperWrapper>
      </Button>

      <ModalHeaderActions
        folder={folder}
        isShowModalUpdate={isShowModalUpdate}
        onCloseModalEdit={handleOnCloseModalUpdate}
        isShowModalDelete={isShowModalDelete}
        onCloseModalDelete={handleOnCloseModalDelete}
      />
    </>
  );
};

export default function FolderDetailHeader({
  folderDetails,
  className,
}: FolderDetailHeaderProps) {
  // Redux state
  const dispatch = useDispatch<AppDispatch>();
  const [isShowModalUpdate, setIsShowModalUpdate] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);

  const handleOnSelectMaterialOption = () => {
    dispatch(setMaterialType(TypeMaterialsSelection.FLASHSETCARD));
    dispatch(setIsShowModalMaterials(true));
  };

  return (
    <>
      <div
        className={`${className} flex justify-between items-start text-white`}
      >
        <div>
          <h1 className="text-[3rem] font-bold">{folderDetails.name}</h1>

          {folderDetails.description && (
            <h3 className="text-[1.8rem] mt-5 font-semibold">
              Description: {folderDetails.description}
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

        {/*
         * Actions Folder Header
         */}
        <div className="flex items-center gap-4">
          <Button
            variant="borderOnly"
            className="h-[40px] rounded-[5px] text-white hover:bg-[var(--gray-300-gray-600)] duration-200"
          >
            Study
          </Button>

          <Button
            variant="borderOnly"
            className="flex items-center text-white border border-gray-500 rounded-[5px] h-[40px] hover:bg-[var(--gray-300-gray-600)] duration-100"
            onClick={handleOnSelectMaterialOption}
          >
            <PiCards className="text-[1.8rem] mr-3" />
            <span className="text-[1.2rem]">Add Materials</span>
          </Button>

          <DisplayHeaderActions
            folder={folderDetails}
            isShowModalUpdate={isShowModalUpdate}
            setIsShowModalUpdate={setIsShowModalUpdate}
            isShowModalDelete={isShowModalDelete}
            setIsShowModalDelete={setIsShowModalDelete}
          />
        </div>
      </div>
    </>
  );
}
