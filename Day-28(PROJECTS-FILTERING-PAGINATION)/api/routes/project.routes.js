const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const { validateCreateProject } = require("../validators/project.validator");
const {
  getProjects,
  createProject,
} = require("../controllers/project.controller");

router.use(authMiddleware);

router.get("/", getProjects);
router.post("/", validateCreateProject, createProject);

module.exports = router;