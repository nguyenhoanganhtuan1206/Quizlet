import { useState } from "react";

import "../FormFields.scss";

import { Controller, FieldValues } from "react-hook-form";

import { SelectOptionProps, SelectProps } from "@/type/form/Input";
import SelectSearchItem from "./select_search_item";
import SelectItem from "./select_item";

export default function MultipleSelect<T extends FieldValues>({
  control,
  name,
  listOptions,
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
        field: { onChange, value = [] as (string | number)[] },
        fieldState: { error },
      }) => {
        /**
         * Handle remove item
         */
        const handleRemoveItem = (itemRemove: string | number) => {
          if (!itemRemove || !value) {
            return;
          }

          const updatedValues = value.filter(
            (currentItem) => currentItem !== itemRemove
          );

          onChange(updatedValues);
        };

        /**
         * Handle selected the item
         */
        const handleSelectOption = (optionSelected: string | number) => {
          const isValueSelected = value.some(
            (currentVal) => currentVal === optionSelected
          );

          const newValue = isValueSelected
            ? value.filter((currentVal) => currentVal !== optionSelected)
            : [...value, optionSelected];

          onChange(newValue);
          setSearchTerm("");
        };

        /**
         * Map to display on the UI
         */
        const selectedOptions: SelectOptionProps[] = value
          .map((val) => listOptions.find((option) => option.value === val))
          .filter((option) => !!option); // Filter all the value is undefined

        return (
          <div className={`${className} relative`}>
            <SelectSearchItem
              variant={variant}
              selectedOptions={selectedOptions}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              isShowListOptions={isShowListOptions}
              setIsShowListOptions={setIsShowListOptions}
              handleRemoveItem={handleRemoveItem}
            />

            <SelectItem
              searchTerm={searchTerm}
              variant={variant}
              isShowListOptions={isShowListOptions}
              listOptions={listOptions}
              valueSelected={value}
              handleSelectOption={handleSelectOption}
            />

            {error && <span>{error.message}</span>}
          </div>
        );
      }}
    />
  );
}
