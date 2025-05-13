import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CiFolderOn } from "react-icons/ci";
import { PiCards } from "react-icons/pi";
import { LuFolderHeart } from "react-icons/lu";
import { FaFolderOpen, FaPlus } from "react-icons/fa";

import { CardItem, EmptyComponent, Modal, Skeleton } from "@/shared/components";
import ModalMaterialsActions from "./modal_materials_selection";
import {
  AppDispatch,
  fetchFlashSets,
  fetchFolders,
  RootState,
  TypeMaterialsSelection,
} from "@/store";

/**
 * ? This Modal using to add more Folders or Flashsets
 * @param isShowModal
 * @param listMaterials (FlashSetSummaryDTO[] | FolderSummaryDTO[])
 * @param onClose () => void; Close the Modal
 * @param children Add the rest of component
 * @param
 */

type ModalAddMaterialsProps = {
  isShowModal: boolean;
  onClose: () => void;
};

export default function ModalAddMaterials({
  isShowModal,
  onClose,
}: Readonly<ModalAddMaterialsProps>) {
  const dispatch = useDispatch<AppDispatch>();
  const modalMaterialsOption = useSelector(
    (rootState: RootState) => rootState.modalMaterialSlices
  );

  const fetchFlashSetsState = useSelector(
    (rootState: RootState) => rootState.flashSetSlice
  );
  const fetchFoldersState = useSelector(
    (rootState: RootState) => rootState.folderSlice
  );

  useEffect(() => {
    if (isShowModal) {
      if (
        modalMaterialsOption.materialTypeSelected ===
        TypeMaterialsSelection.FLASHSETCARD
      ) {
        dispatch(fetchFlashSets());
      }

      if (
        modalMaterialsOption.materialTypeSelected ===
        TypeMaterialsSelection.FOLDER
      ) {
        dispatch(fetchFolders());
      }
    }
  }, [isShowModal, modalMaterialsOption.materialTypeSelected]);

  /**
   *  Fetch FlashSets or Folders
   * @returns flashSetList or folderList
   */
  const renderedContent = useCallback(() => {
    /**
     * Loading Spinner
     */
    if (fetchFoldersState.isLoading || fetchFlashSetsState.isLoading) {
      return (
        <Skeleton variant="section" className="w-full flex flex-col" times={1}>
          <Skeleton textBars={3} variant="text" height="45px" width="100%" />
        </Skeleton>
      );
    }
    /**
     * Loading Spinner
     */

    /**
     * If flashSet or folders is empty
     * @returns @EmptyComponent
     */
    if (fetchFlashSetsState || fetchFoldersState) {
      if (
        fetchFlashSetsState.data.length == 0 ||
        fetchFoldersState.data.length === 0
      ) {
        return (
          <EmptyComponent className="flex-col">
            <div className="flex text-[3.4rem] mt-5 mb-7">
              <LuFolderHeart className="text-[var(--pink-100-white-600)] mr-3" />
              <FaFolderOpen className="text-[var(--color-primary)]" />
            </div>

            <div className="text-[1.6rem] text-white font-semibold my-5 text-center">
              <span>Your current Folder and FlashSet Cards is empty.</span>
              <p className="mt-5">
                Let’s start to create new folder and flash set in the button
                above.
              </p>
            </div>
          </EmptyComponent>
        );
      }
    }

    /**
     * If flashSet or folders is empty
     * @returns @FolderSummary or @FlashSetSummaryDTO
     */
    if (
      modalMaterialsOption.materialTypeSelected ===
      TypeMaterialsSelection.FLASHSETCARD
    ) {
      return fetchFlashSetsState.data.map((flashset, index) => (
        <CardItem
          key={index}
          className="flex items-center duration-300 rounded-lg"
        >
          <div className="flex w-full">
            <PiCards className="p-[10px] h-[40px] w-[40px] rounded-[5px] bg-[var(--gray-100-gray-700)] text-[#51cfff]" />

            <div className="ml-4 text-white flex flex-col justify-between">
              <p className="text-[1.4rem] font-extrabold">{flashset.name}</p>
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
      ));
    }

    if (
      modalMaterialsOption.materialTypeSelected ===
      TypeMaterialsSelection.FOLDER
    ) {
      return fetchFoldersState.data.map((folder, index) => (
        <CardItem
          key={index}
          className="flex items-center duration-300 rounded-lg"
        >
          <div className="flex w-full">
            <CiFolderOn className="p-[10px] h-[40px] w-[40px] rounded-[5px] bg-[var(--gray-100-gray-700)] text-[#51cfff]" />

            <div className="ml-4 text-white flex flex-col justify-between">
              <p className="text-[1.4rem] font-extrabold">{folder.name}</p>
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
      ));
    }
  }, [
    modalMaterialsOption.materialTypeSelected,
    fetchFlashSetsState,
    fetchFoldersState,
  ]);

  return (
    <Modal
      onClose={onClose}
      isOpen={isShowModal}
      className="modal__folder-creation h-[400px] overflow-y-auto"
      isShowCloseIcon={true}
    >
      <h1 className="text-[2.6rem] font-bold leading-6">Add study materials</h1>

      <div className="mt-5">
        <ModalMaterialsActions />

        <>{renderedContent()}</>
      </div>
    </Modal>
  );
}
