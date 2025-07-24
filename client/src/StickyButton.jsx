import { useNavigate } from "react-router-dom";
import { LuMessageCircleMore } from "react-icons/lu";

const StickyButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/contact");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={handleClick}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-lg transition-all duration-300 hover:bg-green-700 hover:shadow-xl"
        aria-label="Chat with us"
      >
        <LuMessageCircleMore className="h-6 w-6" />
      </button>
    </div>
  );
};

export default StickyButton;
