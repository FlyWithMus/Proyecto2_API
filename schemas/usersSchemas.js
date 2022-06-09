const Joi = require("joi");
const generateError = require("../helpers/generateError");

const editUserSchema = Joi.object({
  email: Joi.email()
    .min(4)
    .max(100)
    .error(() => {
      generateError(
        "Your email must be registered in a valid format and must have between 4 and 100 characters",
        400
      );
    }),
  password: Joi.password()
    .min(4)
    .max(500)
    .error(() => {
      generateError("Password must have contain 4 and 500 characters", 400);
    }),
});

// const newUserSchema = Joi.ob
module.exports = editUserSchema;
