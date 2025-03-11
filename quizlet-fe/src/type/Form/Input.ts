import { Control, FieldValues, Path, RegisterOptions } from "react-hook-form";

type InputType = "text" | "password" | "textarea";

interface ValidationObject {
  value?: number | string | RegExp;
  message: string;
}

export type ValidationType = string | number | ValidationObject;

export interface InputProps<T extends FieldValues> {
  name: keyof T;
  control: Control<T>;
  type: InputType;
  placeholder?: string;
  label?: string;
  isError?: boolean;
  className?: string;
  // rules?: Record<string, ValidationType>;
  rules?: RegisterOptions<T, keyof T>;
}
