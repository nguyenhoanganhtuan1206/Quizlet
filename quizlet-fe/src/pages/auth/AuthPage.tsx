import "./Auth.scss";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import Login from "../../components/auth/Login";
import Button from "../../shared/FormFields/Button";
import { useState } from "react";
import Register from "../../components/auth/Register";

export interface FormLoginValues {
  email: string;
  password: string;
}

export interface FormRegisterValues {
  email: string;
  username: string;
  password: string;
}

export default function AuthPage() {
  const methods = useForm<FormLoginValues>();
  const [isLoginPage, setIsLoginPage] = useState(true);

  const handleSwitchAuthPage = () => {
    methods.reset();
    setIsLoginPage(!isLoginPage);
  };

  const onSubmit: SubmitHandler<FormLoginValues | FormRegisterValues> = (
    data
  ) => {
    console.log("data", data);
  };

  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="grid-cols-6 relative h-full w-full">
        <h1 className="auth__right-title_top w-1/2">
          Smash sets in your sweats.
        </h1>

        <img
          alt="login-bg"
          className="h-full w-full bg-cover bg-center bg-no-repeat auth__right-image"
          src="https://assets.quizlet.com/_next/static/media/QZ_Auth_LightV2@2x.82052a10.png"
        />
        <h3 className="auth__right-tile_bottom">Quizlet</h3>
      </div>
      <div className="grid-cols-6">
        <div className="auth__left">
          <div className="auth__left-tab-list flex">
            <div
              onClick={handleSwitchAuthPage}
              className={`auth__left-tab-item mr-12 ${
                !isLoginPage && "active"
              }`}
            >
              Sign Up
            </div>

            <div
              onClick={handleSwitchAuthPage}
              className={`auth__left-tab-item ${isLoginPage && "active"}`}
            >
              Log in
            </div>
          </div>

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              {/* Switch components */}
              {isLoginPage ? <Login /> : <Register />}

              {/* Display Error */}
              {methods.formState.isSubmitted && !methods.formState.isValid && (
                <div className="mt-5">
                  <div
                    className={`form__input-error ${"active"} h-[40px] flex items-center w-full bg-[var(--ref-bg-color-error)] py.1.5 px-3 rounded-[3px]`}
                  >
                    <span className="text-[1.4rem] font-bold text-[var(--ref-color-error)]">
                      {methods.formState.errors.email?.message ||
                        methods.formState.errors.password?.message}
                    </span>
                  </div>
                </div>
              )}
              {/* Display Error */}

              <Button variant="primary" type="submit" className="mt-8">
                {isLoginPage ? "Log in" : "Sign Up"}
              </Button>

              <Button
                variant="borderOnly"
                onClick={handleSwitchAuthPage}
                className="mt-5 text-gray-500"
              >
                {isLoginPage
                  ? "New to Quizlet? Create an account"
                  : "Already have an account? Log in"}
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
