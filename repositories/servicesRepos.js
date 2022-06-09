const getPool = require("../database/getPool");
const pool = getPool();

const selectServices = async () => {
  const [services] = await pool.query(`SELECT * from services`);
  return services;
};

const insertNewService = async ({ userId, title, description, fileName }) => {
  const [{ insertId }] = await pool.query(
    `INSERT INTO services (id_user, title, description, service_file) VALUES (?,?,?,?)`,
    [userId, title, description, fileName]
  );
  return insertId;
};

const updateServiceStatus = async (serviceId, userId) => {
  const [{ affectedRows }] = await pool.query(
    `UPDATE services SET status=1 WHERE id=? AND id_user=?;`,
    [serviceId, userId]
  );
  console.log(affectedRows);
  return affectedRows;
};
module.exports = { selectServices, insertNewService, updateServiceStatus };
