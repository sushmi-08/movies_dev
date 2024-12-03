const express = require('express');
const Movie = require('../models/movie');
const router = express.Router();

// Get all movies
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
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
        res.status(201).json(newMovie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
