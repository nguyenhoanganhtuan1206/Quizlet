import "./AssemblyCard.scss";

import { ReactPropsChildren } from "../../../type/ReactPropsChildren";
import { Link } from "react-router-dom";

type AssemblyCardProps = {
  path: string;
  imagePath?: string;
  headerContent?: string;
  children: ReactPropsChildren;
};

export default function AssemblyCard({
  headerContent,
  imagePath,
  children,
}: Readonly<AssemblyCardProps>) {
  return (
    <Link to="path" className="assembly__card">
      <div className="assembly__card-img">
        <img src={imagePath} />
      </div>

      <div className="assembly__card-content">
        {headerContent && (
          <h3 className="assembly__card-header">{headerContent}</h3>
        )}
        {children}
      </div>
    </Link>
  );
}
