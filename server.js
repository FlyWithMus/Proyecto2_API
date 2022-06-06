const express = require("express");
require("dotenv").config();

const morgan = require("morgan");

const {
  registerUserController,
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

const { SERVER_PORT } = process.env;

console.log(process.env);

const app = express();

app.use(morgan("dev"));
app.use(express.json());

//USERS ENDPOINTS
app.post("/users", registerUserController);
app.put("users/validate/:registrationCode", validateUserController);
app.post("/login", loginUserController);
// app.get("/users/:id", validateAuth, getInfoUserController )

//SERVICES ENDPOINTS
app.get("/", getAllServicesController);
app.post("/services", registerServiceController); //middleware auth
app.patch("/services/:service_id", setStatusController); //middleware auth

//COMMENTS ENDPOINTS
app.post("/comments/:service_id", sendCommentFileController); //middleware auth

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

  res.status(error.status || 500).send({
    status: "error",
    message: error.message,
  });
});

//Listening
app.listen(SERVER_PORT, () => {
  console.log(`Server listening at localhost:${SERVER_PORT}`);
});
