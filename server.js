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
const notFound = require("./middlewares/NotFound");
const errorHandler = require("./middlewares/errorhandler");

const { SERVER_PORT } = process.env;

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(fileUpload());
app.use(express.static("./uploads"));

//USERS ENDPOINTS
app.post("/users", registerUserController);
app.get("/users/activate/:registrationCode", activateUserController); // Activate user
app.post("/login", loginUserController);
app.put("users/validate/:registrationCode", validateUserController);
// app.get("/users/:id", validateAuth, getInfoUserController )

//SERVICES ENDPOINTS
app.get("/", getAllServicesController);
app.post("/services", validateAuth, registerServiceController);
app.patch("/services/:service_id", validateAuth, setStatusController);

//COMMENTS ENDPOINTS
app.post("/comments/:service_id", validateAuth, sendCommentFileController);

//EXTRA USER ENDPOINTS
app.patch("/users", validateAuth, modifyUserController);
app.delete("/users", validateAuth, deleteUserController);

//Middleware 404
app.use(notFound);

//Middleware Error
app.use(errorHandler);

//Listening
app.listen(SERVER_PORT, () => {
  console.log(`Server listening at localhost:${SERVER_PORT}`);
});
