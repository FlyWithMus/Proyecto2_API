const insertUser = require("../repositories/insertUser");
const uploadFile = require("../helpers/uploadFile");
const { v4: uuidv4 } = require("uuid");
const sendMail = require("../helpers/sendMail");
const {
  registerUserSchema,
  checkUserSchema,
} = require("../schemas/usersSchemas");

// Login users variables
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const selectUserByEmail = require("../repositories/selectUserByEmail");
const generateError = require("../helpers/generateError");

// Activate users variables
const selectUserByActivationCode = require("../repositories/selectUserByActivationCode");
const deleteRegistrationCode = require("../repositories/deleteRegistrationCode");

const registerUser = async (req, res, next) => {
  try {
    await registerUserSchema.validateAsync(req.body);

    const { name, email, password, bio } = req.body;

    const picture = req.files?.picture;

    const user = await selectUserByEmail(email);

    if (email === user?.email) {
      generateError("This email has already been registered", 400);
    }

    const registrationCode = uuidv4();

    const encryptedPassword = await bcrypt.hash(password, 10);
    const userData = {
      name,
      email,
      encryptedPassword,
      bio,
      registrationCode,
    };
    if (picture) {
      const pictureName = await uploadFile(picture, "profilePictures");
      userData.pictureName = pictureName;
    }

    const insertId = await insertUser(userData);
    const { SERVER_HOST, SERVER_PORT } = process.env;

    await sendMail(
      "Welcome to the best digital services portal!",
      `
      <p>Activate your account here: <p>
      <a href="http://${SERVER_HOST}:${SERVER_PORT}/users/activate/${registrationCode}">Activate account</a>
      `,
      email
    );

    res.status(201).send({
      status: "ok",
      data: { id: insertId, ...userData },
    });
  } catch (error) {
    next(error);
  }
};

const activateUserController = async (req, res, next) => {
  try {
    const { registrationCode } = req.params;

    const user = await selectUserByActivationCode(registrationCode);

    if (!user) {
      generateError("Invalid registration code or already activated", 404);
    }

    await deleteRegistrationCode(user.id);

    res.status(200).send({ status: "ok", message: "User activated" });
  } catch (error) {
    next(error);
  }
};

const loginUserController = async (req, res, next) => {
  try {
    await checkUserSchema.validateAsync(req.body);
    const { email, password } = req.body;

    const user = await selectUserByEmail(email);

    const encryptedPassword = user?.password;

    const isLoginValid =
      user && (await bcrypt.compare(password, encryptedPassword));

    if (!isLoginValid) {
      generateError("Wrong password or email", 400);
    }

    if (user.registrationCode) {
      generateError(
        "User not activated. Check your inbox and activate it through the link.",
        400
      );
    }

    const tokenPayload = {
      id: user.id,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).send({ status: "ok", data: { token } });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  activateUserController,
  loginUserController,
};
