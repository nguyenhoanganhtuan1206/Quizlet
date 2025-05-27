import { ReactPropsChildren } from "@/type";
import classNames from "classnames";

type EmptyComponentProps = {
  className?: string;
  children: ReactPropsChildren;
};

export default function EmptyComponent({
  className,
  children,
}: EmptyComponentProps) {
  const finalClassNames = classNames(
    "flex items-center bg-[var(--gray-100-gray-700)] rounded-xl px-[3rem] py-[1.5rem]",
    className
  );

  return <div className={finalClassNames}>{children}</div>;
}
