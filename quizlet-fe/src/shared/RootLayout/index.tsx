import Header from '../Header';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';

const RootLayout = () => {
  return (
    <div className='relative'>
      <Header />
      <Navbar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
