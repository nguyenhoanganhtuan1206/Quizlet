import "./ModalFolderCreation.scss";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  Input,
  Modal,
  Skeleton,
  MultipleSelect,
} from "../../../shared/components";
import { AppDispatch, RootState } from "../../../store";
import { fetchFolders } from "../../../store/thunks";
import { SelectOptionProps } from "../../../type/form/Input";

type ModalFolderCreationProps = {
  isShowModal: boolean;
  onClosed: () => void;
};

type FormModalCreationValues = {
  name: string;
  description: string;
  parent_id: string[];
};

export default function ModalFolderCreation({
  isShowModal,
  onClosed,
}: Readonly<ModalFolderCreationProps>) {
  const fetchFoldersState = useSelector(
    (rootState: RootState) => rootState.folderSlice
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isShowModal) {
      dispatch(fetchFolders());
    }
  }, [isShowModal, dispatch]);

  const { control } = useForm<FormModalCreationValues>({
    defaultValues: {
      name: "",
      description: "",
      parent_id: [],
    },
  });

  const initialFolderOptions: SelectOptionProps[] = fetchFoldersState.data.map(
    (folder): SelectOptionProps => ({
      title: folder.name,
      value: folder.id,
    })
  );

  return (
    <Modal
      onClosed={onClosed}
      className="modal__folder-creation h-[400px] overflow-hidden"
      isOpen={isShowModal}
      isShowCloseIcon={true}
    >
      <h1 className="text-[2.6rem] font-bold leading-6">Create new folder</h1>

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

      {!fetchFoldersState.isLoading && (
        <form>
          <Input
            control={control}
            name="name"
            variant="mode-black"
            placeholder="Title"
            type="text"
            className="mt-10 transition-all duration-700"
          />

          <Input
            control={control}
            name="description"
            type="textarea"
            placeholder="Description"
            variant="mode-black"
            className="h-[180px] mt-5 transition-all duration-700"
          />

          <MultipleSelect
            control={control}
            name="parent_id"
            options={initialFolderOptions}
            variant="mode-black"
          />

          <div className="flex justify-end mt-12">
            <Button variant="primary" className="w-fit rounded-lg">
              Create Folder
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
