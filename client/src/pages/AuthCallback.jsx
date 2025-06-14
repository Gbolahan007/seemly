import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuthRedirect = async () => {
      const { data, error } = await supabase.auth.getSessionFromUrl();

      if (error) {
        console.error("Error getting session from URL:", error.message);
      } else {
        console.log("Session data:", data);
        navigate("/home");
      }
    };

    handleOAuthRedirect();
  }, [navigate]);

  return (
    <div className="flex h-screen items-center justify-center text-xl">
      Redirecting...
    </div>
  );
};

export default AuthCallback;
