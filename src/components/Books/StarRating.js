import React, { useState } from 'react';
import { FaStar } from "react-icons/fa";

const StarRating = ({ rating, setRating }) => {
    const [hover, setHover] = useState(null);

    return (
        <div className="star-rating">
            {[...Array(5)].map((star, idx) => {
                const ratingValue = idx + 1;
                return (
                    <label key={ratingValue}>
                        <input
                            type='radio'
                            name='rating'
                            value={ratingValue}
                            onClick={() => setRating(ratingValue)}
                            required
                        />
                        <FaStar
                            className='star'
                            size={20}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                            color={ratingValue <= (hover || rating) ? "yellow" : "grey"}
                        />
                    </label>
                );
            })}
            {rating}
        </div>
    );
};

export default StarRating;