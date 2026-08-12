const express = require("express");

const router = express.Router();

let tasks = [
  { id: 1, title: "Learn Express", completed: false },
  { id: 2, title: "Build REST API", completed: true }
];

router.get("/", (req, res) => {
  res.json(tasks);
});

router.post("/", (req, res) => {
  const { title } = req.body;

  const newTask = {
    id: Date.now(),
    title,
    completed: false
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.title = req.body.title ?? task.title;
  task.completed = req.body.completed ?? task.completed;

  res.json(task);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  const deletedTask = tasks.splice(index, 1);

  res.json({
    message: "Task deleted successfully",
    task: deletedTask[0]
  });
});

module.exports = router;
