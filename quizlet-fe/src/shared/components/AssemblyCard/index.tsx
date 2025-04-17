import "./AssemblyCard.scss";

import { ReactPropsChildren } from "../../../type/";
import { Link } from "react-router-dom";
import classNames from "classnames";

type AssemblyCardProps = {
  path?: string;
  className?: string;
  contentClassName?: string;
  imageClassName?: string;
  imagePath?: string;
  headerContent?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLDivElement>;
  children: ReactPropsChildren;
};

export default function AssemblyCard({
  path,
  headerContent,
  className,
  contentClassName,
  imageClassName,
  imagePath,
  onClick,
  children,
}: Readonly<AssemblyCardProps>) {
  const assemblyCardClassName = classNames(className, "assembly__card");

  const renderContent = () => (
    <>
      {imagePath && (
        <div className={`assembly__card-img ${imageClassName}`}>
          <img src={imagePath} alt="AssemblyImage" />
        </div>
      )}
      <div className={`assembly__card-content ${contentClassName}`}>
        {headerContent && (
          <h3 className="assembly__card-content-header">{headerContent}</h3>
        )}
        {children}
      </div>
    </>
  );

  return path ? (
    <Link to={path} className={assemblyCardClassName} onClick={onClick}>
      {renderContent()}
    </Link>
  ) : (
    <div onClick={onClick} className={assemblyCardClassName}>
      {renderContent()}
    </div>
  );
}
