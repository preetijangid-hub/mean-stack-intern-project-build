const Task = require("../models/Task");

// CREATE TASK
const createTask = async (req, res, next) => {
  try {
    const { title, description, completed } = req.body;

    const task = await Task.create({
      title,
      description,
      completed,
      user: req.user.id,
    });

    return res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    return next(error);
  }
};

// GET TASKS
const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    return next(error);
  }
};

// GET SINGLE TASK
const getTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      const error = new Error("Task not found");
      error.statusCode = 404;
      return next(error);
    }

    return res.status(200).json({
      task,
    });
  } catch (error) {
    return next(error);
  }
};

// UPDATE TASK
const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!task) {
      const error = new Error("Task not found");
      error.statusCode = 404;
      return next(error);
    }

    return res.status(200).json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    return next(error);
  }
};

// DELETE TASK
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      const error = new Error("Task not found");
      error.statusCode = 404;
      return next(error);
    }

    return res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
};
