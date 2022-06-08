const getPool = require("../database/getPool");

const registerUser = async ({ name, email, password, bio, pictureName, registrationCode }) => {
    const pool = getPool();

    const [{ registerID }] = await pool.query(
        "INSERT INTO users (name, email, password, bio, picture, registrationCode) VALUES (?, ?, ?, ?, ?, ?)",
        [name, email, password, bio, pictureName, "-"]
    );

    return registerID;
};

module.exports = registerUser;