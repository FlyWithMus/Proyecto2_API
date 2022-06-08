const getPool = require("../database/getPool");
const pool = getPool();

const insertCommentsFile = async ({
  comment,
  solvedFileName,
  user_id,
  service_id,
}) => {
  const [{ insertId }] = await pool.query(
    `INSERT INTO comments (comment, solved_file, id_user, id_service) VALUES (?,?,?,?);`,
    [comment, solvedFileName, user_id, service_id]
  );
  return insertId;
};

module.exports = insertCommentsFile;
