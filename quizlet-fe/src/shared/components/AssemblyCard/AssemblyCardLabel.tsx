import "./AssemblyCard.scss";

import { ReactPropsChildren } from "../../../type";

type AssemblyCardLabelProps = {
  className?: string;
  children: ReactPropsChildren;
};

export default function AssemblyCardLabel({
  className,
  children,
}: Readonly<AssemblyCardLabelProps>) {
  return (
    <div className={`assembly__card-label ${className}`}>
      {children}
    </div>
  );
}
