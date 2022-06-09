const getPool = require("../database/getPool");
const pool = getPool();

const insertCommentsFile = async ({
  comment,
  solvedFileName,
  userId,
  serviceId,
}) => {
  const [{ insertId }] = await pool.query(
    `INSERT INTO comments (comment, solved_file, id_user, id_service) VALUES (?,?,?,?);`,
    [comment, solvedFileName, userId, serviceId]
  );
  return insertId;
};

module.exports = insertCommentsFile;
