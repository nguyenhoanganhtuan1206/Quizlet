import { ReactPropsChildren } from "@/type";
import classNames from "classnames";

interface FormLabepProps {
  name: string;
  className?: string;
  children: ReactPropsChildren;
}

export default function FormLabel({
  name,
  className,
  children,
}: FormLabepProps) {
  const labelClassNames = classNames(
    "text-[1.4rem] text-gray-700 font-[600] cursor-pointer",
    className
  );

  return (
    <label className={labelClassNames} htmlFor={name}>
      {children}
    </label>
  );
}
