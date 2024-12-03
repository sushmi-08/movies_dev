const express = require('express');
const User = require('../models/user');
const router = express.Router();

// Get all users
router.get('/allUsers', async (req, res) => {
    try {
        const users = await User.find();
        res.json({result: true, data: users});
    } catch (err) {
        res.status(500).json({result: false, message: err.message });
    }
});

// Sign In
router.post('/signIn', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username, password });
        if (!user) {
            return res.status(404).json({ result: false, message: 'User not found' });
        }
        res.json({result: true, data: user});
    } catch (err) {
        res.status(500).json({ result: false, message: err.message });
    }
});

// Sign Up
router.post('/signUp', async (req, res) => {
    const { username, password, rented_movies, email } = req.body;

    const user = new User({
        username,
        password,
        rented_movies,
        email,
    });
    try {
        const newUser = await user.save();
        res.status(201).json({result: true, data: newUser});
    } catch (err) {
        res.status(400).json({ result: false, message: err.message });
    }
});

module.exports = router;
