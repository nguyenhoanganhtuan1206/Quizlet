import classnames from 'classnames';

import { ReactPropsChildren } from '../../../type/ReactPropsChildren';
import { SubmitHandler } from 'react-hook-form';
import React from 'react';

type ButtonType = 'submit' | 'button' | 'reset';

type ButtonVariants = 'primary' | 'borderOnly';

interface ButtonProps {
  variant?: ButtonVariants;
  children: ReactPropsChildren;
  type?: ButtonType;
  className?: string;
  path?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onSubmit?: React.FormEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export default function Button({
  variant,
  type = 'button',
  path,
  onClick,
  onSubmit,
  className,
  children,
  disabled,
}: Readonly<ButtonProps>) {
  const buttonClassnames = classnames(
    'flex items-center justify-center font-semibold rounded text-[1.4rem] cursor-auto p-4 border border-gray-400 w-full cursor-pointer transition-all duration-300',
    {
      'bg-primary text-white hover:bg-[var(--color-primary-sub)] hover:text-white':
        variant === 'primary',
      'bg-transparent text-primary hover:bg-[var(--color-primary-sub)] hover:text-white':
        variant === 'borderOnly',
    },
    className
  );

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      onSubmit={onSubmit}
      type={type}
      className={buttonClassnames}
    >
      {children}
    </button>
  );
}
