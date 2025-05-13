import { useDispatch, useSelector } from "react-redux";

import { PiCards } from "react-icons/pi";
import { CiFolderOn } from "react-icons/ci";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { GoClock } from "react-icons/go";
import { FaPlus } from "react-icons/fa";

import {
  AppDispatch,
  RootState,
  setIsShowModalMaterials,
} from "@/store";

import { Folder } from "@/type";
import { Button, CardItem } from "@/shared/components";
import { ModalAddMaterials } from "@/components/your_library/";

type FolderDetailHeaderProps = {
  folderDetails: Folder;
  className?: string;
};

export default function FolderDetailHeader({
  folderDetails,
  className,
}: FolderDetailHeaderProps) {
  // Redux state
  const dispatch = useDispatch<AppDispatch>();
  const materialsModal = useSelector(
    (state: RootState) => state.modalMaterialSlices
  );
  const flashSetState = useSelector((state: RootState) => state.flashSetSlice);
  const folderState = useSelector((state: RootState) => state.folderSlice);

  const handleOnSelectMaterialOption = () => {
    // need to handle in there
  };
  
  const handleCloseModal = () => {
    dispatch(setIsShowModalMaterials(false));
  };

  return (
    <div className={`${className} flex justify-between items-start text-white`}>
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

        <Button
          variant="borderOnly"
          className="text-white border border-gray-500 rounded-[50%] h-[40px] w-[40px] hover:bg-[var(--gray-300-gray-600)] duration-100"
        >
          <HiOutlineDotsHorizontal />
        </Button>
      </div>
      {/*
       * Actions Folder Header
       */}

      {/*
       * Modal Add Materials
       */}
      <ModalAddMaterials
        isLoading={flashSetState.isLoading || folderState.isLoading}
        isShowModal={materialsModal.isShowModalMaterials}
        onClose={handleCloseModal}
      >
        {/**
         * Folders List
         */}
        {materialsModal.listFolders &&
          materialsModal.listFolders.length > 0 &&
          materialsModal.listFolders.map((folder, index) => {
            return (
              <CardItem
                key={index}
                className="flex items-center duration-300 rounded-lg"
              >
                <div className="flex w-full">
                  <CiFolderOn className="p-[10px] h-[40px] w-[40px] rounded-[5px] bg-[var(--gray-100-gray-700)] text-[#51cfff]" />

                  <div className="ml-4 text-white flex flex-col justify-between">
                    <p className="text-[1.4rem] font-extrabold">
                      {folder.name}
                    </p>
                    <span className="text-[1.2rem] font-[600]">
                      {folder.description && (
                        <>
                          <span>{folder.description}</span>
                          <span className="mx-3">-</span>
                        </>
                      )}
                      <span>{folder.numberOfFlashSets} flashsets</span>
                      <span className="mx-3">-</span>
                      <span>{folder.numberOfChildrenFolders} folders</span>
                    </span>
                  </div>
                </div>

                <button className="flex justify-center items-center rounded-[50%] p-3 h-[40px] w-[40px] duration-700 bg-transparent hover:bg-[var(--gray-200-gray-900)]">
                  <FaPlus className="flex justify-center items-center rounded-[50%] h-[24px] w-[24px] p-2 border-white border-2 text-[1rem]" />
                </button>
              </CardItem>
            );
          })}
        {/**
         * Folders List
         */}

        {/**
         * Flashsets List
         */}
        {materialsModal.materialTypeSelected &&
          materialsModal.listFlashSets.length > 0 &&
          materialsModal.listFlashSets.map((flashset, index) => {
            return (
              <CardItem
                key={index}
                className="flex items-center duration-300 rounded-lg"
              >
                <div className="flex w-full">
                  <PiCards className="p-[10px] h-[40px] w-[40px] rounded-[5px] bg-[var(--gray-100-gray-700)] text-[#51cfff]" />

                  <div className="ml-4 text-white flex flex-col justify-between">
                    <p className="text-[1.4rem] font-extrabold">
                      {flashset.name}
                    </p>
                    <span className="text-[1.2rem] font-[600]">
                      <span>{flashset.description}</span>
                      <span className="mx-3">-</span>
                      <span>{flashset.flashSetItemCount}</span>
                    </span>
                  </div>
                </div>

                <button className="flex justify-center items-center rounded-[50%] p-3 h-[40px] w-[40px] duration-700 bg-transparent hover:bg-[var(--gray-200-gray-900)]">
                  <FaPlus className="flex justify-center items-center rounded-[50%] h-[24px] w-[24px] p-2 border-white border-2 text-[1rem]" />
                </button>
              </CardItem>
            );
          })}
        {/**
         * Flashsets List
         */}
      </ModalAddMaterials>
    </div>
  );
}
