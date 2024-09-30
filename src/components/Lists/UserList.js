import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookishAPI from '../../BookishAPI';
import ListCard from './ListCard';
import UserContext from '../auth/UserContext';
import '../../css/lists.css';
const UserList = () => {
    const { currUser } = useContext(UserContext);
    const [lists, setLists] = useState([]);
    const navigate = useNavigate();



    //When user changes, get lists
    useEffect(() => {
        const fetchLists = async () => {
            //Get all lists for user
            const userLists = await BookishAPI.getUserLists(currUser.id);
            setLists(userLists);
        };
        fetchLists();
    }, [currUser, lists]);

    const handleListChoice = (listId) => {
        //Navigate to list details page
        navigate(`/lists/${listId}`);
    }

    const handleCreateList = () => {
        //Navigate to new list form
        navigate(`/lists/new`);
    };

    const handleDeleteList = async (listId) => {
        const userLists = await BookishAPI.getUserLists(currUser.id);
        setLists(userLists);
        //Refresh lists
    };

    return (
        <div className='user-lists'>
            <h2>Your Lists</h2>
            <button className='new-list' onClick={handleCreateList}>Create New List</button>
            {lists.length > 0
                ? (lists.map((list) => (
                    <ListCard
                        key={list.id}
                        list={list}
                        onClick={() => handleListChoice(list.id)}
                        onDelete={handleDeleteList}
                    />)))
                : (<p>No lists created.</p>)}
        </div>
    );
};

export default UserList;