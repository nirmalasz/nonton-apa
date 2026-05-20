const activityRepository = require('../repositories/activityRepository');
const tmdbService = require('../services/tmdbService');

const calculateAndSaveWeight = async (userId, genre, rating, isLiked, isRewatch) => {
    let addedPoint = 0;
    if (isLiked) addedPoint += 5;
    if (rating === 5) addedPoint += 4;
    if (isRewatch) addedPoint += 3;
    else if (rating >= 3) addedPoint += 2;
    else if (rating <= 2) addedPoint -= 2;
    const currentProfileRow = await activityRepository.getCurrentScore(userId, genre);
    
    let currentWeight = 0;
    if (currentProfileRow) {
        currentWeight = currentProfileRow.feature_weight;
    }

    const newWeight = currentWeight + addedPoint;
    await activityRepository.updateUserPreferenceScore(userId, genre, newWeight);
};

const recordWatch = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { tmdbId, genre, rating, review, isLiked, isRewatch } = req.body;
        await activityRepository.logWatchActivity(
            userId, tmdbId, genre, rating,
            review !== undefined ? review : null,
            isLiked !== undefined ? isLiked : false,
            isRewatch !== undefined ? isRewatch : false
        );

        await calculateAndSaveWeight(userId, genre, rating, isLiked, isRewatch);

        res.status(201).json({ success: true, message: "Watch log recorded and preferences updated successfully." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getDiary = async (req, res) => {
    try {
        const userId = req.user.userId;

        const logs = await activityRepository.getUserHistory(userId, 50); 
        
        const diaryEntries = await Promise.all(
            logs.map(async (log) => {
                const movie = await tmdbService.getMovieDetails(log.tmdb_id);
                return {
                    watched_at: log.watched_at,
                    tmdb_id: log.tmdb_id,
                    rating: log.rating,
                    is_liked: log.is_liked,
                    is_rewatch: log.is_rewatch,
                    review: log.review,
                    ...movie,
                    hasReview: log.review !== null && log.review !== ""
                };
            })
        );

        res.status(200).json({ entries: diaryEntries });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



module.exports = { recordWatch, getDiary };