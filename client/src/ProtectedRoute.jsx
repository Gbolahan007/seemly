import { useNavigate } from "react-router-dom";
import { useUser } from "./authentication/useUser";
import Loader from "./Loader";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/signup", { replace: true });
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading || !isAuthenticated) return <Loader />;

  return children;
}

export default ProtectedRoute;
