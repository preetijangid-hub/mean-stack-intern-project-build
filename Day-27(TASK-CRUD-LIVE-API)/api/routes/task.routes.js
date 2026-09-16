const express = require("express");

const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const taskController = require("../controllers/task.controller");
const {
  validateCreateTask,
  validateUpdateTask,
} = require("../validators/task.validator");

router.use(authMiddleware);

router.get("/", taskController.getTasks);
router.post("/", validateCreateTask, taskController.createTask);
router.put("/:id", validateUpdateTask, taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;