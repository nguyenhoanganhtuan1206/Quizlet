import "./index.scss";

import { ReactNode } from "react";

type PopperWrapperProps = {
  className?: string;
  children: ReactNode;
};

export default function PopperWrapper({
  className,
  children,
}: PopperWrapperProps) {
  return <div className={`popper-wrapper ${className}`}>{children}</div>;
}
