import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const RootLayout = () => {
  return (
    <div className="relative">
      <Header />
      <Navbar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
