const {
  selectServices,
  insertNewService,
  updateServiceStatus,
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
    const fileName = await uploadFile(file, "requiredServicesFiles");

    const newServiceData = { id_user, title, description, fileName };

    const insertId = await insertNewService(newServiceData);

    //lo quiero para algo: insertId?
    console.log(insertId);

    await res.status(200).send({
      status: "ok",
      message: "Your service has been successfully registered",
      data: { id: insertId, title: title },
    });
  } catch (error) {
    next(error);
  }
};

const setStatusController = async (req, res, next) => {
  try {
    const { service_id } = req.params;
    const id_user = req.auth.id;
    console.log(service_id, id_user);
    const affectedRows = await updateServiceStatus(service_id, id_user);
    if (!affectedRows) {
      generateError(
        `You are not allowed to set the status of this service or that service does not exist`,
        403
      );
    }
    res.status(200).send({
      status: "ok",
      message: "Your service has been marked as resolved",
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
