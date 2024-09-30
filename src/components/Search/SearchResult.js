import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import renderStars from '../Books/renderStars';
import BookishAPI from '../../BookishAPI';
import '../../css/bookCard.css'
const SearchResult = ({ book }) => {
    const navigate = useNavigate();
    const [avgRating, setAvgRating] = useState(null);


    useEffect(() => {
        async function getReviews(bookId) {
            //Get avg rating for books
            const { averageRating } = await BookishAPI.getAllReviews(bookId);
            setAvgRating(averageRating);
        }
        getReviews(book.id)
    }, [book]);
    console.log('SEARCH RESULTS...');
    //On click navigate to book details page
    const handleCardClick = () => {
        navigate(`/books/${book.olid}`);
    };

    return (
        <div className="book-card" onClick={handleCardClick}>
            <img src={`${book.coverUrl} ` || 'default-book-cover.png'} alt={book.title} className="book-cover" />
            <div className="book-info">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">by {book.author.replace(/{|"|}$/g, '')}</p>
                <p className="book-rating">
                    {avgRating
                        ? (<> {renderStars(avgRating)} </>)
                        : ('No Ratings')}
                </p>
            </div>
        </div>
    );
};

export default SearchResult;