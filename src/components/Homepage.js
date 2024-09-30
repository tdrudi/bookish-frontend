import React, { useContext } from 'react';
import UserContext from './auth/UserContext';
import '../css/home.css';

function Home() {
    const { currUser } = useContext(UserContext);
    return (
        <div id='homepage'>
            {currUser
                ? (<h1>Welcome back, {currUser.firstName || currUser.username}!</h1>)
                : (<h1>Welcome to Bookish!</h1>)
            }
        </div>
    );
}

export default Home;