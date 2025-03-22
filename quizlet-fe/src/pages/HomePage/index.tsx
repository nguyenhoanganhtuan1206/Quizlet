import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { RootState } from "../../store";
import { decodeToken } from "../../utils/jwtUtilities";
import { PopularCardList, RecentCardsList } from "../../components/";

const HomePage = () => {
  const token = useSelector((state: RootState) => state.authProvider.token);

  if (!token) {
    return <Navigate to="/auth" />;
  }

  const userId = decodeToken(token).user_id;

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
      <h3 className="text-white text-[1.6rem] font-bold mb-5">
        Popular flashcard sets
      </h3>

      <PopularCardList />
    </>
  );
};

export default HomePage;
