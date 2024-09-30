import React, { useState, useEffect, useContext } from 'react';
import BookishAPI from '../../BookishAPI';
import UserContext from '../auth/UserContext';
import '../../css/editProfile.css';
import { useNavigate } from 'react-router-dom';

const EditProfileForm = () => {
    const { currUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        profile_img_url: '',
        email: ''
    });

    useEffect(() => {
        //Fetch user data and sets form data
        const fetchUserData = async () => {
            setFormData({
                username: currUser.username,
                first_name: currUser.firstName,
                last_name: currUser.lastName,
                profile_img_url: currUser.profile_img_url || 'default-profile.jpg',
                email: currUser.email
            });
        };

        fetchUserData();
    }, [currUser]);

    //Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
        setError('');
    };

    //Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.username.trim()) {
            setError('Username is required.');
            return;
        }
        if (!formData.first_name.trim()) {
            setError('First name is required.');
            return;
        }
        if (!formData.last_name.trim()) {
            setError('Last name is required.');
            return;
        }

        if (!formData.email.trim()) {
            setError('Email is required.');
            return;
        }

        setError('');
        try {
            //Update profile and navigate to users profile page
            await BookishAPI.updateProfile(currUser.username, formData);
            navigate(`/profile/${currUser.username}`);
        } catch (err) {
            setError('An error occurred while updating the profile. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="edit-profile-form">
            {error && <p className="error-message">{error}</p>}
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="first_name">First Name:</label>
                <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="last_name">Last Name:</label>
                <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="profile_img_url">Profile Image URL:</label>
                <input
                    type="text"
                    name="profile_img_url"
                    value={formData.profile_img_url}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Update Profile</button>
        </form>
    );
};

export default EditProfileForm;