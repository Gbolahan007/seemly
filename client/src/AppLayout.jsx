import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Cart from "./cart/Cart";
import { AnimatePresence } from "framer-motion";
import { useModal } from "./contexts/ModalProvider";

function AppLayout() {
  const { showModal } = useModal();

  return (
    <div className="overflow-y-hidden bg-slate-50">
      <Header />
      <main>
        <Outlet />
      </main>
      <AnimatePresence>{showModal && <Cart />}</AnimatePresence>
      <Footer />
    </div>
  );
}

export default AppLayout;
