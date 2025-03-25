import './Modal.scss';

import ReactDOM from 'react-dom';

import { ReactPropsChildren } from '../../../type';

type ModalProps = {
  isOpen: boolean;
  onClosed: () => void;
  className?: string;
  children: ReactPropsChildren;
};
export default function Modal({
  isOpen,
  onClosed,
  className,
  children,
}: ModalProps) {
  const modalBackdropPortal = () =>
    ReactDOM.createPortal(
      <div className="modal-backdrop" onClick={onClosed}>
        <div className={`modal ${isOpen ? 'modal--active' : ''}`}>
          <div className="modal-content">Content</div>
        </div>
      </div>,
      document.body
    );

  return (
    <>
      {isOpen && modalBackdropPortal()}

      <div className={`modal ${isOpen ? 'modal--active' : ''} ${className}`}>
        {children}
      </div>
    </>
  );
}
