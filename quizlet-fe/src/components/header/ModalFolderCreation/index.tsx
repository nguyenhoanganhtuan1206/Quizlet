import "./ModalFolderCreation.scss";

import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { folderSchema } from "@/schemas";
import { FolderCreateUpdateRequestDTO } from "@/type";
import {
  Button,
  ErrorMessage,
  Input,
  Modal,
  MultipleSelect,
  Skeleton,
} from "@/shared/components";
import { SelectOptionProps } from "@/type/form/Input";
import {
  AppDispatch,
  fetchFolders,
  RootState,
  useCreateFolderMutation,
} from "@/store";

type ModalFolderCreationProps = {
  isShowModal: boolean;
  setIsShowModal: (isShow: boolean) => void;
  onClose: () => void;
};

export default function ModalFolderCreation({
  isShowModal,
  setIsShowModal,
  onClose,
}: Readonly<ModalFolderCreationProps>) {
  const fetchFoldersState = useSelector(
    (rootState: RootState) => rootState.folderSlice
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [createFolder, { isLoading }] = useCreateFolderMutation();

  useEffect(() => {
    if (isShowModal) {
      dispatch(fetchFolders());
    }
  }, [isShowModal, dispatch]);

  /*
   * Define the FolderCreationDTO for @useForm
   */
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FolderCreateUpdateRequestDTO>({
    resolver: zodResolver(folderSchema),
    defaultValues: {
      name: "",
      description: "",
      folderChildIds: [],
      flashSetIds: [],
    },
  });

  const initialFolderOptions: SelectOptionProps[] = fetchFoldersState.data.map(
    (folder): SelectOptionProps => ({
      title: folder.name,
      value: folder.id,
    })
  );

  /**
   * Handle submit create new Folder
   * @param data @FolderCreateUpdateRequestDTO
   */
  const handleOnSubmit = (data: FolderCreateUpdateRequestDTO) => {
    createFolder(data)
      .unwrap()
      .then((data) => {
        reset();
        toast.success("Create the new folder successfully!");
        setIsShowModal(false);

        navigate(`/libraries/folders/${data.id}`, { replace: true });
      })
      .catch((error) => {
        console.error(
          "Error while create the new Folder {ModelFolderCreation} ",
          error.data.message
        );
        toast.error(error.data.message);
      });
  };

  return (
    <Modal
      onClose={onClose}
      className="modal__folder-creation h-[400px] overflow-y-auto"
      isOpen={isShowModal}
      isShowCloseIcon={true}
    >
      <h1 className="text-[2.6rem] font-bold leading-6">Create new folder</h1>

      {/*
       * Loading Folders
       */}
      {fetchFoldersState.isLoading && (
        <Skeleton variant="section" className="w-full flex flex-col" times={1}>
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
      {/*
       * Loading Folders
       */}

      {!fetchFoldersState.isLoading && (
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <Input
            control={control}
            name="name"
            variant="mode-black"
            placeholder="Title"
            type="text"
            className="mt-10 transition-all duration-700"
          />
          <ErrorMessage message={errors.name?.message} />

          <Input
            control={control}
            name="description"
            type="textarea"
            placeholder="Description"
            variant="mode-black"
            className="min-h-[200px] mt-5 transition-all duration-700"
          />
          <ErrorMessage message={errors.description?.message} />

          <MultipleSelect
            className="mt-3"
            control={control}
            name="folderChildIds"
            listOptions={initialFolderOptions}
            variant="mode-black"
          />

          <div className="flex justify-end mt-12">
            <Button
              variant="primary"
              type="submit"
              className="flex justify-end w-fit rounded-lg"
              onSubmit={handleSubmit(handleOnSubmit)}
              isLoading={isLoading}
            >
              Create Folder
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
