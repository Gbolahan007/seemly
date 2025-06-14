import { HiOutlineXMark } from "react-icons/hi2";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { TiHomeOutline } from "react-icons/ti";
import { AiOutlineProduct } from "react-icons/ai";
import { RiContactsBookLine } from "react-icons/ri";
import { BiLogIn } from "react-icons/bi";
import { useUser } from "./authentication/useUser";
import { useAuth } from "./contexts/AuthContext";

function HamburgerMenu({ isOpenModal, setIsOpenModal }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();
  const { signOut } = useAuth();

  return (
    <div>
      {isOpenModal && (
        <>
          {/* Blurry Overlay with More Visible Background */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => setIsOpenModal(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          ></motion.div>

          {/* Sidebar - Slides from Right */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            className="font-oswald text-custom-black fixed right-0 top-0 z-[1000] h-screen w-80 bg-white p-6 opacity-80 shadow-lg"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpenModal(false)}
              className="absolute right-4 top-4 rounded-md p-2 transition hover:bg-gray-200"
              aria-label="Close menu"
            >
              <HiOutlineXMark size={30} className="text-green-600" />
            </button>

            {/* Menu Items */}
            <ul className="mt-16 flex flex-col items-start gap-6 text-lg font-semibold">
              <li>
                <button
                  onClick={() => {
                    navigate("/");
                    setIsOpenModal(false);
                  }}
                  className="flex w-full items-center gap-5 p-3 text-blue-600 transition hover:text-green-600"
                >
                  <TiHomeOutline size={27} /> Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate("/products");
                    setIsOpenModal(false);
                  }}
                  className="flex w-full items-center gap-5 p-3 text-blue-600 transition hover:text-green-600"
                >
                  <AiOutlineProduct size={27} /> Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate("/contact");
                    setIsOpenModal(false);
                  }}
                  className="flex w-full items-center gap-5 p-3 text-blue-600 transition hover:text-green-600"
                >
                  <RiContactsBookLine size={27} /> Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate("/signup");
                    setIsOpenModal(false);
                  }}
                  className="flex w-full items-center gap-5 p-3 text-blue-600 transition hover:text-green-600"
                >
                  <BiLogIn size={27} /> Login
                </button>
              </li>
            </ul>

            <div className="absolute bottom-6 left-0 w-full px-4">
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    signOut();
                    navigate("/home");
                    setIsOpenModal(false);
                  }}
                  className="w-full bg-red-600 py-2 text-center uppercase text-white transition-all hover:bg-red-700"
                >
                  Sign Out
                </button>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/signup")}
                    className="mb-3 w-full border border-green-600 py-2 text-center uppercase text-green-600 transition-all hover:bg-green-600 hover:text-white"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/signup")}
                    className="w-full bg-green-600 py-2 text-center uppercase text-white transition-all hover:bg-green-700"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}

export default HamburgerMenu;
