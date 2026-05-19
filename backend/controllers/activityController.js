const activityRepository = require('../repositories/activityRepository');

const calculateAndSaveWeight = async (userId, genre, rating, isLiked, isRewatch) => {
    let addedPoint = 0;
    if (isLiked) addedPoint += 5;
    if (rating === 5) addedPoint += 4;
    if (isRewatch) addedPoint += 3;
    else if (rating >= 3) addedPoint += 2;
    else if (rating <= 2) addedPoint -= 2;
    const currentProfile = await activityRepository.getCurrentScore(userId, genre);
    
    let currentWeight = 0;
    if (currentProfile.rows.length > 0) currentWeight = currentProfile.rows[0].feature_weight;

    const newWeight = currentWeight + addedPoint;
    await activityRepository.updateUserPreferenceScore(userId, genre, newWeight);
};

const recordWatch = async (req, res) => {
    try {
        const { userId, tmdbId, genre, rating, review, isLiked, isRewatch } = req.body;
        await activityRepository.logWatchActivity(
            userId, tmdbId, genre, rating,
            review !== undefined ? review : null,
            isLiked !== undefined ? isLiked : false,
            isRewatch !== undefined ? isRewatch : false
        );

        calculateAndSaveWeight(userId, genre, rating, isLiked, isRewatch);

        res.status(201).json({ success: true, message: "Watch log recorded and preferences updated successfully." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



module.exports = { recordWatch };