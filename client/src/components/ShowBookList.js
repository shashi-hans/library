import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BookCard from './BookCard';
import { fullURL } from '../util';
import OnlineLibraries from './OnlineLibraries';

function ShowBookList() {
  const [books, setBooks] = useState([]);
  const [ulDisplay, setUlDisplay] = useState(true);
  const [listDisplay, setListDisplay] = useState(true);

  useEffect(() => {
    if (isMobile) { 
      setUlDisplay(!isMobile); 
      setListDisplay(!isMobile) 
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

    // Check for mobile user agents
    return /android|iphone|ipad|ipod|opera mini|iemobile|wpdesktop/.test(userAgent.toLowerCase());
  };

  const isMobile = isMobileDevice();
  console.log("isMobile--", isMobile)
  console.log("ulDisplay--", ulDisplay)

  const displayUlList = () => {
    if(isMobile) {
      setUlDisplay(true)
      setListDisplay(false)
    }
  }
  const displayList = () => {
    if(isMobile) {
      setListDisplay(true)
      setUlDisplay(false)
    }
  }

  return (
    <div className='ShowBookList'>
      <div className='col-md-12'>
        <h2 className='display-4 text-center'>Library Room</h2>
      </div>
      <div className='container hp'>
        <div className='library-section'>
          <div className="libraries" onClick={displayUlList}>Online Libraries</div>
          { !isMobile && <OnlineLibraries/>}
        </div>
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
          {!isMobile &&  <div>{bookList}</div>}
        </div>
        { isMobile && ulDisplay && <OnlineLibraries/>}
        { isMobile && listDisplay && <div className='bookList'>{bookList}</div>}
      </div>
    </div>
  );
}

export default ShowBookList;