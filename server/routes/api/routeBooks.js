// routes/api/books.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Book = require('../../models/ModelBook'); // Load Book model

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });


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
      console.log('No Book found')
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
      console.log('Book fetched successfully')
      res.json(book)
    })
    .catch(err => {
      console.log('No Book found')
      res.status(404).json(
        { nobookfound: 'No Book found' }
      )
    });
});

// @route POST api/books
// @description add/save/create book
router.post('/', upload.fields([{ name: 'file_pdf' }, { name: 'book_image' }]), async (req, res) => {
  console.log("Error res ==")
  try {
    if (!req.files || !req.files.file_pdf) {
      return res.status(400).json({error:'No PDF file uploaded.'});
    }

    const bookData = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      file_pdf: path.join(__dirname, '..', req.files.file_pdf[0].path), // Save PDF file path to the book data
      book_image: req.files.book_image ? path.join(__dirname, '..', req.files.book_image[0].path) : null, // Save book image file path if exists
    };

    const newBook = await Book.create(bookData);

    res.json({ msg: 'Book added successfully', book: newBook });
  } catch (err) {
    console.error('Error adding book:', err);
    res.status(400).json({ error: 'Unable to add this book' });
  }
});

// @route PUT api/books/:id
// @description Update book
router.put('/:id', (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body)
    .then(book => {
      console.log('Book updated successfully')
      res.json({ msg: 'Updated successfully' })
    })
    .catch(err => {
      console.log('Unable to update Book')
      res.status(400).json({ error: 'Unable to update the Database' })
    });
});

// @route DELETE api/books/:id
// @description Delete book by id
router.delete('/:id', (req, res) => {
  Book.findByIdAndRemove(req.params.id, req.body)
    .then(book => {
      console.log('Book entry deleted successfully')
      res.json({ msg: 'Book entry deleted successfully' })
    })
    .catch(err => {
      console.log('No such a book to delete')
      res.status(404).json({ error: 'No such a book' })
    });
});

module.exports = router;