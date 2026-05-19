const db = require('../database/db');

const getUserRecommendationLists = async (userId) => {
    const query = 'SELECT * FROM recommendation_table WHERE user_id = ?';
    const result = await db.execute(query, [userId], { prepare: true });
    return result.rows;
};

module.exports =  { getUserRecommendationLists };