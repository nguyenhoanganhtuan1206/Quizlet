import classNames from "classnames";
import { ReactPropsChildren } from "../../../type";

type CardItemProps = {
  className?: string;
  children: ReactPropsChildren;
};

/**
 * ? This is the CardItem to display the FlashSet
 
 * @param className
 * @param children
 * @returns CardItem
 */

export default function CardItem({
  className,
  children,
}: Readonly<CardItemProps>) {
  const finalClassNames = classNames(
    "p-5 cursor-pointer rounded text-[var(--gray-400-gray-600)] hover:bg-[var(--gray-300-gray-800)]",
    className
  );

  return <div className={finalClassNames}>{children}</div>;
}
