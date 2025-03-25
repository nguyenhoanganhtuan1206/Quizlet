import './Modal.scss';

import ReactDOM from 'react-dom';

import { IoMdClose } from 'react-icons/io';

import { ReactPropsChildren } from '../../../type';
import classNames from 'classnames';

type ModalProps = {
  isOpen: boolean;
  onClosed: () => void;
  isShowCloseIcon?: boolean;
  className?: string;
  closeIconClassName?: string;
  children: ReactPropsChildren;
};
export default function Modal({
  isOpen,
  onClosed,
  isShowCloseIcon,
  className,
  closeIconClassName,
  children,
}: Readonly<ModalProps>) {
  const modalBackdropPortal = () =>
    ReactDOM.createPortal(
      <div className="modal-backdrop" onClick={onClosed}></div>,
      document.body
    );

  return (
    <>
      {isOpen && modalBackdropPortal()}

      <div className={`modal ${isOpen ? 'modal--active' : ''} ${className}`}>
        {isShowCloseIcon && (
          <button title="Close Modal" className="positive" onClick={onClosed}>
            <IoMdClose className={`modal-close__icon ${closeIconClassName}`} />
          </button>
        )}

        {children}
      </div>
    </>
  );
}
