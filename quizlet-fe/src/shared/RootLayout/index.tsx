import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { JwtPayload } from "@/type";
import { decodeToken, getCurrentToken } from "@/utils";

const RootLayout = () => {
  const [currentUser, setCurrentUser] = useState<JwtPayload | null>();

  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      try {
        const currentToken = getCurrentToken();
        if (currentToken) {
          const decoded = decodeToken(currentToken);
          if (isMounted) {
            setCurrentUser(decoded);
          }
        }
      } catch (error) {
        console.error("Error decoding token in HeaderProfilePopper:", error);
        toast.error(
          "Your session is expired or invalid. Please try to login again."
        );
      }
    };

    initializeAuth();

    // Cleanup to prevent memory leaks
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-primary-sub)] grid grid-rows-[auto_1fr]">
      {/* Header */}
      <Header currentUser={currentUser} />

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
          {currentUser && <Navbar />}
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
