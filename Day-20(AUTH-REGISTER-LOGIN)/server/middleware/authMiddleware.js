const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: {
          message: "Authentication required",
          statusCode: 401,
          details: []
        }
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: {
        message: "Invalid or expired token",
        statusCode: 401,
        details: []
      }
    });
  }
};

module.exports = authMiddleware;