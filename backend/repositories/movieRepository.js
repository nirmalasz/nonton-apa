const db = require('../database/db');

const getAllMovies = async () => {
    const query = 'SELECT * FROM movie_metadata';
    const result = await db.execute(query);
    return result.rows;
};

module.exports = { getAllMovies };