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
            poster_path: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
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
    
}