const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// ===============================
// CORS
// ===============================

app.use(
  cors({
    origin: [
      "http://localhost:4200",
      "https://taskflow-client.onrender.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false
  })
);

// ===============================
// MIDDLEWARE
// ===============================

app.use(express.json());

// ===============================
// HEALTH CHECK
// ===============================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "TaskFlow API is running"
  });
});

// ===============================
// AUTH ROUTES
// ===============================

app.use("/api/auth", authRoutes);

// ===============================
// TASK ROUTES
// ===============================

app.use("/api/tasks", taskRoutes);

// ===============================
// 404
// ===============================

app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.statusCode = 404;
  next(error);
});

// ===============================
// GLOBAL ERROR HANDLER
// ===============================

app.use(errorHandler);

module.exports = app;
