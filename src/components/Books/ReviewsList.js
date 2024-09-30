import React, { useContext, useEffect, useState } from 'react';
import renderStars from './renderStars';
import formatDate from './formatDate';
import { useNavigate, useParams } from 'react-router-dom';
import UserContext from '../auth/UserContext';
import ReviewForm from './ReviewForm';
import BookishAPI from '../../BookishAPI';
import '../../css/reviewsList.css';

const BookReviewList = ({ reviews, setReviews, refreshReviews }) => {
    const { bookId } = useParams();
    const { currUser } = useContext(UserContext);
    const [existingReview, setExistingReview] = useState(false);
    const [editReview, setEditReview] = useState(null);
    const navigate = useNavigate();

    function handleEditClick(review) {
        //Send review to edit to child component, set editing to true
        setExistingReview(true);
        setEditReview(review);
    }

    const handleUpdate = async (updatedReview) => {
        //Replaces old review with new review
        setReviews(prevReviews =>
            prevReviews.map(review =>
                review.id === updatedReview.id ? updatedReview : review
            )
        );
        setExistingReview(false);
        refreshReviews();
    };

    function handleAdd() {
        //Refresh reviews
        refreshReviews();
    }

    const handleDelete = async (reviewId) => {
        //Delete review on click, then refresh reviews
        await BookishAPI.deleteReview(bookId, reviewId);
        refreshReviews();
    };
    useEffect(() => {
        async function checkReviews() {
            //Check for existing reviews
            const checkReviews = await BookishAPI.getAllReviews(bookId);
            if (checkReviews.length === 0) {
                setExistingReview(false);
            }

            //If there are existing reviews and it belongs to the user, set editing to true
            else if (checkReviews.review.map(review => review.userId) === currUser.userId) {
                setExistingReview(true);
            } else {
                setExistingReview(false);
            }
        }
        checkReviews();
    }, [bookId, currUser.id]);

    return (
        <div className="book-review-list">
            <ReviewForm
                onUpdate={handleUpdate}
                onAdd={handleAdd}
                review={editReview}
                existingReview={existingReview}
            />
            <h3>Reviews</h3>
            {reviews.map((review) => (
                <div key={review.id} className="review-container">
                    <div className='review' onClick={() => navigate(`/books/${bookId}/reviews/${review.id}`)}>
                        <b>{review.username}</b>
                        <p>{renderStars(review.rating)}</p>
                        <p>Reviewed on {formatDate(review.createdAt)}</p>
                        <p>"{review.reviewText}"</p>
                    </div>
                    {currUser && currUser.username === review.username && (
                        <>
                            <button className='edit' onClick={() => { handleEditClick(review) }}> Edit </button>
                            <button className='delete' onClick={() => handleDelete(review.id)}>Delete</button>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default BookReviewList;