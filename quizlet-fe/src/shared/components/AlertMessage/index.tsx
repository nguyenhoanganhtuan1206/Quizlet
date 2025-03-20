import classNames from 'classnames';

import { ReactPropsChildren } from '../../../type/reactPropsChildren';

type MessageType = 'error' | 'info' | 'warning';

type AlertMessageProps = {
  variant: MessageType;
  className?: string;
  children: ReactPropsChildren;
};

export default function AlertMessage({
  variant,
  className,
  children,
}: AlertMessageProps) {
  const messageClasses = classNames(
    'h-[40px] flex items-center w-full py.1.5 px-3 rounded-[3px] text-[1.4rem]',
    {
      'bg-red-100 text-red-700 bg-[var(--ref-bg-color-error)] font-bold text-[var(--ref-color-error)':
        variant === 'error',
      'bg-blue-100 text-blue-700 border-blue-400': variant === 'info',
      'bg-yellow-100 text-yellow-700 border-yellow-400': variant === 'warning',
    },
    className
  );

  return <div className={messageClasses}>{children}</div>;
}
