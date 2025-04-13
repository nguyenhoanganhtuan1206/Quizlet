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
  children: ReactPropsChildren;
};

export default function AssemblyCard({
  path,
  headerContent,
  className,
  contentClassName,
  imageClassName,
  imagePath,
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
    <Link to={path} className={assemblyCardClassName}>
      {renderContent()}
    </Link>
  ) : (
    <div className={assemblyCardClassName}>{renderContent()}</div>
  );
}
