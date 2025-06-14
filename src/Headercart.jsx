import { FiShoppingCart } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useModal } from "./contexts/ModalProvider";

function HeaderCart() {
  const cart = useSelector((state) => state.cart.cart);
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const { setShowModal } = useModal();

  return (
    <div className="relative cursor-pointer" onClick={() => setShowModal(true)}>
      {/* Cart Icon */}
      <FiShoppingCart size={28} className="text-blue-800" />

      {/* Cart Count Badge at the Tip */}
      <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white shadow-md">
        {totalQuantity}
      </div>
    </div>
  );
}

export default HeaderCart;
