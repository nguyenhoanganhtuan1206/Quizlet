import { Outlet } from 'react-router-dom';

import Header from '../components/Header';
import Navbar from '../components/Navbar';

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-[var(--color-primary-sub)] grid grid-rows-[auto_1fr]">
      {/* Header */}
      <Header />

      {/* Main Layout */}
      <div className="row-span-1 grid grid-cols-1 md:grid-cols-12">
        {/* Sidebar (Navbar) */}
        <aside
          className={`
          md:block
          md:col-span-4 lg:col-span-3
          h-full
          bg-[var(--color-primary-sub)]
          border-r border-gray-700
          transition-all duration-300
          z-20
          fixed md:static
          w-full md:w-auto
          top-0 md:top-auto
          pt-16 md:pt-0
        `}
        >
          <Navbar />
        </aside>

        {/* Main Content */}
        <main
          className={`
          col-span-1 md:col-span-8 lg:col-span-9
          h-full
          px-4 md:px-8 py-4
          overflow-y-auto
          bg-[var(--color-primary-sub)]
        `}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
