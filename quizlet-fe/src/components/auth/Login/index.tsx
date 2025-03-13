import './Login.scss';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { FormLoginValues, loginSchemas } from '../../../schemas/authSchemas';

import Input from '../../../shared/FormFields/Input';
import ButtonLoginSocial from '../ButtonLoginSocial';
import Button from '../../../shared/FormFields/Button';

export default function Login() {
  const { control, formState, handleSubmit } = useForm<FormLoginValues>({
    resolver: zodResolver(loginSchemas),
  });

  const onSubmit: SubmitHandler<FormLoginValues> = (data) => {
    console.log('data', data);
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
      />

      {/* Display Error */}
      {formState.isSubmitted && !formState.isValid && (
        <div className="mt-5">
          <div
            className={`form__input-error ${'active'} h-[40px] flex items-center w-full bg-[var(--ref-bg-color-error)] py.1.5 px-3 rounded-[3px]`}
          >
            <span className="text-[1.4rem] font-bold text-[var(--ref-color-error)]">
              {formState.errors.email?.message ??
                formState.errors.password?.message}
            </span>
          </div>
        </div>
      )}
      {/* Display Error */}

      <Button variant="primary" type="submit" className="mt-8">
        Log in
      </Button>
    </form>
  );
}
