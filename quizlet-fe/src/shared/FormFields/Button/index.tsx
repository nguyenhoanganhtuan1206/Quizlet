import classnames from 'classnames';

import { ReactPropsChildren } from '../../../type/ReactPropsChildren';

type ButtonType = 'submit' | 'button' | 'reset';

interface ButtonVariants {
  rounded?: boolean;
  primary?: boolean;
  borderOnly?: boolean;
}

interface ButtonProps {
  variant: ButtonVariants;
  type?: ButtonType;
  className?: string;
  path?: string;
  children: ReactPropsChildren;
}

export default function Button({
  variant,
  type = 'button',
  path,
  className,
  children,
}: Readonly<ButtonProps>) {
  const buttonClassnames = classnames(
    'rounded p-4 border border-gray-400',
    {
      'bg-primary text-white': variant.primary,
      'bg-transparent text-primary': variant.borderOnly,
      'rounded-xl': variant.rounded,
    },
    className
  );

  return (
    <button type={type} className={buttonClassnames}>
      {children}
    </button>
  );
}
