import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import { fullURL } from '../util';

function UpdateBookInfo() {
  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
    file_pdf: '',
    book_image: '',
    updated_date: '',
  });
  const [filePDF, setFilePDF] = useState('');
  const [bookImage, setBookImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${fullURL}/${id}`)
      .then((res) => {
        setBook(res.data);
      })
      .catch((err) => {
        console.log('Error from UpdateBookInfo', err);
        setError('Error fetching book details.');
      });
  }, [id]);

  const onChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const onFileChange = (e) => {
    if (e.target.name === 'file_pdf') {
      setFilePDF(e.target.files[0]);
    } else if (e.target.name === 'book_image') {
      setBookImage(e.target.files[0]);
    }
  };

  const validateForm = () => {
    if (!book.title || !book.author || !book.genre) {
      setError('Title, Author, and Genre are required fields.');
      return false;
    }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = new FormData();
    formData.append('title', book.title);
    formData.append('author', book.author);
    formData.append('genre', book.genre);
    if (filePDF) formData.append('file_pdf', filePDF);
    if (bookImage) formData.append('book_image', bookImage);

    setLoading(true);
    setError('');

    try {
      await axios.put(`${fullURL}/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate(`/`);
    } catch (err) {
      console.log('Error in UpdateBookInfo!', err);
      setError('Error updating book. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='UpdateBookInfo'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <Link to='/' className='btn btn-outline-warning float-left'>
              Library Room
            </Link>
          </div>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Edit Book</h1>
            <p className='lead text-center'>Update Book's Info</p>
            {error && <p className="text-danger text-center">{error}</p>}
          </div>
        </div>

        <div className='col-md-8 m-auto'>
          <form noValidate onSubmit={onSubmit} encType='multipart/form-data'>
            <div className='form-group'>
              <label htmlFor='title'>Title</label>
              <input
                type='text'
                placeholder='Title of the Book'
                name='title'
                className='form-control'
                value={book.title}
                onChange={onChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='author'>Author</label>
              <input
                type='text'
                placeholder='Author'
                name='author'
                className='form-control'
                value={book.author}
                onChange={onChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='genre'>Genre</label>
              <input
                type='text'
                placeholder='Genre'
                name='genre'
                className='form-control'
                value={book.genre}
                onChange={onChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='file_pdf'>Upload PDF</label>
              <input
                type='file'
                name='file_pdf'
                className='form-control'
                onChange={onFileChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='book_image'>Upload Book Image</label>
              <input
                type='file'
                name='book_image'
                className='form-control'
                onChange={onFileChange}
              />
            </div>
            <button
              type='submit'
              className='btn btn-outline-info btn-lg btn-block'
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Book'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateBookInfo;
