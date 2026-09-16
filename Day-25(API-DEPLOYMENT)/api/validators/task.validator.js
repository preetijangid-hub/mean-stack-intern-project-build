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

const validateCreateTask = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Title must be between 2 and 100 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description must not exceed 500 characters"),

  body("completed")
    .optional()
    .isBoolean()
    .withMessage("Completed must be a boolean"),

  handleValidationErrors,
];

const validateUpdateTask = [
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isLength({ min: 2, max: 100 })
    .withMessage("Title must be between 2 and 100 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description must not exceed 500 characters"),

  body("completed")
    .optional()
    .isBoolean()
    .withMessage("Completed must be a boolean"),

  handleValidationErrors,
];

module.exports = {
  validateCreateTask,
  validateUpdateTask,
};
