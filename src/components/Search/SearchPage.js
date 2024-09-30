import React, { useEffect, useState } from 'react';
import SearchForm from './searchForm';
import BookCard from '../Books/BookCard';
import BookishAPI from '../../BookishAPI';
import '../../css/searchForm.css';

const SearchPage = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        //if there are search results, extract book informaiton from results
        if (searchResults.length > 0) {
            const extractedBooks = searchResults.map(b => ({
                olid: b.book.olid,
                title: b.book.title,
                coverUrl: b.book.coverUrl,
                author: b.book.author,
            }));
            //Sets extracted information to 'books'
            setBooks(extractedBooks);
        }
    }, [searchResults]);

    //Handle search form, search open library api for books, sets results as 'search results'
    const handleSearch = async (searchTerm) => {
        const results = await BookishAPI.searchOpenLibrary(searchTerm.toLowerCase());
        setSearchResults(results);
    };


    return (
        <div>
            <SearchForm setSearchTerm={() => { }} onSearch={handleSearch} />
            <div className='book-list'>
                <ul>
                    {books.map((book) => (
                        <BookCard key={book.olid} book={book} />
                    ))}
                </ul>

            </div>
        </div>
    );
};

export default SearchPage;