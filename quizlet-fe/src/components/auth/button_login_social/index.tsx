import { Button } from "@/shared/components";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import classNames from "classnames";
import { useGoogleLogin } from "@react-oauth/google";
import FacebookLogin, { ReactFacebookLoginInfo } from "react-facebook-login";

import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { FacebookAuthRequestDTO } from "@/type/auth/authTypes";
import {
  setCredentials,
  useLoginByFacebookMutation,
  useLoginByGoogleMutation,
} from "@/store";

export default function ButtonLoginSocial() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [oAuth2Facebook, { isLoading: isLoadingFacebook }] =
    useLoginByFacebookMutation();
  const [oAuth2Google, { isLoading: isLoadingGoogle }] =
    useLoginByGoogleMutation();

  const handleLoginFacebook = async (response: ReactFacebookLoginInfo) => {
    const authRequest: FacebookAuthRequestDTO = {
      userId: response.userID,
      accessToken: response.accessToken,
      email: response.email,
      name: response.name,
      profilePictureUrl: response.picture?.data.url,
    };

    await oAuth2Facebook(authRequest)
      .unwrap()
      .then((data) => {
        dispatch(
          setCredentials({
            token: data.token,
            refreshToken: data.refreshToken,
          })
        );

        navigate("/");
      })
      .catch((error) => {
        toast.error(
          "Something went wrong while login by Facebook. Please try to login again."
        );
        throw new Error(`Error while login by Facebook: ${error}`);
      });
  };

  const handleLoginByGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      oAuth2Google(tokenResponse.access_token)
        .unwrap()
        .then((data) => {
          dispatch(
            setCredentials({
              token: data.token,
              refreshToken: data.refreshToken,
            })
          );

          navigate("/");
        })
        .catch((error) => {
          toast.error(
            "Something went wrong while login by Google. Please try to login again."
          );
          throw new Error(`Error while login by Google: ${error}`);
        });
    },
  });

  const classesBtn = classNames(
    "flex items-center justify-center mt-5",
    "w-full text-[1.6rem] rounded-log border border-gray-300 p-5 font-bold",
    "transition-[background-color] duration-[0.13] hover:bg-[var(--ref-color-twilight200)] cursor-pointer"
  );

  return (
    <div className="flex flex-col w-full mt-20">
      <Button
        onClick={() => handleLoginByGoogle()}
        className={classesBtn}
        isLoading={isLoadingGoogle}
      >
        <FcGoogle className="text-[1.3em] mr-4" />
        <p className="font-semibold">Log in with Google</p>
      </Button>

      <FacebookLogin
        autoLoad={!isLoadingFacebook}
        isDisabled={isLoadingFacebook}
        appId={import.meta.env.VITE_FACEBOOK_CLIENT_ID}
        fields="name,email,picture"
        icon={
          <FaFacebook className="text-[1.3em] mr-4 text-[var(--ref-color-twilight500)]" />
        }
        cssClass={classesBtn}
        textButton="Log in with Facebook"
        callback={handleLoginFacebook}
      />
    </div>
  );
}
