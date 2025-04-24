import { Control, FieldValues, Path } from "react-hook-form";

type InputType = "text" | "password" | "textarea";

export type SelectOptionProps = {
  title: string;
  value: string | number;
};

interface ValidationObject {
  value?: number | string | RegExp;
  message: string;
}

export type ValidationType = string | number | ValidationObject;

export type InputVariant = "mode-black" | "border-only";

export interface InputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  type: InputType;
  variant?: InputVariant;
  placeholder?: string;
  label?: string;
  isError?: boolean;
  className?: string;
  outsideClassName?: string;
  onFocus?: () => void;
  rows?: number;
  cols?: number;
}

export interface SelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  options: SelectOptionProps[];
  variant: InputVariant;
  isError?: boolean;
}
