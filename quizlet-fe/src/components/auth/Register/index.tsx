import React from "react";
import ButtonLoginSocial from "../ButtonLoginSocial";
import { useFormContext } from "react-hook-form";
import { FormRegisterValues } from "../../../pages/auth/AuthPage";
import Input from "../../../shared/FormFields/Input";

function Register() {
  const { control } = useFormContext<FormRegisterValues>();

  return (
    <div>
      <ButtonLoginSocial />

      <Input
        control={control}
        name="username"
        type="text"
        label="Email"
        rules={{
          required: "Your username cannot be empty",
          min: {
            value: 5,
            message: "Your password must be at least 5 characters",
          },
          max: {
            value: 150,
            message: "Your password cannot larger than 150 characters",
          },
        }}
      />

      <Input
        control={control}
        name="email"
        type="text"
        label="Email"
        rules={{
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
        }}
      />

      <Input
        control={control}
        name="email"
        type="text"
        label="Email"
        rules={{
          required: "Your email cannot be empty",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
        }}
      />
    </div>
  );
}

export default Register;
