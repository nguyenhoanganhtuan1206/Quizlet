import './Modal.scss';

import ReactDOM from 'react-dom';

import { IoMdClose } from 'react-icons/io';

import { ReactPropsChildren } from '../../../type';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  isShowCloseIcon?: boolean;
  className?: string;
  closeIconClassName?: string;
  children: ReactPropsChildren;
};
export default function Modal({
  isOpen,
  onClose,
  isShowCloseIcon,
  className,
  closeIconClassName,
  children,
}: Readonly<ModalProps>) {
  const modalBackdropPortal = () =>
    ReactDOM.createPortal(
      <div className="modal-backdrop" onClick={onClose}></div>,
      document.body
    );

  return (
    <>
      {isOpen && modalBackdropPortal()}

      <div className={`modal ${isOpen ? 'modal--active' : ''} ${className}`}>
        {isShowCloseIcon && (
          <button title="Close Modal" className="positive" onClick={onClose}>
            <IoMdClose className={`modal-close__icon ${closeIconClassName}`} />
          </button>
        )}

        {children}
      </div>
    </>
  );
}
