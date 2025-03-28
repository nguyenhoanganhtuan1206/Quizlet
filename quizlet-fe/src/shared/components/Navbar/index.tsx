import './index.scss';

import { AiOutlineHome } from 'react-icons/ai';
import { FaRegFolderOpen } from 'react-icons/fa';
import { RiNotification2Line } from 'react-icons/ri';

import NavbarLinkItem from './NavbarLinkItem';

function Navbar() {
  return (
    <nav className="p-4">
      <ul className="space-y-4">
        <li>
          <NavbarLinkItem path="/latest">
            <AiOutlineHome className="navbar-icon" />
            <span>Home</span>
          </NavbarLinkItem>
        </li>
        <li>
          <NavbarLinkItem path="/libraries">
            <FaRegFolderOpen className="navbar-icon" />
            <span>Your library</span>
          </NavbarLinkItem>
        </li>
        <li>
          <NavbarLinkItem>
            <RiNotification2Line className="navbar-icon" />
            <span>Notifications</span>
          </NavbarLinkItem>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
