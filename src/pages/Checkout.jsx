import { useState, useCallback, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import CheckoutProgress from "./checkout/CheckoutProgress";
import ShippingForm from "./checkout/ShippingForm";
import OrderSummary from "./checkout/OrderSummary";
import { payWithStripeCheckout } from "../utils/payWithStripe";

const Checkout = () => {
  const cart = useSelector((state) => state.cart.cart);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  // React Hook Form for shipping info
  const {
    register: registerShipping,
    handleSubmit: handleSubmitShipping,
    formState: { errors: shippingErrors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      city: "",
      zipCode: "",
      country: "United States",
    },
  });

  // Calculate cart totals using useMemo for optimization
  const { subtotal, shipping, tax, total } = useMemo(() => {
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const shipping = subtotal > 50 ? 0 : 5;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    return { subtotal, shipping, tax, total };
  }, [cart]);

  const formatCurrency = useCallback((value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }, []);

  // Submit handlers
  const onSubmitShipping = useCallback((data) => {
    localStorage.setItem("shippingInfo", JSON.stringify(data));
    setStep(2);
  }, []);

  const onSubmitPayment = useCallback(async () => {
    setLoading(true);
    setError(null);

    const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo"));

    if (!shippingInfo) {
      setError("Shipping information is missing");
      setLoading(false);
      return;
    }

    // Store cart info in localStorage so success page can access it
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("orderTotal", total.toString());

    await payWithStripeCheckout({
      email: shippingInfo.email,
      amount: total,
      firstName: shippingInfo.firstName,
      lastName: shippingInfo.lastName,
      onError: (errorMessage) => {
        setError(errorMessage);
        setLoading(false);
      },
      onClose: () => {
        console.log("Payment setup failed or was cancelled");
        setLoading(false);
      },
    });
  }, [total, cart]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="mb-8 text-center text-3xl font-bold">Checkout</h1>
        <CheckoutProgress step={step} />

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Left Column - Form */}
          <div className="flex-1">
            {step === 1 ? (
              <ShippingForm
                register={registerShipping}
                errors={shippingErrors}
                handleSubmit={handleSubmitShipping}
                onSubmit={onSubmitShipping}
                loading={loading}
              />
            ) : (
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h2 className="mb-4 text-2xl font-semibold">Payment</h2>

                {error && (
                  <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <div className="mb-4 rounded-md border border-blue-200 bg-blue-50 p-3">
                  <p className="text-sm text-blue-700">
                    You&apos;ll be redirected to Stripe&apos;s secure checkout
                    page to complete your payment.
                  </p>
                </div>

                <button
                  onClick={onSubmitPayment}
                  disabled={loading}
                  className={`w-full rounded-md px-4 py-3 font-medium text-white transition-colors ${
                    loading
                      ? "cursor-not-allowed bg-gray-400"
                      : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    `Pay ${formatCurrency(total)} with Stripe`
                  )}
                </button>

                <button
                  onClick={() => setStep(1)}
                  disabled={loading}
                  className="mt-4 text-blue-600 hover:underline disabled:cursor-not-allowed disabled:text-gray-400"
                >
                  Back to Shipping
                </button>
              </div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:w-96">
            <OrderSummary
              cart={cart}
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              total={total}
              formatCurrency={formatCurrency}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
