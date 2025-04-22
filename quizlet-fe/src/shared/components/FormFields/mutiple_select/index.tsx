import "../FormFields.scss";

import "./MultipleSelect.scss";

import { SelectProps } from "../../../../type/form/Input";
import classNames from "classnames";
import { Controller, FieldValues } from "react-hook-form";
import { useState } from "react";

export default function MultipleSelect<T extends FieldValues>({
  control,
  name,
  options,
  variant,
  label,
  selectClassName,
  optionWrapClassName,
  optionItemClassName,
}: Readonly<SelectProps<T>>) {
  const [isShowListOptions, setIsShowListOptions] = useState<boolean>(false);

  const selectClassNames = classNames(
    selectClassName,
    "multiple-selection border h-[45px] border-gray-300 rounded-[6px] w-full py-3 px-3.5 text-[1.4rem] cursor-pointer outline-none duration-300 focus:border-blue-500"
  );

  const optionWrapClassNames = classNames(
    optionWrapClassName,
    "multiple-selection__options-wrapper top-[110%] left-0 w-full border-gray-300 rounded-[6px] overflow-hidden"
  );

  const optionItemClassNames = classNames(
    optionItemClassName,
    "multiple-selection__options-item border h-[45px] w-full w-full py-3 px-3.5 text-[1.4rem] cursor-pointer outline-none duration-300 focus:border-blue-500 hover:opacity-75",
    {
      "form--mode-black": variant === "mode-black",
      "form--mode-border-only": variant === "border-only",
    },
    isShowListOptions ? "flex" : "hidden"
  );

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value = [] } }) => {
        const handleSelectOption = (valueInput: number | string) => {
          const isValueSelected = value.includes(valueInput);
          const newValue = isValueSelected
            ? value.filter((item: string | number) => item !== valueInput)
            : [...value, valueInput];

          onChange(newValue);
        };
        return (
          <div>
            <label className="text-[1.4rem] text-gray-700 font-[500] cursor-pointer">
              {label}
            </label>
            <div
              className={selectClassNames}
              onClick={() => setIsShowListOptions(!isShowListOptions)}
            >
              <div className={optionWrapClassNames}>
                {options.map((option) => {
                  return (
                    <p
                      className={optionItemClassNames}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectOption(option.value);
                      }}
                    >
                      <input type="checkbox" />
                      {option.title}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        );
      }}
    />
  );
}
