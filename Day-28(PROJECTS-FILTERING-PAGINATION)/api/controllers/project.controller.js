const Project = require("../models/Project");

exports.getProjects = async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 6, 1), 50);
    const search = (req.query.search || "").trim();

    const filter = { user: req.userId };
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    const total = await Project.countDocuments(filter);

    const projects = await Project.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      success: true,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      projects,
    });
  } catch (e) {
    return next(e);
  }
};

exports.createProject = async (req, res, next) => {
  try {
    const { name, description = "", team = [] } = req.body;

    const project = await Project.create({
      name: name.trim(),
      description: description.trim(),
      team: team.map((m) => m.trim()).filter(Boolean),
      user: req.userId,
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (e) {
    return next(e);
  }
};