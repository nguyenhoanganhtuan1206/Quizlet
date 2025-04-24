import { useState } from "react";

import "../FormFields.scss";

import { Controller, FieldValues } from "react-hook-form";

import { SelectOptionProps, SelectProps } from "@/type/form/Input";
import SelectSearchItem from "./select_search_item";
import SelectItem from "./select_item";

export default function MultipleSelect<T extends FieldValues>({
  control,
  name,
  options,
  variant,
  className,
}: Readonly<SelectProps<T>>) {
  const [isShowListOptions, setIsShowListOptions] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, value = [] as SelectOptionProps[] },
        fieldState: { error },
      }) => {
        return (
          <div className={`${className} relative`}>
            <SelectSearchItem
              variant={variant}
              selectedValues={value}
              onChange={onChange}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              isShowListOptions={isShowListOptions}
              setIsShowListOptions={setIsShowListOptions}
            />

            <SelectItem
              searchTerm={searchTerm}
              variant={variant}
              isShowListOptions={isShowListOptions}
              options={options}
              value={value}
              onChange={onChange}
            />

            {error && <span>{error.message}</span>}
          </div>
        );
      }}
    />
  );
}
