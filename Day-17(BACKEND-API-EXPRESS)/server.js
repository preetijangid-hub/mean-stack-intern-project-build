const express = require("express");

const app = express();

app.use(express.json());

const usersRouter = require("./routes/users");
const tasksRouter = require("./routes/tasks");

app.use("/api/users", usersRouter);
app.use("/api/tasks", tasksRouter);

app.get("/", (req, res) => {
  res.json({ message: "Day 17 Express API is running" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
