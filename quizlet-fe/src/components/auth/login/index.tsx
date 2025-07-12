import "./Login.scss";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import {
  FormLoginValues,
  loginSchemas,
} from "../../../schemas/auth/authSchemas";
import { setCredentials, useLoginByCredentialsMutation } from "../../../store";

import {
  AlertMessage,
  Input,
  Button,
  FormLabel,
} from "../../../shared/components";

import { ApiErrorResponse } from "../../../type";
import ButtonLoginSocial from "../button_login_social";

export default function Login() {
  const { control, formState, handleSubmit } = useForm<FormLoginValues>({
    resolver: zodResolver(loginSchemas),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginByCredentialsMutation();

  const onSubmit: SubmitHandler<FormLoginValues> = async (data) => {
    await login(data)
      .unwrap()
      .then((data) => {
        dispatch(
          setCredentials({
            token: data.token,
            refreshToken: data.refreshToken,
          })
        );

        toast.success("Login successful! Welcome back.");
        navigate("/");
      })
      .catch((error) => {
        const apiError = error as ApiErrorResponse;

        toast.error(apiError.data.message);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ButtonLoginSocial />
      <div className="my-10 flex justify-center login_break-line before:bg-gray-300">
        <p>or email</p>
      </div>

      <>
        <FormLabel
          className="text-[1.4rem] text-[#586380] font-semibold"
          name="email"
        >
          Email
        </FormLabel>
        <Input
          control={control}
          placeholder="Enter your email"
          className="placeholder:text-gray-400 placeholder:text-[1.3rem] placeholder:font-medium"
          name="email"
          type="text"
        />
      </>

      <>
        <FormLabel
          className="text-[1.4rem] text-[#586380] font-semibold mt-5"
          name="password"
        >
          Password
        </FormLabel>
        <Input
          control={control}
          placeholder="Enter your password"
          className="placeholder:text-gray-400 placeholder:text-[1.3rem] placeholder:font-medium"
          name="password"
          type="password"
        />
      </>

      {/* Display Error */}
      {formState.errors.email || formState.errors.password ? (
        <AlertMessage variant="error" className="mt-5">
          <span>
            {formState.errors.email?.message ??
              formState.errors.password?.message}
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
        Log in
      </Button>
    </form>
  );
}
