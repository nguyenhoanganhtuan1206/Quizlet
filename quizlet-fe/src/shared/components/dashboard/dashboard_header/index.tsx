import { ReactPropsChildren } from "../../../../type";

type DashboardHeaderProps = {
  title?: string;
  children: ReactPropsChildren;
};

export default function DashboardHeader({
  children,
  title,
}: DashboardHeaderProps) {
  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>TITLE</div>
        <div>actions</div>
      </div>
      {/* HEADER */}

      {/* CONTENT */}
      <div className="content"></div>
      {/* CONTENT */}

      {children}
    </div>
  );
}
