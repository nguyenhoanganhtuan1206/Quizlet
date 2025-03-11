import { ValidationType } from "../../type/Form/Input";

export interface EmailValidationRules {
  rules: Record<string, ValidationType>;
}

export const emailRules: EmailValidationRules = {
  rules: {
    required: "Your email cannot be empty",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address",
    },
    min: {
      value: 5,
      message: "Your email must be at least 5 characters",
    },
    max: {
      value: 150,
      message: "Your email cannot larger than 150 characters",
    },
  },
};
