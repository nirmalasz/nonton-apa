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
    const query = 'SELECT watched_at, tmdb_id, rating, review, is_liked, is_rewatch FROM user_activity_log WHERE user_id = ? LIMIT ?';
    const result = await db.execute(query, [userId, limit], { prepare: true });
    return result.rows;
};

const updateUserPreferenceScore = async (userId, genre, weight) => {
    const query = `
        INSERT INTO user_preference_profile (user_id, feature_name, feature_weight)
        VALUES (?, ?, ?)
    `;
    const result = await db.execute(query, [userId, genre, weight], { prepare: true });
};

const getCurrentScore = async (userId, genre) => {
    const query = `SELECT feature_weight FROM user_preference_profile WHERE user_id = ? AND feature_name = ?`;
    const result = await db.execute(query, [userId, genre], { prepare: true});
    return result.rows[0];
};

const getUserTopGenre = async (userId) => {
    const query = 'SELECT feature_name FROM user_preference_profile WHERE user_id = ?';
    const result = await db.execute(query, [userId], { prepare: true });

    if (result.rows.length === 0) return 'Romance';

    if(result.rows.length > 0) return result.rows[0].feature_name;
    return 'Romance';
};


module.exports = { 
    logWatchActivity, 
    getUserHistory, 
    updateUserPreferenceScore, 
    getCurrentScore,
    getUserTopGenre
};