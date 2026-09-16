const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      const error = new Error("Email already registered");
      error.statusCode = 409;
      return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token: generateToken(user._id.toString()),
    });
  } catch (error) {
    return next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const normalizedEmail = (email || "").toLowerCase().trim();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    const isPasswordValid =
      user && (await bcrypt.compare(password || "", user.password));

    if (!user || !isPasswordValid) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      return next(error);
    }

    res.json({
      success: true,
      message: "Login successful",
      token: generateToken(user._id.toString()),
    });
  } catch (error) {
    return next(error);
  }
};