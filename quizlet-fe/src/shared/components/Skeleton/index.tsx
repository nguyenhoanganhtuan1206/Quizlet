import "./Skeleton.scss";

import classNames from "classnames";

import { ReactPropsChildren } from "../../../type/ReactPropsChildren";

type SkeletonVariant = "text" | "icon" | "button" | "section";

interface SkeletonProps {
  variant: SkeletonVariant;
  times?: number;
  textBars?: number;
  className?: string;
  height?: string;
  width?: string;
  iconSize?: string;
  children?: ReactPropsChildren;
}

const Skeleton = ({
  variant,
  times = 1,
  className,
  textBars = 2,
  height,
  width,
  children,
}: SkeletonProps) => {
  const baseClassNames = classNames(
    `skeleton__affect skeleton-${variant}`,
    className
  );

  const style = { width: width, height: height };

  const renderSkeletonElement = () => {
    switch (variant) {
      case "icon":
      case "button":
        return <div className={baseClassNames} style={style}></div>;
      case "text":
        return (
          <div className="skeleton__text-wrapper">
            {Array(textBars)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className={classNames(
                    baseClassNames,
                    "skeleton__text-wrapper"
                  )}
                  style={style}
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
                <div
                  key={index}
                  className={`${baseClassNames} mt-5`}
                  style={style}
                >
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
