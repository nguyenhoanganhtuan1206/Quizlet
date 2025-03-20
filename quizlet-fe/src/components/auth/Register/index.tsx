import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  FormRegisterValues,
  registerSchemas,
} from '../../../schemas/authSchemas';

import ButtonLoginSocial from '../ButtonLoginSocial';
import { Button, Input } from '../../../shared/components';

function Register() {
  const { control, formState, handleSubmit } = useForm<FormRegisterValues>({
    resolver: zodResolver(registerSchemas),
  });

  const onSubmit: SubmitHandler<FormRegisterValues> = (data) => {
    console.log('data', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ButtonLoginSocial />

      <Input
        control={control}
        name="username"
        type="text"
        label="Username"
        placeholder="Your username"
        outsideClassName="mt-5"
      />

      <Input
        control={control}
        name="email"
        type="text"
        label="Email"
        placeholder="Your Email"
        outsideClassName="mt-5"
      />

      <Input
        control={control}
        name="password"
        type="password"
        label="Password"
        placeholder="Your Password"
        outsideClassName="mt-5"
      />

      <Input
        control={control}
        name="confirmPassword"
        type="password"
        label="Confirm Password"
        placeholder="Confirm Password"
        outsideClassName="mt-5"
      />

      {/* Display Error */}
      {formState.isSubmitted && !formState.isValid && (
        <div className="mt-5">
          <div
            className={`form__input-error ${'active'} h-[40px] flex items-center w-full bg-[var(--ref-bg-color-error)] py.1.5 px-3 rounded-[3px]`}
          >
            <span className="text-[1.4rem] font-bold text-[var(--ref-color-error)]">
              {formState.errors.username?.message ??
                formState.errors.email?.message ??
                formState.errors.password?.message ??
                formState.errors.confirmPassword?.message}
            </span>
          </div>
        </div>
      )}
      {/* Display Error */}

      <Button variant="primary" type="submit" className="mt-8">
        Sign Up
      </Button>
    </form>
  );
}

export default Register;
