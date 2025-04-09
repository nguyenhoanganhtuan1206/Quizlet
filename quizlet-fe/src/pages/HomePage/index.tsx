import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

import { logout } from "../../store";
import { decodeToken, getCurrentToken } from "../../utils";
import { PopularCardList, RecentCardsList } from "../../components/";
import { AuthError } from "../../type";

const HomePage = () => {
  const token = getCurrentToken();
  const dispatch = useDispatch();

  let userId: string;
  try {
    const decodedToken = decodeToken(token);
    userId = decodedToken.user_id;
  } catch (error) {
    const authError = error as AuthError;
    console.error("Token decoding failed: ", error);
    toast.error(authError.message);
    dispatch(logout());
    return <Navigate to="/auth" replace />;
  }

  return (
    <>
      {/**
       * Recent flashset List
       */}
      <h3 className="text-white text-[1.6rem] font-bold mb-5">
        Recent flashcards
      </h3>

      <RecentCardsList userId={userId} />

      {/**
       * Popular flashset List
       */}
      <h3 className="text-white text-[1.6rem] font-bold my-8">
        Popular flashcard sets
      </h3>

      <PopularCardList />
    </>
  );
};

export default HomePage;
