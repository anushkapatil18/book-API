const mongoose = require('mongoose');
const { Book } = require('../database');

//Create book schema
const BookSchema = mongoose.Schema({
    ISBM: {
        type: String,
        require: true,
    },
    title: {
        type: String,
        require: true,
    },
    authors: [Number],
    language: String,
    pubDate: String,
    numOfPage: Number,
    category: [String],
    publication: Number,
});

//Create book model
const BookModel = mongoose.model('book',BookSchema);

module.exports = BookModel;