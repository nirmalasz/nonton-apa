const activityRepository = require('../repositories/activityRepository');
const movieRepository = require('../repositories/movieRepository');

const getRecommendations = async (req, res) => {
    try {
        const { userId } = req.params;
        // Ask repository for user history
        const history = await activityRepository.getUserHistory(userId, 5);

        if (history.length === 0) {
            return res.json({ message: "No history found. Watch some movies first!", recommendations: [] });
        }

        // Determine favorite genre logic
        const genres = history.map(row => row.genre);
        const favoriteGenre = genres.sort((a, b) =>
            genres.filter(v => v === a).length - genres.filter(v => v === b).length
        ).pop();

        // Ask repository for movies and filter them
        const allMovies = await movieRepository.getAllMovies();
        const recommendations = allMovies.filter(movie =>
            movie.genres && movie.genres.includes(favoriteGenre)
        ).slice(0, 4);

        res.json({ favoriteGenre, recommendations });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getRecommendations };