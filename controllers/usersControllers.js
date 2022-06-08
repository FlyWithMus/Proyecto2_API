const registerUser = require("../repositories/registerUser");
const uploadFile = require("../helpers/uploadFile");

// Login users variables
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { selectUserByEmail } = require("../repositories/selectUserByEmail");
const { generateError } = require("../helpers/generateError");

const registerUserController = async (req, res, next) => {
  try {
    const { name, email, password, bio } = req.body;
    const { picture } = req.files;

    if (!(name && email && password)) {
      const error = new Error (
        "User must have name, email and password."
      );
      error.statusCode = 400;
      throw error;
    }
    
    const pictureName = await uploadFile(picture);
    console.log(pictureName);
    const userData = { name, email, password, bio, pictureName };
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
    const { email, password } = req.body;
    const user = await selectUserByEmail(email);
    const encryptedPassword = user?.password;
    const isLoginValid = user && (await bcrypt.compare(password, encryptedPassword));

    if (!isLoginValid) {
      generateError("Wrong password or email", 400);
    }

    res.status(200).send({
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
