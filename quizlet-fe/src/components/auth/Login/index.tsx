import "./Login.scss";

import ButtonLoginSocial from "../ButtonLoginSocial";
import Input from "../../../shared/FormFields/Input";
import { useFormContext } from "react-hook-form";
import { FormLoginValues } from "../../../pages/auth/AuthPage";

export default function Login() {
  const { control } = useFormContext<FormLoginValues>();

  return (
    <div>
      <ButtonLoginSocial />

      <div className="my-10 flex justify-center login_break-line">
        <p>or email</p>
      </div>

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

      <Input
        control={control}
        name="password"
        type="password"
        label="Password"
        rules={{
          required: "Your password cannot be empty",
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
    </div>
  );
}
