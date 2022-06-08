const { v4: uuidv4 } = require("uuid");
const path = require("path");

const uploadFile = async (file, folder) => {
  const fileExt = path.extname(file.name);
  const fileName = `${uuidv4()}.${fileExt}`;


  const filePath = path.join(__dirname, "..", "uploads", folder, fileName);


  await file.mv(filePath);

  return fileName;
};

module.exports = uploadFile;
