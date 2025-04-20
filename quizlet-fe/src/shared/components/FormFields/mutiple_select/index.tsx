import "./MultipleSelect.scss";
import "../FormFIelds.scss";

import { SelectProps } from "../../../../type/form/Input";
import classNames from "classnames";
import { Controller, FieldValues } from "react-hook-form";

export default function MultipleSelect<T extends FieldValues>({
  control,
  name,
  variant,
  selectCLassName,
  optionClassName,
  label,
  options,
}: Readonly<SelectProps<T>>) {
  const selectClassNames = classNames(
    selectCLassName,
    "multiple-selection border h-[45px] border-gray-300 rounded-[6px] w-full py-3 px-3.5 text-[1.4rem] cursor-pointer outline-none duration-300 focus:border-blue-500",
    {
      "form--mode-black": variant === "mode-black",
      "form--mode-border-only": variant === "border-only",
    }
  );

  const optionClassNames = classNames(
    optionClassName,
    "multiple-selection__options border h-[40px] border-gray-300 rounded-[6px] w-full py-3 px-3.5 text-[1.4rem] cursor-pointer outline-none duration-300 focus:border-blue-500"
  );
  const handleSelectOption = (value, onChange) => {
    console.log("value", value);
    onChange(value);
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        return (
          <div className={selectClassNames}>
            <div className="absolute top-[100%]">
              <p
                className={optionClassNames}
                onClick={() => handleSelectOption(1, onChange)} // Wrap in arrow function
              >
                1 Select
              </p>
            </div>
          </div>
        );
      }}
    />
  );
}
