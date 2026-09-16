const { body, validationResult } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Input validation failed");
    error.statusCode = 400;
    error.errors = errors.array();

    return next(error);
  }

  next();
};

const validateCreateProject = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Project name is required")
    .isLength({ min: 2, max: 80 })
    .withMessage("Project name must be between 2 and 80 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description must not exceed 500 characters"),

  body("team")
    .optional()
    .isArray()
    .withMessage("Team must be a list of names"),

  body("team.*")
    .optional()
    .trim()
    .isString()
    .withMessage("Team members must be names"),

  handleValidationErrors,
];

module.exports = {
  validateCreateProject,
};
