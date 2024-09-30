import React from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

function renderStars(rating) {
    //render the star rating
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(<FaStar key={i} color="yellow" size={20} />);
        } else if (i - 0.5 <= rating) {
            stars.push(<FaStarHalfAlt key={i} color="yellow" size={20} />);
        } else {
            stars.push(<FaStar key={i} color="grey" size={20} />);
        }
    }
    return stars;
}

export default renderStars;