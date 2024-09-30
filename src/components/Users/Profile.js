import React, { useState, useEffect, useContext } from 'react';
import UserContext from "../auth/UserContext";
import BookishAPI from '../../BookishAPI';
import { useNavigate, useParams } from 'react-router-dom';
import '../../css/profile.css';
const Profile = () => {
    const { userId } = useParams();
    const { currUser } = useContext(UserContext);
    const [profileUser, setProfileUser] = useState({});
    const navigate = useNavigate();
    let isCurrentUser = false;

    if (currUser.username === userId) {
        isCurrentUser = true
    }

    useEffect(() => {
        //Get user details for profile
        const getUserDetails = async () => {
            if (!isCurrentUser) {
                const userDetails = await BookishAPI.getUser(userId);
                setProfileUser(userDetails);
            } else {
                setProfileUser(currUser);
            }
        }
        getUserDetails();
    }, [userId, currUser, isCurrentUser]);

    //Navigate to edit profille
    const handleEditProfile = () => {
        navigate(`/profile/${userId}/edit`);
    };

    return (
        <div className="profile">
            <h1>{isCurrentUser ? 'Your Profile' : `${profileUser.first_name}'s Profile`}</h1>
            <img src={profileUser.profileImgUrl || '/default-profile.jpg'} alt={`${profileUser.username}'s profile`} />
            <div>
                <h2>Username: {profileUser.username}</h2>
                <h3>First Name: {profileUser.firstName}</h3>
                <h3>Last Name: {profileUser.lastName}</h3>
            </div>
            {isCurrentUser && (
                <>
                    <button onClick={handleEditProfile}>Edit Profile</button>
                </>
            )}
        </div>
    );
};

export default Profile;