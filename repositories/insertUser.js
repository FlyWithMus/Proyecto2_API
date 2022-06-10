const getPool = require("../database/getPool");

const insertUser = async ({
  name,
  email,
  encryptedPassword,
  bio,
  pictureName,
  registrationCode,
}) => {
  const pool = getPool();

  const [{ insertId }] = await pool.query(
    "INSERT INTO users (name, email, password, bio, picture, registrationCode) VALUES (?, ?, ?, ?, ?, ?)",
    [name, email, encryptedPassword, bio, pictureName, registrationCode]
  );
  return insertId;
};

module.exports = insertUser;
