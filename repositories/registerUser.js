const getPool = require("../database/getPool");

const registerUser = async ({ name, email, encryptedPassword, bio, pictureName, registrationCode }) => {
    const pool = getPool();

    const [{ registerID }] = await pool.query(
        "INSERT INTO users (name, email, password, bio, picture, registrationCode) VALUES (?, ?, ?, ?, ?, ?)",
        [name, email, encryptedPassword, bio, pictureName, registrationCode]
    );

    return registerID;
};

module.exports = registerUser;