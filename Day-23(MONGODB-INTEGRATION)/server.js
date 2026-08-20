const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const taskRoutes = require("./routes/task.routes");
const userRoutes = require("./routes/user.routes");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// MongoDB connection
connectDB();

// Health route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Day 23 MongoDB Integration API is running",
  });
});

// API routes
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

// 404 route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});