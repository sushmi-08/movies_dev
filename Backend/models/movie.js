const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    rating: { type: Number, required: true },
    cast: { type: [String], required: true },
    director: { type: String, required: true },
    release_date: { type: Date, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    availability: { type: Boolean, default: true },
    image_url: { type: String, required: true },
    start_date: { type: Date, default: null },
    end_date: { type: Date, default: null },
});

module.exports = mongoose.model('Movie', movieSchema);
