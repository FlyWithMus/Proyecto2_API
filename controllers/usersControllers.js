const registerUser = require("../repositories/registerUser");
const uploadFile = require("../helpers/uploadFile");

// Login users variables
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const selectUserByEmail = require("../repositories/selectUserByEmail");
const generateError = require("../helpers/generateError");

// Activate users variables
const selectUserByActivationCode = require("../repositories/selectUserByActivationCode");
const deleteRegistrationCode = require("../repositories/deleteRegistrationCode");

const registerUserController = async (req, res, next) => {
  try {
    const { name, email, password, bio, registrationCode } = req.body;
    const { picture } = req.files;

    if (!(name && email && password)) {
      const error = new Error (
        "User must have name, email and password."
      );
      error.statusCode = 400;
      throw error;
    }
    
    const pictureName = await uploadFile(picture, "pictures");
    console.log(pictureName);
    const userData = { name, email, password, bio, pictureName, registrationCode };
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

const activateUserController = async (req, res, next) => {
  try {
    const { registrationCode } = req.params;

    const user = await selectUserByActivationCode(registrationCode);

    if(!user) {
      generateError("Invalid registration code or already activated", 404);
    }

    await deleteRegistrationCode(user.id);

    res.status(200).send({ status: "ok", message: "User activated" });
  } catch (error) {
    next(error);
  }
}

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

    if (user.registrationCode) {
      generateError("User not activated. Check your email.", 400);
    }

    const tokenPayload = {
      id: user.id,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).send({ status: "ok", data: { token }, });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUserController,
  activateUserController,
  validateUserController,
  loginUserController,
};
