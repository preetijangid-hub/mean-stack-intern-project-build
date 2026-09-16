const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
  validateCreateTask,
  validateUpdateTask,
} = require("../validators/task.validator");

const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");

router.use(authMiddleware);

router.post("/", validateCreateTask, createTask);
router.get("/", getTasks);
router.get("/:id", getTask);
router.put("/:id", validateUpdateTask, updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
