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
  const [searchTerm, setSearchTerm] = useState<string>();

  const selectClassNames = classNames(
    selectClassName,
    "multiple-selection relative flex items-center border h-[45px] border-gray-300 rounded-[6px] outline-none w-full py-3 px-3.5 text-[1.4rem] cursor-pointer outline-none duration-300 focus:border-blue-500",
    {
      "form--mode-black": variant === "mode-black",
      "form--mode-border-only": variant === "border-only",
    }
  );

  const optionWrapClassNames = classNames(
    optionWrapClassName,
    "multiple-selection__options-wrapper absolute top-[105%] left-0 w-full border-gray-300 rounded-[6px] overflow-hidden"
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

  const inputCheckboxClassNames = classNames(
    "multiple-selection__options-checkbox h-[20px] w-[20px] border-2 border-gray-500 rounded-md mr-3 duration-500 hover:opacity-[0.8] cursor-pointer",
    {
      "form--mode-black": variant === "mode-black",
      "form--mode-border-only": variant === "border-only",
    }
  );

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value = [] as (string | number)[] } }) => {
        const selectedValues = Array.isArray(value) ? value : [];

        /* Handle onChange */
        const handleSelectOption = (valueInput: number | string) => {
          const isValueSelected = selectedValues.includes(valueInput);
          const newValue = isValueSelected
            ? selectedValues.filter(
                (item: string | number) => item !== valueInput
              )
            : [...value, valueInput];

          onChange(newValue);
        };

        /* Display values selected */
        const renderSelectedValues = () => {
          return (
            <p className="translate-[-50%, -50%]">
              {selectedValues.map((valSelected) => (
                <span className="multiple-selection__items-labels">
                  {valSelected}
                </span>
              ))}
            </p>
          );
        };

        return (
          <div className="relative">
            <div className="flex flex-wrap min-h-[40px] p-2 bg-[var(--color-primary-sub)]">
              {/*Input*/}
              {selectedValues && selectedValues.length > 0 && (
                <div className="inline-flex items-center bg-transparent text-white px-2 py-1 rounded mr-1 mb-1">
                  {renderSelectedValues()}
                </div>
              )}

              {/*Input*/}
              <input
                className="flex flex-1 h-[inherit] text-[1.4rem] p-2 text-white bg-transparent outline-none"
                value={searchTerm}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsShowListOptions(!isShowListOptions);
                }}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setIsShowListOptions(true);
                }}
                placeholder={
                  selectedValues.length === 0 ? "Select your options" : ""
                }
              />
            </div>

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
                    <input
                      className={inputCheckboxClassNames}
                      type="checkbox"
                      checked={value.includes(option.value)}
                    />
                    {option.title}
                  </p>
                );
              })}
            </div>
          </div>
        );
      }}
    />
  );
}
