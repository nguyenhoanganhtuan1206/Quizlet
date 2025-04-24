import { useMemo } from "react";
import "../../FormFields.scss";
import "./SelectItem.scss";

import { InputVariant, SelectOptionProps } from "@/type/form/Input";
import classNames from "classnames";

interface SelectItemProps {
  options: SelectOptionProps[];
  value: SelectOptionProps[];
  variant?: InputVariant;
  searchTerm?: string;
  isShowListOptions: boolean;
  onChange: (value: SelectOptionProps[]) => void;
}

export default function SelectItem({
  variant,
  options,
  value,
  searchTerm,
  isShowListOptions,
  onChange,
}: SelectItemProps) {
  const selectItemWrapperClassNames = classNames(
    "select-item__wrapper absolute top-[105%] h-[250px] max-h-[450px] left-0 flex flex-wrap w-full border-gray-300 rounded-[6px] overflow-y-auto",
    isShowListOptions ? "flex" : "hidden",
    {
      "form--mode-black": variant === "mode-black",
      "form--mode-border-only": variant === "border-only",
    }
  );

  const selectItemClassNames = classNames(
    "select-item flex items-center border h-[45px] w-full py-3 px-3.5 text-[1.4rem] cursor-pointer outline-none duration-300 focus:border-blue-500",
    {
      "form--mode-black": variant === "mode-black",
      "form--mode-border-only": variant === "border-only",
    }
  );

  const selectItemCheckBoxClassNames = classNames(
    "select-item__checkbox h-[20px] w-[20px] border-2 border-gray-500 rounded-md mr-3 duration-500 text-[1.4rem] cursor-pointer",
    {
      "form--mode-black": variant === "mode-black",
      "form--mode-border-only": variant === "border-only",
    }
  );

  /* Handle onChange */
  const handleSelectOption = (valueInput: SelectOptionProps) => {
    const isValueSelected = value.some((val) => val.value === valueInput.value);
    const newValue = isValueSelected
      ? value.filter((val) => val.value !== valueInput.value)
      : [...value, valueInput];

    onChange(newValue);
  };

  const filteredOptions = useMemo(() => {
    if (!searchTerm) {
      return options;
    }

    return options.filter((option) =>
      option.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm]);

  return (
    <div className={selectItemWrapperClassNames}>
      {filteredOptions.length > 0 ? (
        filteredOptions.map((option) => {
          return (
            <p
              key={option.value}
              className={selectItemClassNames}
              onClick={(e) => {
                e.stopPropagation();
                handleSelectOption(option);
              }}
            >
              <input
                className={selectItemCheckBoxClassNames}
                type="checkbox"
                checked={value.some((val) => val.value === option.value)}
                readOnly
              />
              {option.title}
            </p>
          );
        })
      ) : (
        <div className="px-4 py-2 text-[1.4rem]">No options found</div>
      )}
    </div>
  );
}
