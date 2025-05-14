import { useDispatch, useSelector } from "react-redux";
import { FC, useEffect } from "react";

import { CiFolderOn } from "react-icons/ci";
import { PiCards } from "react-icons/pi";
import { LuFolderHeart } from "react-icons/lu";
import { FaFolderOpen, FaPlus } from "react-icons/fa";

import ModalMaterialsActions from "./modal_materials_selection";
import { CardItem, EmptyComponent, Modal, Skeleton } from "@/shared/components";
import { FlashSetSummaryDTO, FolderSummaryDTO, ThunkState } from "@/type";
import {
  AppDispatch,
  fetchFlashSets,
  fetchFolders,
  RootState,
  TypeMaterialsSelection,
} from "@/store";

type FlashSetState = ThunkState<FlashSetSummaryDTO>;
type FolderState = ThunkState<FolderSummaryDTO>;

interface DisplayContentProps {
  fetchFoldersState: FolderState;
  fetchFlashSetsState: FlashSetState;
  materialTypeSelected: TypeMaterialsSelection;
  onAddItem?: (item: FolderSummaryDTO | FlashSetSummaryDTO) => void;
}

type ModalAddMaterialsProps = {
  isShowModal: boolean;
  onClose: () => void;
};

// Empty component
const EmptyState: FC = () => (
  <EmptyComponent className="flex flex-col items-center">
    <div className="flex gap-3 text-5xl mt-5 mb-7">
      <LuFolderHeart className="text-[var(--pink-100-white-600)]" />
      <FaFolderOpen className="text-[var(--color-primary)]" />
    </div>
    <div className="text-lg text-white font-semibold my-5 text-center">
      <p>Your folders and flashcard sets are empty.</p>
      <p className="mt-5">
        Create a new folder or flashcard set using the button above.
      </p>
    </div>
  </EmptyComponent>
);

// Common loading state component
const LoadingState: FC = () => (
  <Skeleton variant="section" className="w-full flex flex-col" times={1}>
    <Skeleton textBars={3} variant="text" height="45px" width="100%" />
  </Skeleton>
);

// Card item renderer
const renderCardItem = (
  item: FolderSummaryDTO | FlashSetSummaryDTO,
  isFolder: boolean
) => (
  <CardItem key={item.id} className="flex items-center duration-300 rounded-lg">
    <div className="flex w-full">
      {isFolder ? (
        <CiFolderOn className="p-[10px] h-[40px] w-[40px] rounded-[5px] bg-[var(--gray-100-gray-700)] text-[#51cfff]" />
      ) : (
        <PiCards className="p-[10px] h-[40px] w-[40px] rounded-[5px] bg-[var(--gray-100-gray-700)] text-[#51cfff]" />
      )}

      <div className="ml-4 text-white flex flex-col justify-between">
        <p className="text-[1.4rem] font-extrabold">{item.name}</p>
        {isFolder ? (
          <div className="text-[1.2rem] font-[600]">
            {(item as FolderSummaryDTO).description && (
              <>
                <span>{(item as FolderSummaryDTO).description}</span>
                <span className="mx-3">-</span>
              </>
            )}
            <span>
              {(item as FolderSummaryDTO).numberOfFlashSets} flashsets
            </span>
            <span className="mx-3">-</span>
            <span>
              {(item as FolderSummaryDTO).numberOfChildrenFolders} folders
            </span>
          </div>
        ) : (
          <div className="text-[1.2rem] font-[600]">
            <span>{(item as FlashSetSummaryDTO).description}</span>
            <span className="mx-3">-</span>
            <span>{(item as FlashSetSummaryDTO).flashSetItemCount} cards</span>
          </div>
        )}
      </div>
    </div>

    <button className="flex justify-center items-center rounded-[50%] p-3 h-[40px] w-[40px] duration-700 bg-transparent hover:bg-[var(--gray-200-gray-900)]">
      <FaPlus className="flex justify-center items-center rounded-[50%] h-[24px] w-[24px] p-2 border-white border-2 text-[1rem]" />
    </button>
  </CardItem>
);

// DisplayContent component: Renders content based on folder/flash set states and material selection
const DisplayContent: FC<DisplayContentProps> = ({
  fetchFoldersState,
  fetchFlashSetsState,
  materialTypeSelected,
}) => {
  // Handle loading state
  if (fetchFoldersState.isLoading || fetchFlashSetsState.isLoading) {
    return <LoadingState />;
  }

  // Handle empty state
  if (
    (materialTypeSelected === TypeMaterialsSelection.FOLDER &&
      fetchFoldersState.data.length === 0) ||
    (materialTypeSelected === TypeMaterialsSelection.FLASHSETCARD &&
      fetchFlashSetsState.data.length === 0)
  ) {
    return <EmptyState />;
  }

  // Render items based on material type
  const items =
    materialTypeSelected === TypeMaterialsSelection.FOLDER
      ? fetchFoldersState.data
      : fetchFlashSetsState.data;

  return items.map((item) =>
    renderCardItem(item, materialTypeSelected === TypeMaterialsSelection.FOLDER)
  );
};

/**
 * ? This Modal using to add more Folders or Flashsets
 * @param isShowModal
 * @param listMaterials (FlashSetSummaryDTO[] | FolderSummaryDTO[])
 * @param onClose () => void; Close the Modal
 * @param children Add the rest of component
 * @param
 */
const ModalAddMaterials = ({
  isShowModal,
  onClose,
}: Readonly<ModalAddMaterialsProps>) => {
  const dispatch = useDispatch<AppDispatch>();

  const modalMaterialsOption = useSelector(
    (rootState: RootState) => rootState.modalMaterialSlices
  );

  const fetchFlashSetsState = useSelector(
    (rootState: RootState) => rootState.flashSetSlice
  );
  const foldersState = useSelector(
    (rootState: RootState) => rootState.folderSlice
  );

  useEffect(() => {
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
  }, [dispatch, modalMaterialsOption]);

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

        <DisplayContent
          materialTypeSelected={modalMaterialsOption.materialTypeSelected}
          fetchFoldersState={foldersState}
          fetchFlashSetsState={fetchFlashSetsState}
        />
      </div>
    </Modal>
  );
};

export default ModalAddMaterials;
