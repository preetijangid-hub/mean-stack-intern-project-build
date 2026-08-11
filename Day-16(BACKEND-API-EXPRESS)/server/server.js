const express = require("express");

const app = express();
const PORT = 3000;

// Request logger
app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} - ${duration}ms`);
  });

  next();
});

// Health route
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Server is healthy",
  });
});

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Day 16 Backend API is running",
  });
});

app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});