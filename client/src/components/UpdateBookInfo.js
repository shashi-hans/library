import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import { fullURL } from '../util';

function UpdateBookInfo() {
  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
    isbn: '',
    published_date: '',
    publisher: '',
    updated_date: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState('');
  const [fetchError, setFetchError] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch book data on mount
  useEffect(() => {
    const controller = new AbortController();

    const fetchBook = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${fullURL}/${id}`,
          { signal: controller.signal }
        );
        setBook({
          title: data.title || '',
          isbn: data.isbn || '',
          author: data.author || '',
          genre: data.genre || '',
          published_date: data.published_date ? data.published_date.slice(0, 10) : '',
          publisher: data.publisher || '',
        });
        setFetchError('');
      } catch (error) {
        if (!axios.isCancel(error)) {
          setFetchError('Failed to fetch book data.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
    return () => controller.abort();
  }, [id]);

   // Validation logic
  const validate = useCallback(() => {
    const tempErrors = {};
    if (!book.title.trim()) tempErrors.title = 'Title is required';
    if (!book.isbn.trim()) tempErrors.isbn = 'ISBN is required';
    if (!book.author.trim()) tempErrors.author = 'Author is required';
    if (!book.genre.trim()) tempErrors.genre = 'genre is required';
    if (!book.published_date) tempErrors.published_date = 'Published Date is required';
    if (!book.publisher.trim()) tempErrors.publisher = 'Publisher is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }, [book]);

    // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await axios.put(`${fullURL}/${id}`, book);
      navigate(`/show-book/${id}`);
    } catch (error) {
      setFetchError('Failed to update book.');
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="UpdateBookInfo">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <br />
            <Link to="/" className="btn btn-outline-warning float-left">
              Show Book List
            </Link>
          </div>
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Edit Book</h1>
            <p className="lead text-center">Update Book's Info</p>
          </div>
        </div>
        <div className="col-md-8 m-auto">
          {fetchError && (
            <div className="alert alert-danger" role="alert">
              {fetchError}
            </div>
          )}
          <form noValidate onSubmit={handleSubmit}>
            {[
              { label: 'Title', name: 'title', type: 'text', placeholder: 'Title of the Book' },
              { label: 'Author', name: 'author', type: 'text', placeholder: 'Author' },
              { label: 'genre', name: 'genre', type: 'text', placeholder: 'genre of the Book' },
              { label: 'ISBN', name: 'isbn', type: 'text', placeholder: 'ISBN' },
              { label: 'Published Date', name: 'published_date', type: 'date' },
              { label: 'Publisher', name: 'publisher', type: 'text', placeholder: 'Publisher of the Book' },
            ].map(({ label, name, type, placeholder }) => (
              <div className="form-group" key={name}>
                <label htmlFor={name}>{label}</label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    className={`form-control ${errors[name] ? 'is-invalid' : ''}`}
                    value={book[name]}
                    onChange={handleChange}
                    autoFocus={name === 'title'}
                  />
                {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
                <br />
              </div>
            ))}
            <button
              type="submit"
              className="btn btn-outline-info btn-lg btn-block"
            >
              Update Book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}



export default UpdateBookInfo;
