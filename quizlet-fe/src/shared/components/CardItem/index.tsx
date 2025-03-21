import classNames from 'classnames';
import { ReactPropsChildren } from '../../../type';

type CardItemProps = {
  className?: string;
  children: ReactPropsChildren;
};

export default function CardItem({
  className,
  children,
}: Readonly<CardItemProps>) {
  const finalClassName = classNames(
    'p-5 cursor-pointer rounded text-[var(--color-white-gray)] hover:bg-[var(--color-text-blacklight)]',
    className
  );

  return <div className={finalClassName}>{children}</div>;
}
