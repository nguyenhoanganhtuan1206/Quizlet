import "../FormFIelds.scss";

import { SelectOptionProps, SelectProps } from "../../../../type/form/Input";
import classNames from "classnames";
import { Controller, FieldValues } from "react-hook-form";
import { Checkbox, ListItemText, MenuItem, Select } from "@mui/material";

export default function MultipleSelect<T extends FieldValues>({
  control,
  name,
  variant,
  className,
  label,
  options,
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
      render={({ field: { onChange, value } }) => {
        return (
          <div>
            <label className="text-[1.4rem] text-gray-700 font-[500] cursor-pointer">
              {label}
            </label>

            <Select
              onChange={onChange}
              className={selectInputClassNames}
              multiple
              displayEmpty={true} // Display default text when selection empty
              value={value}
              renderValue={(selected: string[]) => {
                console.log("selected", selected);
                return (
                  selected?.map((titleSelected) => titleSelected).join(", ") ||
                  "Select some options"
                );
              }}
            >
              {options.map((option) => {
                return (
                  <MenuItem key={option.title} value={option.value}>
                    <Checkbox checked={value.indexOf(option.value) >= 0} />
                    <ListItemText primary={option.value} />
                  </MenuItem>
                );
              })}
            </Select>
          </div>
        );
      }}
    />
  );
}
