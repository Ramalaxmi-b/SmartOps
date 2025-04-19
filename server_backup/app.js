const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();
app.use(express.static("public"));

// 🛡 Security Middleware
app.use(helmet());
app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    next();
});

// 🌍 Enable CORS
app.use(cors());

// 📝 Logging Middleware
app.use(morgan("dev"));

// ⏳ Rate Limiting (Max 100 requests per 15 mins per IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: "Too many requests, please try again later.",
});
app.use(limiter);

// 🛠 Built-in Middleware
app.use(express.json());

// 🔄 Import Routes
const metricsRoutes = require("./routes/metricsRoutes");
const authRoutes = require("./routes/authRoutes");
const anomalyRoutes = require("./routes/anomalyRoutes");

// 🛤 Define API Routes
app.use("/api/metrics", metricsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/anomaly", anomalyRoutes);

// ❌ Error Handling Middleware
const errorHandler = require("./utils/errorHandler");
app.use(errorHandler);

// 🚀 Export the configured app
module.exports = app;
