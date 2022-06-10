const getPool = require("../database/getPool");
const pool = getPool();

const selectServiceById = async (serviceId) => {
  const [[service]] = await pool.query("SELECT * FROM services WHERE id = ?", [
    serviceId,
  ]);

  return service;
};

const insertCommentsFile = async ({
  comment,
  solvedFile,
  userId,
  serviceId,
}) => {
  const [{ insertId }] = await pool.query(
    `INSERT INTO comments (comment, solved_file, id_user, id_service) VALUES (?,?,?,?);`,
    [comment, solvedFile, userId, serviceId]
  );
  return insertId;
};

module.exports = { selectServiceById, insertCommentsFile };
