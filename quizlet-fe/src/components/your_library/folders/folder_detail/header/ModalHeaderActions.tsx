import { memo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CiFolderOn } from "react-icons/ci";

import { folderSchema } from "@/schemas";
import { Button, ErrorMessage, Input, Modal } from "@/shared/components";
import {
  ApiErrorResponse,
  FolderCreateUpdateRequestDTO,
  FolderSummaryDTO,
} from "@/type";
import { useDeleteFolderMutation, useUpdateFolderMutation } from "@/store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

/**
 * Component to resolve all actions of the Modal Header
 */
type ModalHeaderActionsProps = {
  folder: FolderSummaryDTO;
  isShowModalUpdate: boolean;
  onCloseModalEdit: () => void;
  isShowModalDelete: boolean;
  onCloseModalDelete: () => void;
};

type ModalActionsProps = {
  folder: FolderSummaryDTO;
  isShowModal: boolean;
  onClose: () => void;
};

/**
 * Modal Edit Folder
 */
const ModalEditFolder = ({
  folder,
  isShowModal,
  onClose,
}: ModalActionsProps) => {
  const [updateFolder, { isLoading }] = useUpdateFolderMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FolderCreateUpdateRequestDTO>({
    resolver: zodResolver(folderSchema),
    defaultValues: {
      name: folder.name,
      description: folder.description,
      flashSetIds: [],
      folderChildIds: [],
    },
  });

  const handleOnSubmit = (data: FolderCreateUpdateRequestDTO) => {
    updateFolder({ id: folder.id, folderCreateDTO: data })
      .unwrap()
      .then((data) => {
        toast.success(`${data.name} update successfully`);
        onClose();
      })
      .catch((error) => {
        const apiError = error as ApiErrorResponse;
        toast.error(apiError.data.message);
      });
  };

  return (
    <Modal
      className="w-[480px] text-white bg-[var(--ref-color-twilight900)] rounded-2xl"
      isOpen={isShowModal}
      onClose={onClose}
      isShowCloseIcon={true}
    >
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className="flex flex-col justify-center p-10"
      >
        <div className="flex flex-col items-center">
          <CiFolderOn className="mb-5 text-[4.2rem] font-bold" />

          <Input
            type="text"
            variant="mode-black"
            control={control}
            name="name"
            outsideClassName="w-full"
            className="font-bold bg-transparent hover:bg-[var(--gray-300-gray-600)]"
            placeholder="Enter your folder name"
          />
          <ErrorMessage className="w-full" message={errors.name?.message} />

          <Input
            control={control}
            name="description"
            type="textarea"
            placeholder="Description"
            variant="mode-black"
            outsideClassName="w-full"
            className="min-h-[200px] mt-5 transition-all duration-700"
          />
          <ErrorMessage
            className="w-full"
            message={errors.description?.message}
          />
        </div>

        <div className="flex justify-end mt-5">
          <Button
            variant="primary"
            className="text-right border-none w-[75px] hover:border-[var(--ref-color-twilight900)]"
            onClick={handleSubmit(handleOnSubmit)}
            isLoading={isLoading}
          >
            Done
          </Button>
        </div>
      </form>
    </Modal>
  );
};

/**
 * Modal Deletion
 */
const ModalDeleteFolder = ({
  folder,
  isShowModal,
  onClose,
}: ModalActionsProps) => {
  const [deleteFolder, { isLoading }] = useDeleteFolderMutation();
  const navigate = useNavigate();

  const handleDeleteFolder = () => {
    deleteFolder(folder.id)
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        const apiError = error as ApiErrorResponse;
        console.log("Error while deleting Folder {ModalHeaderActions} ", error);
        toast.error(
          apiError.data.message ||
            "Unexpected while deleting your Folder. Please try it again."
        );
      });
  };

  return (
    <Modal
      className="top-[30%] p-[32px] rounded-3xl"
      onClose={onClose}
      isOpen={isShowModal}
      isShowCloseIcon
    >
      <h1 className="text-[3.2rem] text-white font-bold">
        Delete this folder?
      </h1>

      <p className="text-[1.6rem] font-medium">
        The folder will be deleted permanently, but you'll be able to find the
        items from it in your library.
      </p>

      <div className="flex items-center justify-end">
        <Button
          onClick={onClose}
          variant="borderOnly"
          className="text-white rounded-full mr-5"
        >
          Cancel
        </Button>

        <Button
          onClick={handleDeleteFolder}
          variant="borderOnly"
          className="bg-red-600 text-white rounded-full"
          isLoading={isLoading}
        >
          Delete Folder
        </Button>
      </div>
    </Modal>
  );
};

const ModalHeaderActions = memo(
  ({
    folder,
    isShowModalUpdate,
    onCloseModalEdit,
    isShowModalDelete,
    onCloseModalDelete,
  }: ModalHeaderActionsProps) => {
    return (
      <>
        <ModalEditFolder
          folder={folder}
          isShowModal={isShowModalUpdate}
          onClose={onCloseModalEdit}
        />

        <ModalDeleteFolder
          folder={folder}
          isShowModal={isShowModalDelete}
          onClose={onCloseModalDelete}
        />
      </>
    );
  }
);

export default ModalHeaderActions;
