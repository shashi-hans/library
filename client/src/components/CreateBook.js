import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import { fullURL } from '../util';

const initialBookState = {
  title: '',
  isbn: '',
  author: '',
  genre: '',
  published_date: '',
  publisher: '',
};

const CreateBook = () => {
  const navigate = useNavigate();
  const [book, setBook] = useState(initialBookState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = useCallback(() => {
    const newErrors = {};
    if (!book.title.trim()) newErrors.title = "Title is required";
    if (!book.isbn.trim()) newErrors.isbn = "ISBN is required";
    if (!book.author.trim()) newErrors.author = "Author is required";
    if (!book.genre.trim()) newErrors.genre = "genre is required";
    if (!book.published_date) newErrors.published_date = "Published date is required";
    if (!book.publisher.trim()) newErrors.publisher = "Publisher is required";
    return newErrors;
  }, [book]);

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setBook(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  }, []);

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      await axios.post(fullURL, book);
      setBook(initialBookState);
      navigate('/');
    } catch (err) {
      setErrors({ submit: "Failed to create book. Please try again." });
    } finally {
      setLoading(false);
    }
  }, [book, navigate, validate]);

  return (
    <div className='CreateBook'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <br />
            <Link to='/' className='btn btn-outline-warning float-left'>
              Show Book List
            </Link>
          </div>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Add Book</h1>
            <p className='lead text-center'>Create new book</p>
            <form noValidate autoComplete="off" onSubmit={onSubmit}>
              {[
                { name: 'title', type: 'text', placeholder: 'Title of the Book' },
                { name: 'isbn', type: 'text', placeholder: 'ISBN' },
                { name: 'author', type: 'text', placeholder: 'Author' },
                { name: 'genre', type: 'text', placeholder: 'genre of this book' },
                { name: 'published_date', type: 'date', placeholder: 'Published Date' },
                { name: 'publisher', type: 'text', placeholder: 'Publisher of this Book' },
              ].map(field => (
                <div className='form-group' key={field.name}>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    name={field.name}
                    className='form-control'
                    value={book[field.name]}
                    onChange={onChange}
                  />
                  {errors[field.name] && <div className="text-danger">{errors[field.name]}</div>}
                  <br />
                </div>
              ))}
              {errors.submit && <div className="text-danger mb-2">{errors.submit}</div>}
              <button
                type='submit'
                className='btn btn-outline-warning btn-block mt-4'
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBook;
