import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookishAPI from '../../BookishAPI';
import renderStars from './renderStars';
import formatDate from './formatDate';
import '../../css/reviewDetail.css';

const ReviewDetail = () => {
    const { bookId, reviewId } = useParams();
    const [review, setReview] = useState(null);

    useEffect(() => {
        //Fetch review details
        const fetchReview = async () => {
            const reviewData = await BookishAPI.getReview(bookId, reviewId);
            setReview(reviewData);
        };

        fetchReview();
    }, [reviewId, bookId]);

    if (!review) return <p>Loading review...</p>;

    return (
        <div className="review-detail">
            <h2>{review.username}'s Review</h2>
            <p className='rating'>Rating: {renderStars(review.rating)}</p>
            <p>Reviewed on: {formatDate(review.createdAt)}</p>
            <p className='reviewText'>"{review.reviewText}"</p>
        </div>
    );
};

export default ReviewDetail;