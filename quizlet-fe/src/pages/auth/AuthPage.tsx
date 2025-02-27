import './Auth.scss';

import { FormProvider, useForm } from 'react-hook-form';

import Login from '../../components/auth/Login';

interface FormLoginValues {
  email: string;
  password: string;
}

export default function AuthPage() {
  const methods = useForm<FormLoginValues>();

  return (
    <div className="container grid grid-cols-2">
      <div className="grid-cols-6 relative h-screen w-full">
        <h1 className="auth__right-title_top w-1/2">
          Smash sets in your sweats.
        </h1>

        <img
          alt="login-bg"
          className="auth__right-image"
          src="https://assets.quizlet.com/_next/static/media/QZ_Auth_LightV2@2x.82052a10.png"
        />
        <h3 className="auth__right-tile_bottom">Quizlet</h3>
      </div>
      <div className="grid-cols-6">
        <div className="auth__left">
          <div className="auth__left-tab-list flex">
            <div className="auth__left-tab-item mr-12">Sign Up</div>

            <div className="auth__left-tab-item active">Log in</div>
          </div>

          <FormProvider {...methods}>
            <Login />
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
