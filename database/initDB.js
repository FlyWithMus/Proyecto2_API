require("dotenv").config();
const getPool = require("./getPool");

const initDB = async () => {
  try {
    const pool = getPool();

    console.log("Deleting possible created tables...");

    await pool.query("DROP TABLE IF EXISTS users;");
    await pool.query("DROP TABLE IF EXISTS services;");
    await pool.query("DROP TABLE IF EXISTS comments;");

    console.log("Creating tables...");

    await pool.query(`
          CREATE TABLE users (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR (100) NOT NULL,
            email VARCHAR (100) NOT NULL,
            password VARCHAR (50) NOT NULL,
            bio VARCHAR (200),
            picture VARCHAR (150)
        );
    `);

    await pool.query(`
        CREATE TABLE services (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            id_user INT NOT NULL,
            title VARCHAR (100) NOT NULL,
            description VARCHAR (500) NOT NULL,
            service_file VARCHAR (150),
            status BOOLEAN
        );
    `);

    await pool.query(`
          CREATE TABLE comments (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            comment VARCHAR (500),
            solved_file VARCHAR (150),
            id_user INT NOT NULL,
            id_service INT NOT NULL
        );
    `);

    console.log("Tables created!");
  } catch (error) {
    console.error(error);
  } finally {
    process.exit();
  }
};

initDB();