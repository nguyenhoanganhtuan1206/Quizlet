import { TbFaceIdError } from "react-icons/tb";
import { ReactPropsChildren } from "@/type";
import classNames from "classnames";

type ErrorComponentProps = {
  className?: string;
  children: ReactPropsChildren;
};

export default function ErrorComponent({
  className,
  children,
}: Readonly<ErrorComponentProps>) {
  const finalClassName = classNames(
    className,
    "m-auto border border-gray-500 w-fit rounded-xl m-auto px-10 py-5 flex flex-col items-center justify-center"
  );

  return (
    <div className={finalClassName}>
      <TbFaceIdError className="text-white text-[10rem]" />

      {children}
    </div>
  );
}
