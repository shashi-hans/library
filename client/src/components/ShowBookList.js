import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BookCard from './BookCard';
import { fullURL } from '../util';

function ShowBookList() {
  const [books, setBooks] = useState([]);
  const [listDisplay, setListDisplay] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (isMobileDevice()) { 
    setIsMobile(true)
    setListDisplay(!isMobileDevice()) 
  }
    axios
      .get(fullURL)
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.log('Error from ShowBookList');
      });
  }, []);

  const bookList =
    books.length === 0
      ? 'No Books Available'
      : books.map((book, k) => <BookCard book={book} key={k} />);

  const isMobileDevice = () => {
    const userAgent = navigator.userAgent || window.opera;

    console.log("-------isMobile----")
    // Check for mobile user agents
    return /android|iphone|ipad|ipod|opera mini|iemobile|wpdesktop/.test(userAgent.toLowerCase());
  };

  

  const displayList = () => {
    if(isMobileDevice()) {
      setListDisplay(true)
    }
  }

  return (
    <div className='ShowBookList'>
      <div className='col-md-12'>
        <h2 className='display-4 text-center'>Library Room</h2>
      </div>
      <div className='container hp'>
        <div>
          <div className='row'>
            <h3 onClick={displayList}>Books List</h3>
            <div className='col-md-11 '>
              <Link
                to='/create-book'
                className='btn btn-outline-warning float-right'
              >
                + Add New Book
              </Link>
            </div>
          </div>
          {!isMobile &&  <div className='bookList'>{bookList}</div>}
        </div>
        { isMobile && listDisplay && <div className='bookList'>{bookList}</div>}
      </div>
    </div>
  );
}

export default ShowBookList;