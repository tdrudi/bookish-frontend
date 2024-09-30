import React, { useContext, useEffect, useState } from 'react';
import BookCard from './BookCard';
import BookishAPI from '../../BookishAPI';
import UserContext from '../auth/UserContext';
import '../../css/bookList.css';

const BookList = () => {
    const [bookList, setBookList] = useState([]);
    const [selectedList, setSelectedList] = useState([]);
    const [userLists, setUserLists] = useState([]);
    const { currUser } = useContext(UserContext);

    useEffect(() => {
        //get all books
        const getBookList = async () => {
            const books = await BookishAPI.getAllBooks();
            setBookList(books);
        };
        //Get all users reading lists
        const getUsersLists = async () => {
            const lists = await BookishAPI.getUserLists(currUser.id);
            setUserLists(lists);
        }
        getBookList();
        getUsersLists();
    }, [currUser.id]);


    //Handle adding a book to a list
    const handleAddToList = async (book) => {
        //CHECK IF BOOK IS ALREADY ON LIST, IF SO ALERT USER
        const list = await BookishAPI.getBooksOnList(selectedList);
        const booksInList = list.map(l => l.olid);
        console.log(booksInList);
        if (booksInList.includes(book.olid)) {
            alert("This book is already on your list.");
            return;
        }
        try {
            await BookishAPI.addBookToList(selectedList, book.olid);
            setSelectedList(prev => ({ ...prev, [book.olid]: '' }));
            alert(`${book.title} was added to your list!`);
        } catch (error) {
            alert("An error occurred while adding the book to the list. Please try again.");
        }
    };

    if (bookList.length === 0)
        return (<p>No books found.</p>);

    return (
        <div className="book-list">
            {bookList.map((book) => (
                <div class='book-info'>
                    <BookCard key={book.id} book={book} />
                    <div class='option'>
                        <select value={selectedList[book.id]} onChange={(e) => setSelectedList(e.target.value)}>
                            <option value="">Select a list</option>
                            {userLists.map((list) => (
                                <option key={list.id} value={list.id}>{list.list_name}</option>
                            ))}
                        </select>
                        <button type="button" onClick={() => handleAddToList(book)}>Add to List</button>
                    </div>
                </div>


            ))}
        </div>
    );
};

export default BookList;
