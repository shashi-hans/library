import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { fullURL } from '../util';

const CreateBook = () => {
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
    file_pdf: '',
    book_image: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    return book.title && book.author && book.genre && book.file_pdf && book.book_image;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      setError('All fields are required.');
      return;
    }
    console.log("book data==",book)
    setLoading(true);
    axios.post(fullURL, book)
      .then((res) => {
        setBook({
          title: '',
          author: '',
          genre: '',
          file_pdf: '',
          book_image: '',
        });
        // display success pop-up
        navigate('/'); // remove navigate
      })
      .catch((err) => {
        console.error('Error in CreateBook:', err);
        setError('Error creating book. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const formFields = [
    { name: 'title', type: 'text', placeholder: 'Title of the Book' },
    { name: 'author', type: 'text', placeholder: 'Author' },
    { name: 'genre', type: 'text', placeholder: 'Genre of book' },
    { name: 'file_pdf', type: 'file', placeholder: 'Upload pdf of Book',accept:".pdf" },
    { name: 'book_image', type: 'file', placeholder: 'Upload image of Book',accept:".jpg, .jpeg, .png" },
  ];

  return (
    <div className='CreateBook'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <br />
            <Link to='/' className='btn btn-outline-warning float-left'>
              Library Room
            </Link>
          </div>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Add Book</h1>
            <p className='lead text-center'>Create new book</p>

            {error && <div className="alert alert-danger">{error}</div>}

            <form noValidate onSubmit={onSubmit}>
              {formFields.map((field) => (
                <div className='form-group' key={field.name}>
                  <label htmlFor={field.name}>{field.placeholder}</label>
                  <input
                    id={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    name={field.name}
                    accept={field.accept}
                    className='form-control'
                    value={book[field.name]}
                    onChange={onChange}
                  />
                </div>
              ))}

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
