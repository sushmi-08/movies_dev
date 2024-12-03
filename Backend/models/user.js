const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rented_movies: { type: [mongoose.Schema.Types.ObjectId], ref: 'Movie' },
    email: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('User', userSchema);
