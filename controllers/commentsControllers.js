const generateError = require("../helpers/generateError");
const uploadFile = require("../helpers/uploadFile");
const insertCommentsFile = require("../repositories/commentsRepos");

const sendCommentFileController = async (req, res, next) => {
  try {
    const user_id = req.auth.id;
    const { service_id } = req.params;
    const { comment } = req.body;

    // console.log("Datos del req:", req.params, user_id, req.body, solvedFile);

    if (!(req.files || comment)) {
      generateError(`You must submit a comment and/or a file`, 400);
    }

    //ERROR... IF SOLVEDFILE IS NULL.... ?
    const { solvedFile } = req.files;
    const solvedFileName = await uploadFile(solvedFile, "solvedServicesFiles");
    const commentData = { comment, solvedFileName, user_id, service_id };
    await insertCommentsFile(commentData); // nos traemos el insertId?

    res.status(201).send({
      status: "ok",
      message: "You have successfully submited your comment and/or your work",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendCommentFileController,
};
