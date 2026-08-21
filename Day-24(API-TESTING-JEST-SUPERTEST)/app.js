require("dotenv").config();

const express = require("express");

const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Day 24 API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

module.exports = app;