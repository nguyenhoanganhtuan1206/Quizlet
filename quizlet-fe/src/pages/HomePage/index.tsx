import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { logout, RootState } from "../../store";
import { decodeToken } from "../../utils/jwtUtilities";
import { PopularCardList, RecentCardsList } from "../../components/";

const HomePage = () => {
  // const token = useSelector((state: RootState) => state.authProvider.token); // Updated field name
  // const dispatch = useDispatch();

  // // Handle unauthenticated state
  // if (!token) {
  //   return <Navigate to="/auth" replace />;
  // }

  // let userId: string;
  // try {
  //   const decodedToken = decodeToken(token);
  //   userId = decodedToken.user_id;
  // } catch (error) {
  //   console.error('Token decoding failed:', error);
  //   dispatch(logout());
  //   return <Navigate to="/auth" replace />;
  // }

  return (
    <>
      {/**
       * Recent flashset List
       */}
      <h3 className="text-white text-[1.6rem] font-bold mb-5">
        Recent flashcards
      </h3>

      {/* <RecentCardsList userId={userId} /> */}

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
