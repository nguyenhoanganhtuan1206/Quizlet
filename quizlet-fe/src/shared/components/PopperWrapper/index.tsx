import classNames from "classnames";

import { ReactNode } from "react";

type PopperWrapperVariant = "primary" | "borderOnly" | "subPrimary";

type PopperWrapperProps = {
  className?: string;
  variant: PopperWrapperVariant;
  isActive?: boolean;
  children: ReactNode;
};

export default function PopperWrapper({
  className,
  variant,
  isActive,
  children,
}: Readonly<PopperWrapperProps>) {
  const popperWrapperClassNames = classNames(
    "flex flex-col justify-center border shadow-md rounded duration-300 z-[100]",
    {
      hidden: !isActive,
      "bg-[var(--color-primary)] text-white": variant === "primary",
      "bg-[var(--color-primary-sub)] border-[var(--gray-400-gray-600)]":
        variant === "subPrimary",
      "text-white bg-transparent border-[var(--gray-400-gray-600)]":
        variant === "borderOnly",
    },
    className
  );

  return <div className={popperWrapperClassNames}>{children}</div>;
}
