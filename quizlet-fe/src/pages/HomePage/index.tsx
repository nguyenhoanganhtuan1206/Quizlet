import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { RootState } from "../../store";
import { decodeToken } from "../../utils/jwtUtilities";
import { RecentCardsList } from "../../components/";

const HomePage = () => {
  const token = useSelector((state: RootState) => state.authProvider.token);

  if (!token) {
    return <Navigate to="/auth" />;
  }

  const userId = decodeToken(token).user_id;

  return <RecentCardsList userId={userId} />;
};

export default HomePage;
