const cron = require('node-cron');
const db = require('../database/db');
const userRepo = require('../repositories/userRepository');
const activityRepo = require('../repositories/activityRepository');

const tmdbGenreMap = {
    'Action': 28, 
    'Adventure': 12,
    'Animation': 16,
    'Comedy': 35, 
    'Crime': 80,
    'Documentary': 99,
    'Drama': 18,
    'Family': 10751,
    'Fantasy': 14,
    'History': 36,
    'Horror': 27,
    'Music': 10402, 
    'Mystery': 9648, 
    'Romance': 10749,
    'Science Fiction': 878, 
    'TV Movie': 10770,
    'Thriller': 53,
    'War': 10752, 
    'Western': 37,
    'Undefined': 0
};

const runRecommendationEngine = async () => {
    console.log("[CRON] Starting Recommendation Engine...");
    try {
        const users = await userRepo.getAllUser;
        for(const user of users) {
            const userId = user.user_id;

            // getting user top genre
            const userTopGenre = activityRepo.getUserTopGenre(userId);

            const tmdbGenreId = tmdbGenreMap[topGenreName] || 10749;

            const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&with_genres=${tmdbGenreId}&sort_by=popularity.desc`);
            const tmdbData = await response.json();
            const topMovies = tmdbData.results.slice(0, 6);

            for (let i = 0; i < topMovies.length; i++) {
                const movie = topMovies[i];
                const rank = i + 1;

                // since the recommendation table will only be used here by cron, its okay to access db here for simplicity
                await db.execute(`
                    INSERT INTO recommendation_table (user_id, rank, tmdb_id, match_score)
                    VALUES (?, ?, ?, ?)
                `, [userId, rank, movie.id, 99.0 - i], { prepare: true });
                // the match_score will shown as 99, 98, 97, and so on
            }
        console.error("[CRON] Recommendation Table successfully updated for all users");
        }
    } catch (error) {
        console.error("[CRON] Error running recs engine: ", error);
    }
};

// the recs engine will go every 10 minutes, ideally it will be at 3 am, but since this is just demo, we will run it every 10 minutes
cron.schedule('*/10 * * * *', () => {
    runRecommendationEngine();
});

module.exports = { runRecommendationEngine };