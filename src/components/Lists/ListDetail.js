import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookishAPI from '../../BookishAPI';
import BookCard from '../Books/BookCard';
import '../../css/listDetail.css';


const ListDetails = () => {
    const { listId } = useParams();
    const [list, setList] = useState(null);
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchList = async () => {
            const fetchedList = await BookishAPI.getListById(listId);
            setList(fetchedList);
        };
        const fetchListBooks = async () => {
            const listBooks = await BookishAPI.getBooksOnList(listId);
            setBooks(listBooks);
        };
        fetchList();
        fetchListBooks()
    }, [listId, books]);


    const handleRemoveBook = async (bookId) => {
        await BookishAPI.removeBookFromList(listId, bookId);
        setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
    };
    const handleEditList = () => {
        navigate(`/lists/edit/${listId}`); // Navigate to the list editing form
    };

    return (
        <div>
            {list ? (
                <div className='list-details'>
                    <h2>{list.list_name}</h2>
                    <p>{list.is_private ? "Private" : "Public"} List</p>
                    <button className='edit' onClick={handleEditList}>Edit List Details</button>

                    <p>{books.length} {books.length === 1 ? 'book' : 'books'}</p>
                    <h3>Books in this list:</h3>
                    <div className="book-list">
                        {books.length > 0 ? (
                            books.map(book => (
                                <div key={book.id}>
                                    <BookCard book={book} />
                                    <button onClick={() => handleRemoveBook(book.olid)}>Remove from List</button>
                                </div>
                            ))
                        ) : (
                            <p>No books in this list.</p>
                        )}
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
export default ListDetails;