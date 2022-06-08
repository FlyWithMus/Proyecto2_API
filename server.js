const express = require("express");
require("dotenv").config();
const fileUpload = require("express-fileupload");
const morgan = require("morgan");

const {
  registerUserController,
  activateUserController,
  validateUserController,
  loginUserController,
} = require("./controllers/usersControllers");

const {
  getAllServicesController,
  registerServiceController,
  setStatusController,
} = require("./controllers/servicesControllers");

const {
  sendCommentFileController,
} = require("./controllers/commentsControllers");

const {
  modifyUserController,
  deleteUserController,
} = require("./controllers/extraUsersControllers");

const validateAuth = require("./middlewares/authentication");

const { SERVER_PORT } = process.env;

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(fileUpload());
app.use(express.static("./uploads"));

//USERS ENDPOINTS
app.post("/users", registerUserController);
app.get("/users/activate/:registrationCode", activateUserController); // Activate user
app.put("users/validate/:registrationCode", validateUserController);
app.post("/login", loginUserController);
// app.get("/users/:id", validateAuth, getInfoUserController )

//SERVICES ENDPOINTS
app.get("/", getAllServicesController);
app.post("/services", validateAuth, registerServiceController); //middleware auth
app.patch("/services/:service_id", validateAuth, setStatusController); //middleware auth

//COMMENTS ENDPOINTS
app.post("/comments/:service_id", validateAuth, sendCommentFileController); //middleware auth

//EXTRA USER ENDPOINTS
app.patch("/users", modifyUserController); //middleware auth
app.delete("/users", deleteUserController); //middleware auth

//Middleware 404
app.use((req, res) =>
  res.status(404).send({
    status: "error",
    message: "Not Found",
  })
);

//Middleware Error
app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.statusCode || 500).send({
    status: "error",
    message: error.message,
  });
});

//Listening
app.listen(SERVER_PORT, () => {
  console.log(`Server listening at localhost:${SERVER_PORT}`);
});
