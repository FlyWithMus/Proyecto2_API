const getPool = require("../database/getPool");
const pool = getPool();

const selectServices = async () => {
  const [services] = await pool.query(`SELECT * from services`);
  return services;
};

const insertNewService = async ({ id_user, title, description, fileName }) => {
  const [{ insertId }] = await pool.query(
    `INSERT INTO services (id_user, title, description, service_file) VALUES (?,?,?,?)`,
    [id_user, title, description, fileName]
  );
  return insertId;
};
module.exports = { selectServices, insertNewService };
