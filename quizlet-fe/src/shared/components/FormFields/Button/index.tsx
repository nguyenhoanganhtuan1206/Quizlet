import React from "react";
import classnames from "classnames";

import { Link } from "react-router-dom";

import "./index.scss";

import { ReactPropsChildren } from "../../../../type/";

type ButtonType = "submit" | "button" | "reset";

type ButtonVariants = "primary" | "sub-primary" | "borderOnly";

interface ButtonProps {
  variant?: ButtonVariants;
  children: ReactPropsChildren;
  type?: ButtonType;
  isLoading?: boolean;
  className?: string;
  path?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onSubmit?: React.FormEventHandler<HTMLButtonElement>;
  onFocus?: React.FormEventHandler<HTMLButtonElement>;
  onBlur?: React.FormEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export default function Button({
  variant,
  type = "button",
  path,
  isLoading,
  className,
  children,
  disabled,
  onClick,
  onSubmit,
  onFocus,
  onBlur,
}: Readonly<ButtonProps>) {
  const buttonClassnames = classnames(
    "flex items-center justify-center font-semibold rounded text-[1.4rem] cursor-auto p-4 border border-gray-400 cursor-pointer transition-all duration-300",
    className,
    {
      "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-sub)] hover:text-white border-[var(--ref-color-twilight100)]":
        variant === "primary",
      "bg-transparent text-primary hover:bg-[var(--color-primary-sub)] hover:text-white border-[var(--ref-color-twilight100)]":
        variant === "borderOnly",
      "bg-[var(--color-primary-sub)] text-white hover:bg-[var(--color-primary)] hover:text-white border-[var(--ref-color-twilight100)]":
        variant === "sub-primary",
    }
  );

  if (path) {
    return (
      <Link className={buttonClassnames} to={path}>
        {children}
      </Link>
    );
  }

  return (
    <button
      disabled={disabled || isLoading}
      onClick={onClick}
      onSubmit={onSubmit}
      onFocus={onFocus}
      onBlur={onBlur}
      type={type}
      className={buttonClassnames}
    >
      {isLoading ? <span className="btn-loading"></span> : children}
    </button>
  );
}
