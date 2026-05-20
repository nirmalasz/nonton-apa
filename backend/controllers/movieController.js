const tmdbService= require('../services/tmdbService');


const getPopularMovies = async (req, res) => {
    try {
        const movies = await tmdbService.getPopularMovies();
        if (!movies) return res.status(500).json({ error: "Failed to fetch popular movies" });
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

const searchMovie = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) return res.status(400).json({ error: "Search query is required" });

        const results = await tmdbService.searchMovies(q);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

const getMovieDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await tmdbService.getMovieDetails(id);
        
        if (!movie) return res.status(404).json({ error: "Movie not found" });
        res.json(movie);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { getPopularMovies , searchMovie, getMovieDetails };