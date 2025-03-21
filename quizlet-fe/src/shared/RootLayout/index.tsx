import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const RootLayout = () => {
  return (
    <div className="">
      <Header />
      <div className="grid grid-cols-12">
        <div className="col-span-2">
          <Navbar />
        </div>
        <div className="col-span-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
