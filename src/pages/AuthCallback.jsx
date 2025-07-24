import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase";

import { useState } from "react";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleOAuthRedirect = async () => {
      try {
        // Modern approach - handle the auth callback
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error("Error getting session:", error.message);
          setError(error.message);
          setLoading(false);
          return;
        }

        // Check if we have a session
        if (data.session) {
          console.log("Session data:", data.session);
          navigate("/home", { replace: true });
        } else {
          // If no session, try to exchange the URL params
          const hashParams = new URLSearchParams(
            window.location.hash.substring(1),
          );
          const accessToken = hashParams.get("access_token");
          const refreshToken = hashParams.get("refresh_token");

          if (accessToken && refreshToken) {
            // Set the session manually
            const { data: sessionData, error: sessionError } =
              await supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken,
              });

            if (sessionError) {
              console.error("Error setting session:", sessionError.message);
              setError(sessionError.message);
            } else {
              console.log("Session set successfully:", sessionData);
              navigate("/home", { replace: true });
            }
          } else {
            setError("No auth tokens found in URL");
          }
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    handleOAuthRedirect();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-xl">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
          Authenticating...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-xl">
        <div className="text-center text-red-600">
          <p>Authentication Error: {error}</p>
          <button
            onClick={() => navigate("/login")}
            className="mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default AuthCallback;
