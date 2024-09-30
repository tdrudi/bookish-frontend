import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BookishAPI from '../../BookishAPI';
import UserContext from '../auth/UserContext';
import '../../css/listForm.css';
const ListForm = () => {
    const { currUser } = useContext(UserContext);
    const [isPrivate, setIsPrivate] = useState(false);
    const { listId } = useParams();
    const [error, setError] = useState('');
    const [listData, setListData] = useState({
        userId: currUser.id,
        listName: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        // If editing a list, fetch the existing list details
        const fetchList = async () => {
            if (listId) {
                const list = await BookishAPI.getListById(listId);
                setListData({
                    userId: list.user_id,
                    listName: list.list_name,
                });
                setIsPrivate(list.is_private);
            }
        };
        fetchList();
    }, [listId]);

    //Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setListData((prevData) => ({ ...prevData, [name]: value }));
        setError('');
    };


    //Handle private toggle
    const handleTogglePrivate = (e) => {
        setIsPrivate((isPrivate) => !isPrivate);
    };

    //Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!listData.listName.trim()) {
            setError('List name is required.');
            return;
        }

        if (listData.listName.length < 3) {
            setError('List name must be at least 3 characters long.');
            return;
        }

        setError('');
        try {
            if (listId) {
                // Update existing list
                await BookishAPI.updateList(listId, {
                    listName: listData.listName,
                    isPrivate: isPrivate
                });
                //Navigate to list details page
                navigate(`/lists/${listId}`);
            } else {
                //Create a new list
                await BookishAPI.createList({
                    userId: listData.userId,
                    listName: listData.listName,
                    isPrivate: isPrivate
                });
                //Navigate to all lists page
                navigate(`/lists`);
            }
        } catch (error) {
            setError('An error occurred while saving the list. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p className="error-message">{error}</p>}
            <div>
                <label htmlFor="listName">List Name:</label>
                <input
                    type="text"
                    id="listName"
                    name="listName"
                    value={listData.listName}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="checkbox-container">
                <label htmlFor="isPrivate">Private List:</label>
                <input
                    type="checkbox"
                    name="isPrivate"
                    id="isPrivate"
                    checked={isPrivate}
                    onChange={handleTogglePrivate}
                />
            </div>
            <button type="submit">Save List</button>
        </form>
    );
};

export default ListForm;