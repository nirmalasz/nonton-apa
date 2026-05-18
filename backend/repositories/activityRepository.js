const db = require('../database/db');

const logWatchActivity = async (userId, tmdbId, genre, rating, review, isLiked, isRewatch) => {
    const query = `
        INSERT INTO user_activity_log 
        (user_id, watched_at, tmdb_id, genre, rating, review, is_liked, is_rewatch) 
        VALUES (?, toTimestamp(now()), ?, ?, ?, ?, ?, ?)
        `;
    const params = [userId, tmdbId, genre, rating, review, isLiked, isRewatch];
    
    await db.execute(query, params, { prepare: true });
};

const getUserHistory = async (userId, limit = 10) => {
    const query = 'SELECT genre FROM user_activity_log WHERE user_id = ? LIMIT ?';
    const result = await db.execute(query, [userId, limit], { prepare: true });
    return result.rows;
};

module.exports = { logWatchActivity, getUserHistory };