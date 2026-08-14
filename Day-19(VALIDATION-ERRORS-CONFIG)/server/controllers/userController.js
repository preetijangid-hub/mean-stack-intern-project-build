const createUser = async (req, res, next) => {
  try {
    const { name, email, age } = req.body;

    const user = {
      id: Date.now(),
      name,
      email,
      age,
    };

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
};