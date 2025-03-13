import './Auth.scss';

import { useState } from 'react';

import Login from '../../components/auth/Login';
import Button from '../../shared/FormFields/Button';
import Register from '../../components/auth/Register';

export default function AuthPage() {
  const [isLoginPage, setIsLoginPage] = useState(true);

  const handleSwitchAuthPage = () => {
    setIsLoginPage(!isLoginPage);
  };

  return (
    <div className="grid grid-cols-2 h-full">
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
                !isLoginPage && 'active'
              }`}
            >
              Sign Up
            </div>

            <div
              onClick={handleSwitchAuthPage}
              className={`auth__left-tab-item ${isLoginPage && 'active'}`}
            >
              Log in
            </div>
          </div>

          <div>
            {/* Switch components */}
            {isLoginPage ? <Login /> : <Register />}

            <Button
              variant="borderOnly"
              onClick={handleSwitchAuthPage}
              className="mt-5 text-gray-500"
            >
              {isLoginPage
                ? 'New to Quizlet? Create an account'
                : 'Already have an account? Log in'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
