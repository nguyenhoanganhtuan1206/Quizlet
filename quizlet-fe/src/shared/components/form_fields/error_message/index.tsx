import classNames from "classnames";

interface ErrorMessageProps {
  message?: string;
  className?: string;
}

export default function ErrorMessage({
  message,
  className,
}: ErrorMessageProps) {
  const errorClassNames = classNames(
    className,
    "text-red-400 text-[1.4rem] font-bold mt-1 duration-500",
    {
      "opacity-100": message, // Show if error exists (display: flex)
      "opacity-0": !message,
    }
  );

  return <div className={errorClassNames}>{message}</div>;
}
