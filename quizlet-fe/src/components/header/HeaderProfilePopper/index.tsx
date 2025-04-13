import "./index.scss";

import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { GrAchievement } from "react-icons/gr";
import { IoIosSettings } from "react-icons/io";
import { MdLogout } from "react-icons/md";

import { logout } from "../../../store";

import { Button, PopperWrapper } from "../../../shared/components";
import { AssemblyAvatar } from "../..";
import { decodeToken, getCurrentToken } from "../../../utils";
import { toast } from "react-toastify";
import { JwtPayload } from "../../../type";

type HeaderProfilePopper = {
  isHidden: boolean;
};

export default function HeaderProfilePopper({
  isHidden,
}: Readonly<HeaderProfilePopper>) {
  const dispatch = useDispatch();

  let currentUser: JwtPayload | null = null;
  try {
    currentUser = decodeToken(getCurrentToken());
  } catch (error) {
    console.log("Error decoded token in HeaderProfilePopper ", error);
    toast.error(
      "The seem your session is expired or invalid!! Please try to login again"
    );
    return <Navigate to="/auth" replace />;
  }

  const handleOnLogout = () => {
    dispatch(logout());
  };

  return (
    <PopperWrapper className="profile__popper" isActive={isHidden}>
      <div className="profile__popper-header">
        <AssemblyAvatar
          height="64px"
          width="64px"
          imagePath="https://graph.facebook.com/1191245547971182/picture?type=large"
          className="mr-8"
        />

        <div>
          <p>Email</p>
          <p>{currentUser.sub}</p>
        </div>
      </div>

      <div className="mt-[8px] mb-[2px]">
        <Button
          path="/achievements"
          className="profile__popper-link duration-0 text-[1.2rem] py-[8px] px-[14px]"
        >
          <GrAchievement className="mr-5" />
          <span>Achievement</span>
        </Button>

        <Button
          path="/settings"
          className="profile__popper-link duration-0 text-[1.2rem] py-[8px] px-[14px]"
        >
          <IoIosSettings className="mr-5" />
          <span>Settings</span>
        </Button>
      </div>
      <div className="mt-[2px] mb-[6px] w-full">
        <Button
          onClick={handleOnLogout}
          className="logout-btn duration-0 w-full"
        >
          <MdLogout className="mr-3" />
          Log out
        </Button>
      </div>
    </PopperWrapper>
  );
}
