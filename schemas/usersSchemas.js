const Joi = require("joi");
const generateError = require("../helpers/generateError");

const editUserSchema = Joi.object({
  email: Joi.string()
    .min(4)
    .max(100)
    .email()
    .error(() => {
      generateError(
        "Your email must be registered in a valid format and must have between 4 and 100 characters",
        400
      );
    }),
  password: Joi.string()
    .min(4)
    .max(500)
    .error(() => {
      generateError("Password must have contain 4 and 500 characters", 400);
    }),
});

const registerUserSchema = Joi.object({
  name: Joi.string()
    .required()
    .min(4)
    .max(100)
    .error(() => {
      generateError("Name is a required field. Must be between 4 and 100 characters", 400);
    }
  ),
  email: Joi.string()
    .required()
    .min(4)
    .max(100)
    .email()
    .error(() => {
      generateError("Email is a required field. Must have the appropiate format and must be between 4 and 100 characters", 400);
    }
  ),
  password: Joi.string()
    .required()
    .min(4)
    .max(500)
    .error(() => {
      generateError("Password is a required field. Must be between 4 and 500 characters", 400);
    }
  ),
  bio: Joi.string()
    .min(4)
    .max(500)
    .error(() => {
      generateError("Bio must be between 4 and 500 characters", 400);
    }
  ),
});

// const newUserSchema = Joi.ob
module.exports = { editUserSchema, registerUserSchema };
