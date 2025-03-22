import "./index.scss";

import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { GrAchievement } from "react-icons/gr";
import { IoIosSettings } from "react-icons/io";
import { MdLogout } from "react-icons/md";

import { logout, RootState } from "../../../store";

import { Button, PopperWrapper } from "../../../shared/components";
import { AssemblyAvatar } from "../..";
import { decodeToken } from "../../../utils/jwtUtilities";

type HeaderProfilePopper = {
  isHidden: boolean;
};

export default function HeaderProfilePopper({
  isHidden,
}: Readonly<HeaderProfilePopper>) {
  console.log("isHidden", isHidden);

  const token = useSelector((state: RootState) => state.authProvider.token);
  const dispatch = useDispatch();

  const handleOnLogout = () => {
    dispatch(logout());
  };

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <PopperWrapper
      className={`profile__popper ${isHidden ? "active" : "hidden"}`}
    >
      <div className="profile__popper-header">
        <AssemblyAvatar
          height="64px"
          width="64px"
          imagePath="https://graph.facebook.com/1191245547971182/picture?type=large"
          className="mr-8"
        />

        <div>
          <p>Email</p>
          <p>{decodeToken(token)?.sub}</p>
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
      <div className="mt-[2px] mb-[6px]">
        <Button onClick={handleOnLogout} className="logout-btn duration-0">
          <MdLogout className="mr-3" />
          Log out
        </Button>
      </div>
    </PopperWrapper>
  );
}
