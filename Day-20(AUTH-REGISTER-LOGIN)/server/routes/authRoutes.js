const express = require("express");
const { validationResult } = require("express-validator");

const {
  register,
  login
} = require("../controllers/authController");

const {
  registerValidator,
  loginValidator
} = require("../validators/authValidator");

const router = express.Router();

// Validation middleware
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: {
        message: "Validation failed",
        statusCode: 400,
        details: errors.array().map((error) => ({
          type: "field",
          value: error.value,
          msg: error.msg,
          path: error.path,
          location: error.location
        }))
      }
    });
  }

  next();
};

// Register
router.post(
  "/register",
  registerValidator,
  validateRequest,
  register
);

// Login
router.post(
  "/login",
  loginValidator,
  validateRequest,
  login
);

module.exports = router;