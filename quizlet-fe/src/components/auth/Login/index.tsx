import './Login.scss';

import ButtonLoginSocial from '../ButtonLoginSocial';

export default function Login() {
  return (
    <div>
      <ButtonLoginSocial />

      <div className="my-10 flex justify-center login_break-line">
        <p>or email</p>
      </div>
    </div>
  );
}
