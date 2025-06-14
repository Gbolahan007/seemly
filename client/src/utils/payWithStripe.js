import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const payWithStripeCheckout = async ({
  email,
  amount,
  firstName,
  lastName,
  onClose,
  onError,
}) => {
  try {
    const stripe = await stripePromise;
    if (!stripe) {
      throw new Error("Stripe failed to load!");
    }

    // Validate inputs
    if (!email || !amount || amount <= 0 || !firstName || !lastName) {
      throw new Error("Invalid input parameters");
    }

    

    // Create checkout session on your backend
    const response = await fetch(`/api/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100),
        currency: "usd",
        customer_email: email,
        customer_name: `${firstName} ${lastName}`,
        product_name: "Order from Your Store",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to create checkout session");
    }

    const { sessionId } = await response.json();

    // Redirect to Stripe Checkout
    const { error } = await stripe.redirectToCheckout({
      sessionId: sessionId,
    });

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    console.error("Error creating checkout session:", error);
    if (onError) onError(error.message);
    if (onClose) onClose();
  }
};

export { payWithStripeCheckout };
