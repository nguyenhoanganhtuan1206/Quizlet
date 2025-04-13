import "./breadcrumb_navigation.scss";
import { NavLink } from "react-router-dom";

import { MdNavigateNext } from "react-icons/md";

type BreadCrumbItemNavigationType = {
  title: string;
  path: string;
};

type BreadCrumbNavigationType = {
  currentPage: string;
  allPages: BreadCrumbItemNavigationType[];
};

const BreadCrumbNavigation = ({
  currentPage,
  allPages,
}: BreadCrumbNavigationType) => {
  return (
    <div className="flex gap-4">
      {allPages.map((page, index) => {
        return (
          <div className="flex items-center gap-2">
            <NavLink
              key={page.title}
              to={page.path}
              className={({ isActive }) => {
                return `breadcrumb__item text-[1.26rem] ${
                  isActive && currentPage === page.title
                    ? "text-[var(--color-primary)] font-bold"
                    : "text-gray-400 hover:text-blue-300"
                }`;
              }}
            >
              <p>{page.title}</p>
            </NavLink>

            {/* Just display for the last element */}
            {index + 1 < allPages.length && (
              <MdNavigateNext className="text-white text-[1.8rem] transform-[translateY(-1px)]" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BreadCrumbNavigation;
