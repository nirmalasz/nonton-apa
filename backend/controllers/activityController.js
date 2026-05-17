const activityRepository = require('../repositories/activityRepository');

const recordWatch = async (req, res) => {
    try {
        const { userId, movieId, genre, rating, review, isLiked, isRewatch } = req.body;
        await activityRepository.logWatchActivity(
            userId, movieId, genre, rating,
            review !== undefined ? review : null,
            isLiked !== undefined ? isLiked : false,
            isRewatch !== undefined ? isRewatch : false
        );
        res.status(201).json({ success: true, message: "Watch log recorded successfully." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { recordWatch };