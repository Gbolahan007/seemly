require("dotenv").config();
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();

app.use(helmet());

// Rate limiting
const createCheckoutLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: "Too many checkout attempts, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});

app.use(generalLimiter);

// CORS configuration for production
const allowedOrigins = [
  process.env.FRONTEND_DOMAIN,
  "http://localhost:5173", // Remove in production
  "http://localhost:3000", // Remove in production
  // Remove hardcoded domains - use env vars instead
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // In production, be more strict about origins
      if (process.env.NODE_ENV === "production" && !origin) {
        return callback(new Error("Not allowed by CORS - no origin"));
      }

      // Allow requests with no origin only in development
      if (!origin && process.env.NODE_ENV !== "production") {
        return callback(null, true);
      }

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

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
      console.error(`Webhook signature verification failed:`, err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;
        console.log("Payment succeeded:", session.id);
        // Add your business logic here (save to database, send emails, etc.)
        break;
      case "checkout.session.expired":
        console.log("Checkout session expired:", event.data.object.id);
        break;
      case "payment_intent.payment_failed":
        console.log("Payment failed:", event.data.object.id);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  }
);

app.use(express.json({ limit: "10mb" })); // Add size limit
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    status: "Server is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    version: process.env.npm_package_version || "1.0.0",
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Create Stripe Checkout Session with rate limiting
app.post(
  "/api/create-checkout-session",
  createCheckoutLimiter,
  async (req, res) => {
    const {
      amount,
      currency,
      customer_email,
      customer_name,
      product_name,
      metadata,
    } = req.body;

    // Enhanced input validation
    if (!amount || amount <= 0 || amount > 99999900) {
      // Max $999,999
      return res.status(400).json({ error: "Invalid amount" });
    }

    if (
      !currency ||
      !["usd", "eur", "gbp", "cad", "aud"].includes(currency.toLowerCase())
    ) {
      return res.status(400).json({ error: "Unsupported currency" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      !customer_email ||
      !emailRegex.test(customer_email) ||
      customer_email.length > 254
    ) {
      return res.status(400).json({ error: "Invalid email" });
    }

    if (!product_name || product_name.length > 200) {
      return res.status(400).json({ error: "Invalid product name" });
    }

    if (customer_name && customer_name.length > 100) {
      return res.status(400).json({ error: "Customer name too long" });
    }

    try {
      const sessionConfig = {
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: currency.toLowerCase(),
              product_data: {
                name: product_name,
              },
              unit_amount: Math.round(amount), // Ensure integer
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        customer_email,
        success_url: `${process.env.FRONTEND_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_DOMAIN}/cancel`,
        expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // 30 minutes
      };

      // Add metadata if provided
      if (metadata || customer_name) {
        sessionConfig.metadata = {
          ...(customer_name && { customer_name }),
          ...metadata,
        };
      }

      const session = await stripe.checkout.sessions.create(sessionConfig);

      res.json({ sessionId: session.id });
    } catch (error) {
      console.error("Error creating checkout session:", error.message);
      // Don't expose internal error details
      res.status(500).json({
        error: "Unable to create checkout session. Please try again.",
      });
    }
  }
);

// Verify payment endpoint with better error handling
app.get("/api/verify-payment/:sessionId", async (req, res) => {
  const { sessionId } = req.params;

  // Validate session ID format
  if (!sessionId || !sessionId.startsWith("cs_")) {
    return res.status(400).json({ error: "Invalid session ID" });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    res.json({
      status: session.payment_status,
      customer_email: session.customer_email,
      amount_total: session.amount_total,
      currency: session.currency,
    });
  } catch (error) {
    console.error("Error verifying payment:", error.message);
    if (error.type === "StripeInvalidRequestError") {
      res.status(404).json({ error: "Session not found" });
    } else {
      res.status(500).json({ error: "Unable to verify payment" });
    }
  }
});

// Handle 404s
app.use("*", (req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error("Unhandled error:", error);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 3000;

// Only start server if not in Vercel serverless environment
if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
    console.log(`Frontend domain: ${process.env.FRONTEND_DOMAIN}`);
  });
}

module.exports = app;
