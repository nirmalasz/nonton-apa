const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const getMovieDetails = async (tmdbId) => {
    try {
        const response = await fetch(`${BASE_URL}/movie/${tmdbId}?api_key=${TMDB_API_KEY}`);
        if(!response.ok) throw new Error("Movie not found in TMDB");

        const data = await response.json();

        return{
            tmdb_id: data.id,
            title: data.original_title,
            overview: data.overview,
            poster_path: data.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : null,
            duration: data.runtime,
            genres: data.genres.map(g => g.name),
            release_date: data.release_date,
            rating: data.vote_average,
            rating_count: data.vote_count
        }
    } catch (error) {
        console.error("TMDB Fetch Error: ", error);
        return null;
    }
    
};

const searchMovies = async (query) => {
    try {
        const response = await fetch(
            `${BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=1`
        );
        const data = await response.json();
        
        return data.results.slice(0, 10).map(movie => ({
            tmdb_id: movie.id,
            title: movie.title,
            original_title: movie.original_title,
            overview: movie.overview,
            release_year: movie.release_date ? movie.release_date.split('-')[0] : 'Unknown',
            poster_path: movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : null,
            genre_ids: movie.genre_ids,
            rating: movie.vote_average,
            rating_count: movie.vote_count
        }));
    } catch (error) {
        console.error("TMDB Search Error:", error);
        return [];
    }
};

const getPopularMovies = async () => {
    try {
        // set to get popular movies in Indonesia
        const response = await fetch(`${BASE_URL}/movie/popular?language=id-ID&region=ID&api_key=${TMDB_API_KEY}`);

        if(!response.ok) throw new Error("Movie not found in TMDB");

        const data = await response.json();

        return data.results.slice(0, 10).map(movie => ({
            tmdb_id: movie.id,
            title: movie.title,
            original_title: movie.original_title,
            overview: movie.overview,
            release_year: movie.release_date ? movie.release_date.split('-')[0] : 'Unknown',
            poster_path: movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : null,
            genre_ids: movie.genre_ids,
            rating: movie.vote_average,
            rating_count: movie.vote_count
        }));
    } catch (error) {
        console.error("TMDB Fetch Error: ", error);
        return null;
    }
};

module.exports = { getMovieDetails, searchMovies, getPopularMovies }