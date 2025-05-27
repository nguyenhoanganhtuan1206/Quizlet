import classNames from "classnames";

import { ReactPropsChildren } from "../../../type/ReactPropsChildren";

type SkeletonVariant = "text" | "icon" | "button" | "section";

interface SkeletonProps {
  variant: SkeletonVariant;
  times?: number;
  textBars?: number;
  className?: string;
  wrapperClassName?: string;
  height?: string;
  width?: string;
  iconSize?: string;
  children?: ReactPropsChildren;
}

const Skeleton = ({
  variant,
  times = 1,
  className,
  wrapperClassName,
  textBars = 2,
  children,
}: SkeletonProps) => {
  const wrapperClassNames = classNames(
    "flex flex-col w-full",
    wrapperClassName
  );

  // Base classes that should always be applied
  const baseClassNames = classNames(
    // Animation and basic styles that shouldn't be overridden
    "overflow-hidden bg-gradient-to-r from-transparent via-white/10 to-transparent bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]",
    "bg-[#2d3a55]",
    // Variant-specific styles that can be overridden
    {
      "rounded-md w-full": variant === "text",
      "h-[38px] w-[38px] rounded-md": variant === "button",
      "h-[38px] w-[38px] rounded-full": variant === "icon",
    },
    className
  );

  const renderSkeletonElement = () => {
    switch (variant) {
      case "icon":
      case "button":
        return <div className={baseClassNames}></div>;
      case "text":
        return (
          <div className={wrapperClassNames}>
            {Array(textBars)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className={classNames(
                    baseClassNames,
                    "[&:not(:first-child)]:mt-3"
                  )}
                ></div>
              ))}
          </div>
        );
      case "section":
        return (
          <>
            {Array(times)
              .fill(0)
              .map((_, index) => (
                <div key={index} className={className}>
                  {children}
                </div>
              ))}
          </>
        );
    }
  };

  return <>{renderSkeletonElement()}</>;
};

export default Skeleton;
