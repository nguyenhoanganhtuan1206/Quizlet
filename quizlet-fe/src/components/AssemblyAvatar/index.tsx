import classNames from "classnames";

type AssemblyAvatarProps = {
  height: string;
  width: string;
  imagePath: string;
  className?: string;
};

export default function AssemblyAvatar({
  height,
  width,
  imagePath,
  className,
}: AssemblyAvatarProps) {
  const finalClassName = classNames(
    `rounded-[50%]  cursor-default shadow-[inset 0 0 0.0625rem #0000004d]`,
    className
  );

  return (
    <img
      src={imagePath}
      style={{ height, width }}
      className={finalClassName}
      alt="Avatar"
    />
  );
}
