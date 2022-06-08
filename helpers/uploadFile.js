const { v4: uuidv4 } = require("uuid");
const path = require("path");

const uploadFile = async (file) => {
  const fileExt = path.extname(file.name);
  const fileName = `${uuidv4()}.${fileExt}`;

  const filePath = path.join(
    __dirname,
    "..",
    "uploads",
    fileName
  );

  await file.mv(filePath);

  return fileName;
};

module.exports = uploadFile;
