import './AssemblyCard.scss';

import { ReactPropsChildren } from '../../../type/';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

type AssemblyCardProps = {
  path: string;
  className?: string;
  imagePath?: string;
  headerContent?: string;
  children: ReactPropsChildren;
};

export default function AssemblyCard({
  headerContent,
  className,
  imagePath,
  children,
}: Readonly<AssemblyCardProps>) {
  const assemblyCardClassName = classNames(className, 'assembly__card');

  return (
    <Link to="path" className={`${assemblyCardClassName}`}>
      {imagePath && (
        <div className="assembly__card-img">
          <img src={imagePath} alt="AssemblyImage" />
        </div>
      )}

      <div className="assembly__card-content">
        {headerContent && (
          <h3 className="assembly__card-content-header">{headerContent}</h3>
        )}
        {children}
      </div>
    </Link>
  );
}
