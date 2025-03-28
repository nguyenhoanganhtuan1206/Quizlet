import './index.scss';
import classNames from 'classnames';

import { ReactNode } from 'react';

type PopperWrapperProps = {
  className?: string;
  style?: React.CSSProperties;
  isActive?: boolean;
  children: ReactNode;
};

export default function PopperWrapper({
  className,
  style,
  isActive,
  children,
}: Readonly<PopperWrapperProps>) {
  const popperWrapper = classNames(className, 'popper-wrapper', {
    'popper-wrapper--hidden': !isActive,
  });

  return (
    <div className={popperWrapper} style={style}>
      {children}
    </div>
  );
}
