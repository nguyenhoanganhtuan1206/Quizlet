import './index.scss';

import { PopperWrapper } from '../../shared/components';
import { AssemblyAvatar } from '../';

export default function HeaderProfilePopper() {
  return (
    <PopperWrapper className="profile__popper">
      <div className="profile__popper-header">
        <AssemblyAvatar
          height="64px"
          width="64px"
          imagePath="https://graph.facebook.com/1191245547971182/picture?type=large"
          className="mr-8"
        />

        <div>
          <p>Username</p>
          <span>Email</span>
        </div>
      </div>
      <div className="middle">
        <AssemblyAvatar
          height="64px"
          width="64px"
          imagePath="https://graph.facebook.com/1191245547971182/picture?type=large"
        />
      </div>
      <div className="footer">
        <AssemblyAvatar
          height="64px"
          width="64px"
          imagePath="https://graph.facebook.com/1191245547971182/picture?type=large"
        />
      </div>
    </PopperWrapper>
  );
}
