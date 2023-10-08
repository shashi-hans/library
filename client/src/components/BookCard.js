import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import img from "../img/book.jpg"

const BookCard = (props) => {
    const  book  = props.book;

    return(
        <div className="card-container">
            <div >
                <Link to={`/show-book/${book._id}`}>
                    <img className="desc" src={img} alt="" />
                </Link>    
            </div>
            <div >
                <h2>{ book.title }</h2>
                <h3>{book.author}</h3>
                <p>{book.description}</p>   
            </div>
        </div>
    )
};

export default BookCard;
