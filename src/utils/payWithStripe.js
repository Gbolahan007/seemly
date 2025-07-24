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

    // Get server URL from environment variable or default to localhost:3000
    const serverUrl =
      import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

    // Get cart and shipping info from localStorage (as you're already doing)
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const shippingInfo = JSON.parse(
      localStorage.getItem("shippingInfo") || "{}",
    );

    // Prepare metadata for Stripe - exactly what you want to see
    const metadata = {
      // Shipping Info
      shipping_firstName: shippingInfo.firstName || "",
      shipping_lastName: shippingInfo.lastName || "",
      shipping_email: shippingInfo.email || "",
      shipping_address: shippingInfo.address || "",
      shipping_city: shippingInfo.city || "",
      shipping_zipCode: shippingInfo.zipCode || "",
      shipping_country: shippingInfo.country || "",

      // Order Total
      order_total: amount.toString(),

      // Cart Items
      cart_items_count: cart.length.toString(),
    };

    // Add individual cart items to metadata
    cart.forEach((item, index) => {
      if (index < 15) {
        // Limit to 15 items to stay within Stripe's 50 metadata key limit
        metadata[`item_${index + 1}_name`] = (
          item.name ||
          item.title ||
          "Product"
        ).substring(0, 500);
        metadata[`item_${index + 1}_price`] = item.price.toString();
        metadata[`item_${index + 1}_quantity`] = item.quantity.toString();
      }
    });

    // Create checkout session on your backend
    const response = await fetch(`${serverUrl}/api/create-checkout-session`, {
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
        // Add the order details
        metadata: metadata,
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
