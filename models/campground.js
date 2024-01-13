const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
    title: String,
    Price: Number,
    description: String,
    location: String
});

module.exports = mongoose.model('Campground', CampgroundSchema);