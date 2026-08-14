const { body, validationResult } = require("express-validator");

const validateUser = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 3 and 50 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),

  body("age")
    .notEmpty()
    .withMessage("Age is required")
    .isInt({ min: 18, max: 100 })
    .withMessage("Age must be between 18 and 100"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error("Input validation failed");
      error.statusCode = 400;
      error.errors = errors.array();

      return next(error);
    }

    next();
  },
];

module.exports = validateUser;