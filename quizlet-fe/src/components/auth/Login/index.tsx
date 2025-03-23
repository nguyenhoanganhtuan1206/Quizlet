import "./Login.scss";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { FormLoginValues, loginSchemas } from "../../../schemas/authSchemas";
import { RootState, setCredentials, useLoginMutation } from "../../../store";

import { AlertMessage, Input, Button } from "../../../shared/components";

import { ApiErrorResponse } from "../../../type/";
import ButtonLoginSocial from "../ButtonLoginSocial";

export default function Login() {
  const { control, formState, handleSubmit } = useForm<FormLoginValues>({
    resolver: zodResolver(loginSchemas),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.authProvider.isAuthenticated
  );
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  /**
   * Verify whether logged in or not
   * If logged in it auto redirect to the Home Page
   */
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated]);

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
        navigate("/latest");
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
      <Input control={control} name="email" type="text" label="Email" />
      <Input
        control={control}
        name="password"
        type="password"
        label="Password"
        outsideClassName="mt-5"
      />
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
        className="mt-8"
      >
        Log in
      </Button>
    </form>
  );
}
