import './ModalFolderCreation.scss';

import { Button, Input, Modal } from '../../../shared/components';
import { useForm } from 'react-hook-form';

type ModalFolderCreationProps = {
  isShowModal: boolean;
  onClosed: () => void;
};

type FormModalCreationValues = {
  name: string;
  description: string;
};

export default function ModalFolderCreation({
  isShowModal,
  onClosed,
}: Readonly<ModalFolderCreationProps>) {
  const { control } = useForm<FormModalCreationValues>({
    defaultValues: {
      name: '',
      description: '',
    },
  });

  return (
    <Modal
      onClosed={onClosed}
      className="modal__folder-creation"
      isOpen={isShowModal}
      isShowCloseIcon={true}
    >
      <h1 className="text-[2.6rem] font-bold leading-6">Create new folder</h1>

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
          className="h-[150px] mt-5 transition-all duration-700"
        />

        <div className="flex justify-end mt-12">
          <Button variant="primary" className="w-fit rounded-lg">
            Create Folder
          </Button>
        </div>
      </form>
    </Modal>
  );
}
