import './NavbarLinkItem.scss';

import { Link } from 'react-router-dom';
import { ReactNode } from 'react';
import classNames from 'classnames';

type NavbarLinkItemProps = {
  path: string;
  activeItem?: boolean;
  className?: string;
  children: ReactNode;
};

const NavbarLinkItem = ({
  path,
  className,
  activeItem,
  children,
}: NavbarLinkItemProps) => {
  const initialClassName = classNames(
    'navbar__link-item flex items-center rounded-xl px-4 py-1 text-white text-[1.3rem] font-bold h-[40px] w-[200px] text-[var(--color-white-gray)]',
    className
  );

  return (
    <Link className={initialClassName} to={path}>
      {children}
    </Link>
  );
};

export default NavbarLinkItem;
