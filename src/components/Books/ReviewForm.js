import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookishAPI from '../../BookishAPI';
import StarRating from './StarRating';
import '../../css/reviewForm.css';

const ReviewForm = ({ onUpdate, onAdd, existingReview, review }) => {
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(null);
    const [error, setError] = useState('');
    const { bookId } = useParams();

    useEffect(() => {
        if (existingReview && review) {
            //If review exists, set form data
            setReviewText(review.reviewText);
            setRating(review.rating);
        } else {
            setReviewText('');
            setRating(null);
        }
    }, [existingReview, review]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!reviewText.trim()) {
            setError('Review text is required.');
            return;
        }

        if (rating === null) {
            setError('Please select a rating.');
            return;
        }

        setError('');
        try {
            //If review is exisitng -> edit review
            if (existingReview) {
                const updatedReview = await BookishAPI.updateReview(bookId, review.id, reviewText, rating);
                //Handle update, refresh reviews
                onUpdate(updatedReview);
            } else {
                //If review doesnt exist, add new review
                await BookishAPI.addReview(bookId, reviewText, rating);
                //Refresh reviews
                onAdd();
            }
            //Reset form values
            setReviewText('');
            setRating(null);
        } catch (err) {
            setError('An error occurred while submitting your review. Please try again.');
        }
    }

    return (
        <form className='review-form' onSubmit={handleSubmit}>
            {error && <p className="error-message">{error}</p>}
            <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder={existingReview ? null : "Write your review..."}
                required
            /><p>Rating:
                <StarRating rating={rating} setRating={setRating} /></p>
            <button className='submit' type="submit" onClick={handleSubmit}>Submit Review</button>
        </form>
    );
};

export default ReviewForm;