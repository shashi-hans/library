// routes/api/books.js

const express = require('express');
const router = express.Router();
// Load Book model
const Book = require('../models/ModelBook');

// @route GET api/books/test
// @description tests books route
router.get('/test', (req, res) => {
  res.send('testing API, book route testing!')
});

// @route GET api/books
// @description Get all books
router.get('/', (req, res) => {
  Book.find()
    .then(books => {
      console.log('Book List fetched successfully')
      res.json(books)
    })
    .catch(err => {
      console.log("GET / - failed to get book list:", err)
      res.status(404).json(
        { nobooksfound: 'No Books found' }
      )
    });
});

// @route GET api/books/:id
// @description Get single book by id
router.get('/:id', (req, res) => {
  Book.findById(req.params.id)
    .then(book => {
      console.log(`GET /${req.params.id} - found book`)
      res.json(book)
    })
    .catch(err => {
      console.log(`GET /${req.params.id} - no book found`,err)
      res.status(404).json(
        { nobookfound: 'No Book found' }
      )
    });
});

// @route POST api/books
// @description add/save/create book
router.post('/', (req, res) => {
  Book.create(req.body)
    .then(book => {
      console.log('POST / - Book added successfully:', book._id);
      res.json({ msg: 'Book added successfully' });
    })
    .catch(err => {
      console.error('POST / - Unable to add this book:', err);
      res.status(400).json({ error: 'Unable to add this book' });
    });
});

// @route PUT api/books/:id
// @description Update book
router.put('/:id', (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body)
    .then(book => {
      if (book) {
        console.log(`PUT /${req.params.id} - Updated successfully`);
        res.json({ msg: 'Updated successfully' });
      } else {
        console.warn(`PUT /${req.params.id} - No book found to update`);
        res.status(404).json({ error: 'No such a book to update' });
      }
    })
    .catch(err => {
      console.error(`PUT /${req.params.id} - Unable to update the Database:`, err);
      res.status(400).json({ error: 'Unable to update the Database' });
    });
});

// @route DELETE api/books/:id
// @description Delete book by id
router.delete('/:id', (req, res) => {
  Book.findByIdAndDelete(req.params.id)
    .then(book => {
      if (book) {
        console.log(`DELETE /${req.params.id} - Book entry deleted successfully`);
        res.json({ mgs: 'Book entry deleted successfully' });
      } else {
        console.warn(`DELETE /${req.params.id} - No such a book to delete`);
        res.status(404).json({ error: 'No such a book' });
      }
    })
    .catch(err => {
      console.error(`DELETE /${req.params.id} - Error deleting book:`, err);
      res.status(404).json({ error: 'No such a book' });
    });
});

module.exports = router;