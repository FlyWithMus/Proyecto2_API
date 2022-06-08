const {
  selectUserById,
  updateUserData,
  removeUser,
} = require("../repositories/extraUsersRepos");

// const bcrypt = require("bcrypt");
const generateError = require("../helpers/generateError");

const modifyUserController = async (req, res, next) => {
  try {
    const user_id = req.auth.id;
    const userDB = await selectUserById(user_id);
    //IF new email, new picture or new password!!!!

    const { name, email, password, bio } = req.body;
    const { picture } = req.files;

    if (email) {
      /* Error...You need to register again..
      Else, send a registration code and activate it. 
      We must get it out of this path and create a new one. */
    }
    if (password) {
      /* const encryptedPassword = await bcrypt.hash(password, 10); */
    }
    if (picture) {
      /* Delete userDB.picture and  upload and update the new PicName */
    }

    /* Make encryptedPassword accesible, also pictureName.. */
    await updateUserData(
      { ...userDB },
      name,
      /*encryptedPassword*/ bio,
      user_id
    );

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
  modifyUserController,
  deleteUserController,
};
