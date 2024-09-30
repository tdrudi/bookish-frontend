import React from 'react';
import BookishAPI from '../../BookishAPI';
import '../../css/listCard.css';


const ListCard = ({ list, onDelete, onClick }) => {

    const handleDelete = async (e) => {
        await BookishAPI.deleteList(list.id)
        onDelete(list.id);
    };

    const handleListChoice = () => {
        //Navigate to list details page
        onClick(list.id);
    };

    return (
        <div className="list-card" >
            <div className='list' onClick={handleListChoice}>
                <h3>{list.list_name} </h3>
                <p>{list.is_private ? "Private" : "Public"}</p>
                <p>{list.book_count} {list.book_count === 1 ? 'book' : 'books'}</p>
            </div>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default ListCard;