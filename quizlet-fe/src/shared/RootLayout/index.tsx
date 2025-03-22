import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Navbar from "../components/Navbar";

const RootLayout = () => {
  return (
    <div className="h-screen">
      <Header />
      <div className="grid grid-cols-12">
        <div className="h-screen col-span-3 bg-[var(--color-primary-sub)]">
          <Navbar />
        </div>
        <div className="h-screen col-span-9 px-[32px] py-[16px] bg-[var(--color-primary-sub)] ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
