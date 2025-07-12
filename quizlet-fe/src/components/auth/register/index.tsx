import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import {
  FormRegisterValues,
  registerSchemas,
} from "../../../schemas/auth/authSchemas";

import ButtonLoginSocial from "../button_login_social";
import { AlertMessage, Button, Input } from "../../../shared/components";
import { useRegisterMutation } from "../../../store";
import { ApiErrorResponse } from "../../../type";
import FormLabel from "@/shared/components/form_fields/form_label";

function Register() {
  const { control, formState, handleSubmit } = useForm<FormRegisterValues>({
    resolver: zodResolver(registerSchemas),
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [register, { isLoading }] = useRegisterMutation();

  const onSubmit: SubmitHandler<FormRegisterValues> = async (data) => {
    await register(data)
      .unwrap()
      .then((data) => {
        console.log("data", data);
      })
      .catch((error: ApiErrorResponse) => {
        toast.error(error.data.message);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ButtonLoginSocial />

      <div className="mt-5">
        <FormLabel name="fullName">Full Name</FormLabel>
        <Input
          control={control}
          name="fullName"
          type="text"
          placeholder="Your username"
        />
      </div>

      <div className="mt-5">
        <FormLabel name="confirmPassword">Email</FormLabel>
        <Input
          control={control}
          name="email"
          type="text"
          placeholder="Your Email"
        />
      </div>

      <div className="mt-5">
        <FormLabel name="password">Password</FormLabel>
        <Input
          control={control}
          name="password"
          type="password"
          placeholder="Your Password"
        />
      </div>

      <div className="mt-5">
        <FormLabel name="confirmPassword">Confirm Password</FormLabel>
        <Input
          control={control}
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
        />
      </div>

      {/* Display Error */}
      {formState.errors.email ||
      formState.errors.password ||
      formState.errors.confirmPassword ||
      formState.errors.fullName ? (
        <AlertMessage variant="error">
          <span>
            {formState.errors.fullName?.message ??
              formState.errors.email?.message ??
              formState.errors.password?.message ??
              formState.errors.confirmPassword?.message}
          </span>
        </AlertMessage>
      ) : null}
      {/* Display Error */}

      <Button
        isLoading={isLoading}
        variant="primary"
        type="submit"
        className="mt-8 w-full"
      >
        Sign Up
      </Button>
    </form>
  );
}

export default Register;
