import "./Modal.scss";
import { ReactPropsChildren } from "@/type";
import classNames from "classnames";

import ReactDOM from "react-dom";

import { IoMdClose } from "react-icons/io";

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
  const modalClassNames = classNames(
    // Base styles
    "fixed left-1/2 bg-[var(--ref-color-twilight900)] shadow-2xl z-[1000]",
    // Initial animation state
    "opacity-0 -top-[200%] -translate-x-1/2 -translate-y-1/2 scale-[0.3]",
    // Transition properties
    "transition-[opacity,top,transform] duration-[400ms,1000ms,2000ms] ease-in-out",
    // Active state
    {
      "scale-[1] opacity-100 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-100 transition-transform duration-300 ease-[cubic-bezier(0.18,0.89,0.43,1.19)]":
        isOpen,
    },
    className
  );

  const closeIconClassNames = classNames(
    "absolute top-[1rem] right-[1rem] text-[2.2rem] rounded-[50%] h-[32[px] w-[32px] p-[3px] var(--gray-100-gray-700) cursor-default hover:opacity-[0.8]",
    closeIconClassName
  );

  const modalBackdropPortal = () =>
    ReactDOM.createPortal(
      <div className="modal-backdropdown" onClick={onClose}></div>,
      document.body
    );

  return (
    <>
      {isOpen && modalBackdropPortal()}

      <div className={modalClassNames}>
        {isShowCloseIcon && (
          <button title="Close Modal" className="positive" onClick={onClose}>
            <IoMdClose className={closeIconClassNames} />
          </button>
        )}

        {children}
      </div>
    </>
  );
}
