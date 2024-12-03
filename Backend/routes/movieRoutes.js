const express = require('express');
const Movie = require('../models/movie');
const router = express.Router();

// Get all movies
router.get('/allMovies', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json({result: true, data: movies});
    } catch (err) {
        res.status(500).json({ result: false, message: err.message });
    }
});

// Get Movie by id
router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ result: false, message: 'Movie not found' });
        }
        res.json({result: true, data: movie});
    } catch (err) {
        res.status(500).json({ result: false, message: err.message });
    }
});

// Filter movies by category
router.get('/category/:cat_name', async (req, res) => {
    try {
        const movies = await Movie.find({ category: req.params.cat_name });
        res.json({result: true, data: movies});
    } catch (err) {
        res.status(500).json({ result: false, message: err.message });
    }
});

// Add a new movie
router.post('/', async (req, res) => {
    const { name, category, rating, cast, director, release_date, description, duration, availability, image_url } = req.body;

    const movie = new Movie({
        name,
        category,
        rating,
        cast,
        director,
        release_date,
        description,
        duration,
        availability,
        image_url,
    });


    try {
        const newMovie = await movie.save();
        res.status(201).json({result: true, data: newMovie});
    } catch (err) {
        res.status(400).json({ result:false, message: err.message });
    }
});

module.exports = router;
