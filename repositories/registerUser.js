const getPool = require("../database/getPool");

const registerUser = async ({ name, email, password, bio, pictureName }) => {
    const pool = getPool();

    const [{ registerID }] = await pool.query(
        "INSERT INTO users (name, email, password, bio, picture) VALUES (?, ?, ?, ?, ?)",
        [name, email, password, bio, pictureName]
    );

    return registerID;
};

module.exports = registerUser;