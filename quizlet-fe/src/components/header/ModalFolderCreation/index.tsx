import "./ModalFolderCreation.scss";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { folderSchema } from "@/schemas";
import {
  Button,
  Input,
  Modal,
  MultipleSelect,
  Skeleton,
} from "@/shared/components";
import { SelectOptionProps } from "@/type/form/Input";
import { AppDispatch, fetchFolders, RootState } from "@/store";

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

  const { control, handleSubmit, getValues } = useForm<FormModalCreationValues>({
    resolver: zodResolver(folderSchema),
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

  const handleOnSubmit = () => {
    console.log("getValues", getValues("name"));
    
  };

  return (
    <Modal
      onClosed={onClosed}
      className="modal__folder-creation h-[400px] overflow-y-auto"
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
        <form onSubmit={handleSubmit(handleOnSubmit)}>
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
            className="h-[200px] mt-5 transition-all duration-700"
          />

          <MultipleSelect
            className="mt-3"
            control={control}
            name="parent_id"
            options={initialFolderOptions}
            variant="mode-black"
          />

          <div className="flex justify-end mt-12">
            <Button variant="primary" type="submit" className="w-fit rounded-lg">
              Create Folder
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
