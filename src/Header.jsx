import { HiOutlineBars4 } from "react-icons/hi2";
import Headercart from "./Headercart";
import HeaderNav from "./HeaderNav";
import HeaderSearch from "./HeaderSearch";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import HamburgerMenu from "./HamburgerMenu";
import { AnimatePresence } from "framer-motion";

function Header() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* Navigation Bar */}
      <nav className="sticky left-0 top-0 z-50 flex w-full items-center justify-between bg-gray-200 font-tektur shadow-md md:justify-center lg:justify-around">
        {/* Logo */}
        <div className="w-20 cursor-pointer" onClick={() => navigate("/home")}>
          <img src="/seem-logo.jpg" className="h-full w-full" alt="seem logo" />
        </div>

        {/* Main Navigation - Hidden on Small Screens */}
        <main className="hidden w-full max-w-screen-md items-center justify-center gap-8 sm:flex">
          <HeaderNav />
          <div className="flex items-center justify-center gap-5">
            {/* Search - Hidden on md Screens */}
            <div className="hidden lg:block">
              <HeaderSearch />
            </div>

            <Login />
            <Headercart />
          </div>
        </main>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-5 sm:hidden">
          <Headercart />
          <button
            onClick={() => setIsOpenModal(true)}
            className="rounded-md p-2 transition hover:bg-gray-300"
          >
            <HiOutlineBars4 size={27} />
          </button>
        </div>
      </nav>

      {/* Hamburger Menu - Placed Outside <nav> to Prevent Layout Shift */}
      <AnimatePresence>
        {isOpenModal && (
          <div className="absolute inset-0 z-50">
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
