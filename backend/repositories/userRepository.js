const db = require('../database/db');

const createUser = async (userId, username, password) => {
    const query = `INSERT INTO users (user_id, username, password) VALUES (?, ?, ?)`;
    await db.execute(query, [userId, username, password], { prepare: true});
};

const getUserByUsername = async (username) => {
    const query = `SELECT * FROM users WHERE username = ?`;
    const result = await db.execute(query, [username], { prepare: true});
    return result.rows[0];
};

const getAllUser = async () => {
    const query = `SELECT user_id FROM users`;
    const result = await db.execute(query);
    return result.rows;
};

module.exports = { createUser, getUserByUsername, getAllUser };