const {
  selectServices,
  insertNewService,
} = require("../repositories/servicesRepos");
const uploadFile = require("../helpers/uploadFile");
const generateError = require("../helpers/generateError");

const getAllServicesController = async (req, res, next) => {
  try {
    const services = await selectServices();

    if (!services) {
      generateError("There are no services", 400);
    }

    res.status(200).send({
      status: "ok",
      data: services,
    });
  } catch (error) {
    next(error);
  }
};

const registerServiceController = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { file } = req.files;
    console.log(file, title, description);
    const id_user = req.auth.id;

    //ver cómo sería con joi, cuidado con file, no me pilla este error porque es null
    if (!(title && description && file)) {
      generateError(
        "Your service must include title, description, and a file",
        400
      );
    }
    const fileName = await uploadFile(file);

    const newServiceData = { id_user, title, description, fileName };

    const insertId = await insertNewService(newServiceData);

    console.log(insertId);

    await res.status(200).send({
      status: "ok",
      message: "Your service has been registered",
      data: { id: insertId, title: title },
    });
  } catch (error) {
    next(error);
  }
};

const setStatusController = async (req, res, next) => {
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
  getAllServicesController,
  registerServiceController,
  setStatusController,
};
