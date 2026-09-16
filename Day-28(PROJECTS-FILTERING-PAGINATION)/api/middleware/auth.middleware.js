const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (
    !authorizationHeader ||
    !authorizationHeader.startsWith("Bearer ")
  ) {
    return res.status(401).json({
      success: false,
      message: "Authentication token required",
    });
  }

  try {
    const token = authorizationHeader.split(" ")[1];
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.userId = decodedToken.id;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};