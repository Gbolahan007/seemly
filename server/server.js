require("dotenv").config();
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const cors = require("cors");

const app = express();

// CORS configuration for production
const allowedOrigins = [
  process.env.FRONTEND_DOMAIN,
  "http://localhost:5173", // Keep for local development
  "http://localhost:3000",
  "https://seemly.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin) return callback(null, true);

      if (
        allowedOrigins.indexOf(origin) !== -1 ||
        process.env.NODE_ENV === "development"
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    status: "Server is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "Server is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// Create Stripe Checkout Session
app.post("/api/create-checkout-session", async (req, res) => {
  const { amount, currency, customer_email, customer_name, product_name } =
    req.body;

  // Input validation
  if (!amount || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }
  if (!currency || !["usd", "eur", "gbp"].includes(currency)) {
    return res.status(400).json({ error: "Unsupported currency" });
  }
  if (!customer_email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer_email)) {
    return res.status(400).json({ error: "Invalid email" });
  }
  if (!product_name) {
    return res.status(400).json({ error: "Product name is required" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: product_name,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email,
      metadata: {
        customer_name: customer_name,
      },
      success_url: `${process.env.FRONTEND_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_DOMAIN}/cancel`,
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating session:", error);
    res.status(400).json({ error: error.message });
  }
});

// Webhook to handle Stripe events
app.post(
  "/api/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(`Webhook signature verification failed.`, err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;
        console.log("Payment succeeded:", session.id);
        break;
      case "checkout.session.expired":
        console.log("Checkout session expired:", event.data.object.id);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  }
);

// Verify payment endpoint
app.get("/api/verify-payment/:sessionId", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(
      req.params.sessionId
    );
    res.json({
      status: session.payment_status,
      customer_email: session.customer_email,
      amount_total: session.amount_total,
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;

// Only start server if not in Vercel serverless environment
if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Frontend domain: ${process.env.FRONTEND_DOMAIN}`);
  });
}

module.exports = app;
