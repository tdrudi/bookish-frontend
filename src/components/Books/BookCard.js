import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import renderStars from './renderStars';
import BookishAPI from '../../BookishAPI';
import '../../css/bookCard.css';
const BookCard = ({ book }) => {
    const navigate = useNavigate();
    const [avgRating, setAvgRating] = useState(null);
    const [reviewCount, setReviewCount] = useState(null);

    useEffect(() => {
        //Get all reviews for a book
        async function getReviews(bookId) {
            const { avgRating, review } = await BookishAPI.getAllReviews(bookId);
            setReviewCount(review.length);
            setAvgRating(avgRating);
        }
        getReviews(book.olid)
    }, [book.olid]);


    //When click on card -> go to the book details page
    const handleCardClick = () => {
        navigate(`/books/${book.olid}`);
    };
    return (
        <div className="book-card">
            <img src={book.coverUrl || book.cover_url || '/default-book-cover.png'} alt={book.title} className="book-cover" onClick={handleCardClick} />
            <div className="book-info" key={book.id}>
                <h3 className="book-title" onClick={handleCardClick}>{book.title}</h3>
                <p className="book-author">by {book.author.replace(/{|"|}$/g, '')}</p>
                <p className="book-rating">
                    {avgRating !== null && avgRating !== undefined
                        ? (<> {renderStars(avgRating)} <p>{reviewCount} Reviews</p></>)
                        : ('No Ratings')}
                </p>
            </div>
        </div>
    );
};

export default BookCard;