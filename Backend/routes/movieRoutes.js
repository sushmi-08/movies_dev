const express = require('express');
const Movie = require('../models/movie');
const User = require('../models/user');
const schedule = require('node-schedule');
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

// Post request for Movie renting
router.post('/rent-movie/:movieId', async (req, res) => {
    const { userId } = req.body;
    const { movieId } = req.params;

    try {
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ result: false, message: 'Movie not found' });
        }

        if (!movie.availability) {
            return res.status(400).json({ result: false, message: 'Movie is currently rented out' });
        }

        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(startDate.getDate() + 3);

        movie.availability = false;
        movie.start_date = startDate;
        movie.end_date = endDate;

        await movie.save();

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ result: false, message: 'User not found' });
        }

        user.rented_movies.push(movie._id);
        await user.save();

        res.status(200).json({ result: true, message: 'Movie rented successfully', user_data: user, movie_data: movie });
    } catch (error) {
        console.error(error);
        res.status(500).json({ result: false, message: 'Internal server error' });
    }
});

// Run a scheduled job every day at midnight
schedule.scheduleJob('0 0 * * *', async () => {
    try {
        const now = new Date();
        const movies = await Movie.find({ end_date: { $lte: now }, availability: false });

        for (const movie of movies) {
            movie.availability = true;
            movie.start_date = null;
            movie.end_date = null;
            await movie.save();
        }

        console.log('Movie availability reset completed');
    } catch (error) {
        console.error('Error resetting movie availability:', error);
    }
});

// Reset Rent status
router.post('/reset-movie/:movieId', async (req, res) => {
    const { movieId } = req.params;
    const { userId } = req.body;

    try {
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ result: false, message: 'Movie not found' });
        }

        movie.start_date = null;
        movie.end_date = null;
        movie.availability = true;
        await movie.save();

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ result: false, message: 'User not found' });
        }

        user.rented_movies = user.rented_movies.filter(id => id.toString() !== movieId);
        await user.save();

        res.status(200).json({ result: true, message: 'Movie rental reset successfully', movie_data: movie, user_data: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ result: false, message: 'Internal server error' });
    }
});

// Add a new movie
router.post('/addMovie', async (req, res) => {
    const { name, category, rating, cast, director, release_date, description, duration, availability, image_url, start_date, end_date } = req.body;

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
        start_date,
        end_date
    });


    try {
        const newMovie = await movie.save();
        res.status(201).json({result: true, data: newMovie});
    } catch (err) {
        res.status(400).json({ result: false, message: err.message });
    }
});

module.exports = router;
