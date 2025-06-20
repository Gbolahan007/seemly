import { HiOutlineBars4 } from "react-icons/hi2";
import Headercart from "./Headercart";
import HeaderNav from "./HeaderNav";
import HeaderSearch from "./HeaderSearch";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import HamburgerMenu from "./HamburgerMenu";
import { AnimatePresence } from "framer-motion";
import { useAuth } from "./contexts/AuthContext";

function Header() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { session } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      {/* Welcome Banner - Only shows when logged in */}
      {session?.user?.email && (
        <div className="hidden bg-green-50 py-2 text-center sm:block">
          <p className="text-sm text-green-700">
            Welcome back,{" "}
            <span className="font-semibold">
              {session.user?.user_metadata?.fullName || session.user.email}
            </span>
          </p>
        </div>
      )}

      {/* Navigation Bar */}
      <nav className="sticky left-0 top-0 z-50 bg-gray-200 px-4 py-3 font-tektur shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div
              className="h-12 w-20 cursor-pointer overflow-hidden rounded-md"
              onClick={() => navigate("/home")}
            >
              <img
                src="/seem-logo.jpg"
                className="h-full w-full object-cover"
                alt="seem logo"
              />
            </div>
          </div>

          {/* Welcome Message - Mobile View */}
          {session?.user?.email && (
            <div className="flex-1 px-4 text-center text-xs font-medium text-gray-700 sm:hidden">
              Welcome back,{" "}
              <span className="font-semibold">
                {session.user?.user_metadata?.fullName || session.user.email}
              </span>
            </div>
          )}

          {/* Desktop Navigation - Centered */}
          <div className="hidden flex-1 sm:flex sm:items-center sm:justify-center">
            <div className="flex items-center space-x-8">
              <HeaderNav />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex flex-shrink-0 items-center space-x-4">
            {/* Search - Hidden on smaller screens */}
            <div className="hidden lg:block">
              <HeaderSearch />
            </div>

            {/* Login - Hidden on mobile */}
            <div className="hidden sm:block">
              <Login />
            </div>

            {/* Cart */}
            <Headercart />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpenModal(true)}
              className="rounded-md p-2 transition hover:bg-gray-300 sm:hidden"
            >
              <HiOutlineBars4 size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar - Shows below main nav on mobile */}
        <div className="mt-3 block lg:hidden">
          <HeaderSearch />
        </div>
      </nav>

      {/* Hamburger Menu - Fullscreen Overlay */}
      <AnimatePresence>
        {isOpenModal && (
          <div className="fixed inset-0 z-50">
            <HamburgerMenu
              isOpenModal={isOpenModal}
              setIsOpenModal={setIsOpenModal}
            />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
