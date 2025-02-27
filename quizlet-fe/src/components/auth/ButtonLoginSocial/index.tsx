import './ButtonLoginSocial.scss';

import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

export default function ButtonLoginSocial() {
  return (
    <div className="flex flex-col w-full mt-20">
      <div className="login__social-btn flex items-center justify-center rounded-lg border border-gray-300 p-5">
        <FcGoogle className="mr-3" />
        <p>Log in with Google</p>
      </div>

      <div className="login__social-btn flex items-center justify-center rounded-lg border border-gray-300 p-5 mt-6">
        <FaGithub className="mr-3" />
        <p>Log in with GitHub</p>
      </div>
    </div>
  );
}
