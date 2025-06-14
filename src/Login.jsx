import { useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { session, signOut } = useAuth();

  const isLoggedIn = session?.user?.role === "authenticated";

  const handleClick = () => {
    if (isLoggedIn) {
      signOut();
      navigate("/home");
    } else {
      navigate("/signup");
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`whitespace-nowrap rounded-lg px-6 py-2 font-semibold text-white shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
        isLoggedIn
          ? "bg-red-500 hover:bg-red-700 focus:ring-red-400"
          : "bg-green-500 hover:bg-green-700 focus:ring-green-400"
      }`}
    >
      {isLoggedIn ? "Sign out" : "Login"}
    </button>
  );
}

export default Login;
