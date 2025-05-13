import "../FormFields.scss";

import { SelectProps } from "../../../../type/form/Input";
import classNames from "classnames";
import { Controller, FieldValues } from "react-hook-form";

export default function Select<T extends FieldValues>({
  control,
  name,
  variant,
  className,
  label,
  options,
  isMultiple,
}: Readonly<SelectProps<T>>) {
  const selectInputClassNames = classNames(
    className,
    "border h-[45px] border-gray-300 rounded-[6px] w-full py-3 px-3.5 text-[1.4rem] cursor-pointer outline-none duration-300 focus:border-blue-500",
    {
      "form--mode-black": variant === "mode-black",
      "form--mode-border-only": variant === "border-only",
    }
  );

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange } }) => {
        return (
          <div>
            <label className="text-[1.4rem] text-gray-700 font-[500] cursor-pointer">
              {label}
            </label>

            <select
              onChange={onChange}
              className={selectInputClassNames}
              multiple={isMultiple}
            >
              {options.map((option) => {
                return (
                  <option key={option.value} value={option.value}>
                    {option.title}
                  </option>
                );
              })}
            </select>
          </div>
        );
      }}
    />
  );
}
