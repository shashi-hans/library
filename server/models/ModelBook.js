// models/Book.js

const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  file_pdf: {
    type: String,
    required: true
  },
  book_image: {
    type: String,
  },
  updated_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('book', BookSchema);

