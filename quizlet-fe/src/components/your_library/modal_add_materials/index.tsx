import { Modal, Skeleton } from "@/shared/components";

import { ReactPropsChildren } from "@/type";
import ModalMaterialsActions from "./modal_materials_selection";

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
  isLoading?: boolean;
  onClose: () => void;
  children: ReactPropsChildren;
};

export default function ModalAddMaterials({
  isLoading,
  isShowModal,
  onClose,
  children,
}: Readonly<ModalAddMaterialsProps>) {
  return (
    <Modal
      onClose={onClose}
      isOpen={isShowModal}
      className="modal__folder-creation h-[400px] overflow-y-auto"
      isShowCloseIcon={true}
    >
      <h1 className="text-[2.6rem] font-bold leading-6">Add study materials</h1>

      <div className="mt-5">
        {/**
         * Loading spinner
         */}
        {isLoading && (
          <Skeleton
            variant="section"
            className="w-full flex flex-col"
            times={1}
          >
            <Skeleton
              textBars={3}
              className="mt-5"
              variant="text"
              height="45px"
              width="100%"
            />

            <Skeleton
              className="mt-5 items-end"
              variant="button"
              height="45px"
              width="100px"
            />
          </Skeleton>
        )}

        <>
          {!isLoading && (
            <>
              <ModalMaterialsActions />
              {children}
            </>
          )}
        </>
      </div>
    </Modal>
  );
}
