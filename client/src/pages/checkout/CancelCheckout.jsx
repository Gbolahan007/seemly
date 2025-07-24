// pages/Cancel.jsx
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const CancelCheckout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
        <div className="mb-4 text-6xl text-orange-500">⚠️</div>
        <h1 className="mb-4 text-2xl font-bold text-gray-800">
          Payment Cancelled
        </h1>
        <p className="mb-6 text-gray-600">
          Your payment was cancelled. No charges were made to your account.
        </p>
        <p className="mb-6 text-sm text-gray-500">
          You&apos;ll be redirected to the home page in 5 seconds, or click the
          button below.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => navigate("/")}
            className="w-full rounded bg-blue-500 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-600"
          >
            Return to Home
          </button>
          <button
            onClick={() => navigate(-1)} // Go back to previous page
            className="w-full rounded bg-gray-500 px-4 py-2 font-bold text-white transition-colors hover:bg-gray-600"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelCheckout;
