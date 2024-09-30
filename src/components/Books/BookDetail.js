import React, { useState, useEffect } from 'react';
import BookishAPI from '../../BookishAPI';
import ReviewList from "./ReviewsList";
import { useParams } from 'react-router-dom';
import renderStars from './renderStars';
import '../../css/bookDetail.css';

const BookDetail = () => {
    const [book, setBook] = useState({});
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(null);
    const [reviewCount, setReviewCount] = useState(null);
    const { bookId } = useParams();

    useEffect(() => {
        const fetchBookDetails = async () => {
            const fetchedBook = await BookishAPI.getBookById(bookId);
            setBook(fetchedBook);
        };
        fetchReviews();
        fetchBookDetails();

    }, [bookId]);

    const fetchReviews = async () => {
        const { avgRating, review } = await BookishAPI.getAllReviews(bookId);
        setReviews(review);
        setReviewCount(review.length);
        setRating(avgRating);
    };

    const refreshReviews = () => {
        fetchReviews();

    }

    const renderDescription = () => {
        if (book.description && book.description !== 'This book does not have a description.') {
            return book.description.split('</p>').map((paragraph, index) => {
                const cleanedParagraph = paragraph.replace('<p>', '').trim();
                return cleanedParagraph ? <p key={index}>{cleanedParagraph}</p> : null;
            });
        }
    };
    return (
        <div className="book-detail">
            <h1>{book.title}</h1>
            <h2>by {book.author ? book.author.replace(/^["{]+|["}]+$/g, '') : "Unknown"}</h2>
            <img src={`${book.coverUrl}`} alt={`${book.title} cover`} />
            <p>{rating ? (<> {renderStars(rating)} <p>{reviewCount} Reviews</p></>)
                : <i>No ratings yet</i>}</p>
            <p>{renderDescription(book.description)}</p>
            <ReviewList reviews={reviews} refreshReviews={refreshReviews} setReviews={setReviews} />
        </div >
    );
};

export default BookDetail;