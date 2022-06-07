const { registerUser } = require("../repositories/registerUser");

const registerUserController = async (req, res, next) => {
  try {
    const { name, email, password, bio, picture } = req.body;

    if (!(name && email && password && bio && picture)) {
      const error = new Error (
        "User must have name, email, password, bio and picture."
      );
      error.statusCode = 400;
      throw error;
    }

    const userData = { name, email, password, bio, picture };

    const resgisterId = await registerUser(userData);

    res.status(201).send({
      status: "ok",
      data: {
        id: resgisterId,
        ...userData,
      },
    });
  } catch (error) {
    next(error);
  }
};

const validateUserController = async (req, res, next) => {
  try {
    res.send({
      status: "error",
      message: "Not implemented yet",
    });
  } catch (error) {
    next(error);
  }
};

const loginUserController = async (req, res, next) => {
  try {
    res.send({
      status: "error",
      message: "Not implemented yet",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUserController,
  validateUserController,
  loginUserController,
};
