import classnames from "classnames";

import { ReactPropsChildren } from "../../../type/ReactPropsChildren";
import { SubmitHandler } from "react-hook-form";
import React from "react";

type ButtonType = "submit" | "button" | "reset";

interface ButtonVariants {
  rounded?: boolean;
  primary?: boolean;
  borderOnly?: boolean;
}

interface ButtonProps<T> {
  variant: ButtonVariants;
  children: ReactPropsChildren;
  type?: ButtonType;
  className?: string;
  path?: string;
  onSubmit?: React.FormEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export default function Button<T>({
  variant,
  type = "button",
  path,
  onSubmit,
  className,
  children,
  disabled,
}: Readonly<ButtonProps<T>>) {
  const buttonClassnames = classnames(
    "flex items-center justify-center rounded text-[1.4rem] cursor-auto p-4 border border-gray-400 w-full cursor-pointer",
    {
      "bg-primary text-white": variant.primary,
      "bg-transparent text-primary": variant.borderOnly,
      "rounded-xl": variant.rounded,
    },
    className
  );

  return (
    <button
      disabled={disabled}
      onClick={onSubmit}
      type={type}
      className={buttonClassnames}
    >
      {children}
    </button>
  );
}
