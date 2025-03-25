import { useState } from 'react';
import Modal from '../../shared/components/Modal';

export default function DevPage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <Modal isOpen={isOpen} onClosed={() => setIsOpen(false)}>
        Hello
      </Modal>

      <button onClick={() => setIsOpen(!isOpen)} className='bg-gray-400 p-5'>Show</button>
    </div>
  );
}
