import "./index.scss";

import { AiOutlineHome } from "react-icons/ai";
import { FaRegFolderOpen } from "react-icons/fa";
import { RiNotification2Line } from "react-icons/ri";

import NavbarLinkItem from "./NavbarLinkItem";

function Navbar() {
  return (
    <nav className="navbar bg-[var(--color-primary-sub)] fixed h-screen">
      <div className="flex flex-col justify-center items-center">
        <NavbarLinkItem path="/">
          <AiOutlineHome className="navbar-icon" />
          <span>Home</span>
        </NavbarLinkItem>

        <NavbarLinkItem path="/libraries">
          <FaRegFolderOpen className="navbar-icon" />
          <span>Your library</span>
        </NavbarLinkItem>

        <NavbarLinkItem>
          <RiNotification2Line className="navbar-icon" />
          <span>Notifications</span>
        </NavbarLinkItem>
      </div>
    </nav>
  );
}

export default Navbar;
