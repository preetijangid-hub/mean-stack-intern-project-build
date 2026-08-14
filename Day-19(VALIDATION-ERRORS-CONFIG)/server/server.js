const express = require("express");
const cors = require("cors");

const config = require("./config/env");
const userRoutes = require("./routes/userRoutes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Global middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Day 19 Validated API is running",
    environment: config.nodeEnv,
  });
});

// API routes
app.use("/api/users", userRoutes);

// 404 handler
app.use(notFound);

// Centralized error handler
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
  console.log(
    `Server running on http://localhost:${config.port}`
  );
});