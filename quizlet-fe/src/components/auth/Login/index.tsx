import './Login.scss';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

import { FormLoginValues, loginSchemas } from '../../../schemas/authSchemas';
import { useLoginMutation } from '../../../redux';

import { AlertMessage, Input, Button } from '../../../shared/components';

import { ApiErrorResponse } from '../../../type/';
import ButtonLoginSocial from '../ButtonLoginSocial';

export default function Login() {
  const { control, formState, handleSubmit } = useForm<FormLoginValues>({
    resolver: zodResolver(loginSchemas),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [login, { isLoading, isError }] = useLoginMutation();

  console.log('isError', isError);
  console.log('isLoading', isLoading);

  const onSubmit: SubmitHandler<FormLoginValues> = async (data) => {
    await login(data)
      .unwrap()
      .then((data) => {
        console.log('data', data);
      })
      .catch((error) => {
        const apiError = error as ApiErrorResponse;

        toast.error(apiError.data.message, { autoClose: 2000 });
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
      <Button variant="primary" type="submit" className="mt-8">
        Log in
      </Button>
    </form>
  );
}
