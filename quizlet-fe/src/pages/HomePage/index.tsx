import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { RecentCardsList } from '../../components/';
import { RootState } from '../../redux';
import { decodeToken } from '../../utils/jwtUtilities';

const HomePage = () => {
  const token = useSelector((state: RootState) => state.authProvider.token);

  if (!token) {
    return <Navigate to="/auth" />;
  }

  const userId = decodeToken(token).user_id;

  return <RecentCardsList userId={userId} />;
};

export default HomePage;
