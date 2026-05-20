const express = require('express');
const router = express.Router();

const tmdbService= require('../services/tmdbService');
const movieController = require('../controllers/movieController')

router.get('/popular', movieController.getPopularMovies);
router.get('/search', movieController.searchMovie);
router.get('/:id', movieController.getMovieDetails);

module.exports = router;