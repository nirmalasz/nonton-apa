const recommendationRepository = require('../repositories/recommendationRepository');
const tmdbService = require('../services/tmdbService');

const getRecommendations = async (req, res) => {
    try {
        const userId = req.user.userId;

        const recommendationList = await recommendationRepository.getUserRecommendationLists(userId);

        if (!recommendationList || recommendationList.length === 0) {
            return res.status(200).json({ message: "No history found. Watch some movies first!", recommendations: [] });
        }

        const rawRecommendation = await Promise.all(
            recommendationList.map(async (row) => {
                const movie = await tmdbService.getMovieDetails(row.tmdb_id);
                if (!movie) {
                    return null;
                }
                return{
                    ...movie,
                    match_score: row.match_score 
                };
            })
        );

        const recommendations = rawRecommendation.filter(movie => movie !== null);

        res.status(200).json({ recommendations });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getRecommendations };