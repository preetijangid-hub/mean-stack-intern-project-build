const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());

// ===============================
// MongoDB Connection
// ===============================

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });

// ===============================
// User Schema
// ===============================

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    age: {
      type: Number,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

// ===============================
// Home Route
// ===============================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Day 21 MongoDB API is running",
  });
});

// ===============================
// CREATE User
// ===============================

app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create user",
      error: error.message,
    });
  }
});

// ===============================
// READ - Get all users
// ===============================

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();

    res.json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
});

// ===============================
// READ - Filter users by age
// Example: /users/filter/age?minAge=23
// ===============================

app.get("/users/filter/age", async (req, res) => {
  try {
    const minAge = Number(req.query.minAge);

    const users = await User.find({
      age: {
        $gt: minAge,
      },
    });

    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to filter users",
      error: error.message,
    });
  }
});

// ===============================
// READ - Filter by city
// Example: /users/filter/city?cities=Jaipur,Delhi
// ===============================

app.get("/users/filter/city", async (req, res) => {
  try {
    const cities = req.query.cities
      ? req.query.cities.split(",")
      : [];

    const users = await User.find({
      city: {
        $in: cities,
      },
    });

    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to filter users",
      error: error.message,
    });
  }
});

// ===============================
// PROJECTION
// Example: /users/summary
// ===============================

app.get("/users/summary", async (req, res) => {
  try {
    const users = await User.find()
      .select("name email -_id");

    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user summary",
      error: error.message,
    });
  }
});

// ===============================
// UPDATE User
// ===============================

app.put("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update user",
      error: error.message,
    });
  }
});

// ===============================
// DELETE User
// ===============================

app.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to delete user",
      error: error.message,
    });
  }
});

// ===============================
// Server
// ===============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});