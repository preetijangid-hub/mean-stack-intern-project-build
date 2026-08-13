let projects = [
  {
    id: 1,
    name: "Task Management App",
    description: "A project for managing daily tasks",
    status: "active"
  },
  {
    id: 2,
    name: "Portfolio Website",
    description: "Personal portfolio project",
    status: "completed"
  }
];

// GET all projects
const getProjects = (req, res) => {
  res.status(200).json({
    success: true,
    data: projects
  });
};

// GET single project
const getProjectById = (req, res) => {
  const id = Number(req.params.id);

  const project = projects.find((project) => project.id === id);

  if (!project) {
    return res.status(404).json({
      success: false,
      message: "Project not found"

    });
  }

  res.status(200).json({
    success: true,
    data: project
  });
};

// POST create project
const createProject = (req, res) => {
  const { name, description, status } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Project name is required"
    });
  }

  const newProject = {
    id: projects.length
      ? Math.max(...projects.map((project) => project.id)) + 1
      : 1,
    name,
    description: description || "",
    status: status || "active"
  };

  projects.push(newProject);

  res.status(201).json({
    success: true,
    data: newProject
  });
};

// PUT update project
const updateProject = (req, res) => {
  const id = Number(req.params.id);

  const projectIndex = projects.findIndex(
    (project) => project.id === id
  );

  if (projectIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Project not found"
    });
  }

  const { name, description, status } = req.body;

  projects[projectIndex] = {
    ...projects[projectIndex],
    ...(name !== undefined && { name }),
    ...(description !== undefined && { description }),
    ...(status !== undefined && { status })
  };

  res.status(200).json({
    success: true,
    data: projects[projectIndex]
  });
};

// DELETE project
const deleteProject = (req, res) => {
  const id = Number(req.params.id);

  const projectIndex = projects.findIndex(
    (project) => project.id === id
  );

  if (projectIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Project not found"
    });
  }

  projects.splice(projectIndex, 1);

  res.status(204).send();
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};