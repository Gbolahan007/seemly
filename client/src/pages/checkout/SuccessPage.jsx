import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearItem } from "../../cart/cartSlice";
import sendOrderEmail from "../../utils/sendOrderEmail";

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  useEffect(() => {
    const handleSuccessfulPayment = async () => {
      const sessionId = searchParams.get("session_id");

      if (!sessionId) {
        setError("No session ID found");
        setLoading(false);
        return;
      }

      try {
        const serverUrl =
          import.meta.env.VITE_SERVER_URL || "http://localhost:3000";
        const response = await fetch(
          `${serverUrl}/api/verify-payment/${sessionId}`,
        );

        if (!response.ok) {
          throw new Error("Failed to verify payment");
        }

        const paymentData = await response.json();
        setPaymentDetails(paymentData);

        // Get data from localStorage
        const shippingInfo = JSON.parse(
          localStorage.getItem("shippingInfo") || "{}",
        );
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const orderTotal = parseFloat(
          localStorage.getItem("orderTotal") || "0",
        );

        if (shippingInfo.email && cart.length > 0) {
          // Send order confirmation email
          try {
            await sendOrderEmail({
              shippingInfo,
              cart,
              total: orderTotal,
            });
            console.log("Order confirmation email sent!");
          } catch (emailError) {
            console.error("Failed to send order email:", emailError);
          }
        }

        // Clear the cart and localStorage
        dispatch(clearItem());
        localStorage.removeItem("shippingInfo");
        localStorage.removeItem("cart");
        localStorage.removeItem("orderTotal");

        setLoading(false);
      } catch (error) {
        console.error("Error processing successful payment:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    handleSuccessfulPayment();
  }, [searchParams, dispatch]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-32 w-32 animate-spin rounded-full border-b-2 border-green-500"></div>
          <p className="mt-4 text-lg text-gray-600">
            Processing your payment...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
          <div className="mb-4 text-6xl text-red-500">⚠️</div>
          <h1 className="mb-4 text-2xl font-bold text-red-600">
            Payment Verification Failed
          </h1>
          <p className="mb-6 text-gray-600">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
        <div className="mb-4 text-6xl text-green-500">✅</div>
        <h1 className="mb-4 text-2xl font-bold text-gray-800">
          Payment Successful!
        </h1>
        <p className="mb-4 text-gray-600">
          Your order has been placed and will be processed soon.
        </p>

        {paymentDetails && (
          <div className="mb-6 rounded-lg bg-gray-50 p-4">
            <h3 className="mb-2 font-semibold text-gray-700">Order Details</h3>
            <p className="mb-2 text-lg font-bold text-green-600">
              Order Total: {formatCurrency(paymentDetails.amount_total / 100)}
            </p>
            <p className="text-sm text-gray-600">
              A confirmation email has been sent to:
            </p>
            <p className="text-sm font-medium text-gray-800">
              {paymentDetails.customer_email}
            </p>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={() => {
              navigate("/products");
            }}
            className="w-full rounded bg-blue-500 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-600"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full rounded bg-gray-500 px-4 py-2 font-bold text-white transition-colors hover:bg-gray-600"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
