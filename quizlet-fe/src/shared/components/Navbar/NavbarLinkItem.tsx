import "./NavbarLinkItem.scss";

import { NavLink } from "react-router-dom";
import { ReactNode } from "react";
import classNames from "classnames";

type NavbarLinkItemProps = {
  path?: string;
  active?: boolean;
  className?: string;
  children: ReactNode;
};

const NavbarLinkItem = ({
  path,
  className,
  active,
  children,
}: NavbarLinkItemProps) => {
  const finalClassName = classNames(
    "navbar__link-item flex items-center rounded-xl px-4 py-1 text-white text-[1.3rem] font-bold h-[40px] w-[200px] text-[var(--color-white-gray)]",
    className
  );

  if (!path) {
    return (
      <div className={classNames(finalClassName, { active: active })}>
        {children}
      </div>
    );
  }

  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        classNames(finalClassName, { active: isActive })
      }
    >
      {children}
    </NavLink>
  );
};

export default NavbarLinkItem;
