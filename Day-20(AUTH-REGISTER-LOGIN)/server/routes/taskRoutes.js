const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
  getTasks,
  createTask
} = require("../controllers/taskController");

const router = express.Router();

// All task routes are protected
router.use(authMiddleware);

router.get("/", getTasks);

router.post("/", createTask);

module.exports = router;