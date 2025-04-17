import { NavLink } from "react-router-dom";

import { MdNavigateNext } from "react-icons/md";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import {
  addMorePage,
  BreadcrumbNavigationItem,
} from "../../../store/slices/navigateBreadCrumbSlices";

type BreadCrumbNavigationType = {
  currentPage: string;
  wrapperClassName?: string;
  className?: string;
};

const BreadCrumbNavigation = ({
  currentPage,
  className,
  wrapperClassName,
}: BreadCrumbNavigationType) => {
  console.log("BreadCrumbNavigationType");

  const dispatch = useDispatch();
  const navigationListFolders = useSelector(
    (state: RootState) => state.navigationBreadCrumb
  );

  const finalClassNames = classNames(
    "breadcrumb__item text-[1.6rem]",
    className
  );

  const handleNavigatePage = (newPage: BreadcrumbNavigationItem) => {
    dispatch(addMorePage(newPage));
  };

  return (
    <div className={`${wrapperClassName} flex gap-4`}>
      {navigationListFolders.allPages.map((page, index) => {
        return (
          <div key={page.title} className="flex items-center gap-2">
            <NavLink
              key={page.title}
              to={page.path}
              onClick={() => handleNavigatePage(page)}
              className={({ isActive }) => {
                return `${finalClassNames} ${
                  isActive && currentPage === page.title
                    ? "text-[var(--color-primary)] font-bold"
                    : "text-gray-400 hover:text-blue-300"
                }`;
              }}
            >
              <p>{page.title}</p>
            </NavLink>

            {/* Just display for the last element */}
            {index + 1 < navigationListFolders.allPages.length && (
              <MdNavigateNext className="text-white text-[1.8rem] translate-y-[-1px]" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BreadCrumbNavigation;
