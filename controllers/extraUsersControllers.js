const {
  selectUserById,
  updateUserData,
  removeUser,
} = require("../repositories/extraUsersRepos");

const bcrypt = require("bcrypt");
const generateError = require("../helpers/generateError");

const editUserController = async (req, res, next) => {
  try {
    const userId = req.auth.id;
    const userDB = await selectUserById(userId);
    //IF new email, new picture or new password!!!!

    const { email, password } = req.body;
    //VALIDAR CON joi body

    const { picture } = req.files;

    if (email) {
      /* Error...You need to register again..
      Else, send a registration code and activate it. METR codigo...al MISMO user_id DB, correo...comprobar correo.
      We must get it out of this path and create a new one. */
    }
    if (password) {
      req.body.password = await bcrypt.hash(password, 10);
    }
    if (picture) {
      /* req.body.pictureName 
      Delete userDB.picture and  upload and update the new PicName DB */
    }

    /* Make encryptedPassword accesible, also pictureName.. */
    await updateUserData({ ...userDB, ...req.body });

    res.send({
      status: "error",
      message: "Under construction",
    });
  } catch (error) {
    next(error);
  }
};

const deleteUserController = async (req, res, next) => {
  try {
    const user_id = req.auth.id;
    const affectedRows = await removeUser(user_id);

    if (!affectedRows) {
      generateError(`This user does not exist`, 404);
    }
    res.status(200).send({
      status: "ok",
      message: "User has been deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  editUserController,
  deleteUserController,
};
