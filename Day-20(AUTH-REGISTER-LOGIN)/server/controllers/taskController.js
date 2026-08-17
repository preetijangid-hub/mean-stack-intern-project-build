const tasks = [
  {
    id: 1,
    title: "Complete Day 20",
    completed: false,
    userId: null
  }
];

const getTasks = (req, res, next) => {
  try {
    const userTasks = tasks.filter(
      (task) => task.userId === req.user.userId
    );

    res.status(200).json({
      success: true,
      message: "Tasks fetched successfully",
      data: userTasks
    });
  } catch (error) {
    next(error);
  }
};

const createTask = (req, res, next) => {
  try {
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        error: {
          message: "Task title is required",
          statusCode: 400,
          details: []
        }
      });
    }

    const task = {
      id: Date.now(),
      title: title.trim(),
      completed: false,
      userId: req.user.userId
    };

    tasks.push(task);

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
  createTask
};